<template>
  <div class="login">
    <el-row >
    <el-col>
      <br/> <br/> <br/> <br/> <br/> <br/>
    </el-col>
      <el-col :span="16" :offset="8">
        <el-form :model="originData" ref="originData" label-position="right"  size="medium" >
          <el-form-item label="用户" prop="user" >
            <el-col :span="6">
              <el-input v-model="originData.user" clearable style="width: 250px"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-col :span="6">
              <el-input type="password" v-model="originData.password" clearable style="width: 250px"></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label-width="80px">
            <el-button type="primary" @click="login()">登录</el-button>
            <el-button type="danger" @click="resetForm('originData')">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Head from '@/components/Head'
export default {
  name: 'Login',
  components: {
    Head: Head
  },
  created () {
    let name = this.Cookie.getCookie('user')
    if (name) {
      this.$router.push({
        name: 'index'
      })
    }
  },
  data () {
    return {
      originData: {},
      userName: '未登录'
    }
  },
  methods: {
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    login () {
      let data = {
        userName: this.originData.user,
        password: this.originData.password
      }
      this.$http.post('/api' + '/login', data).then(x => {
        if (x.body.code === 1) {
          console.log(x.body.data)
          this.Cookie.setCookie('user', this.originData.user)
          this.Cookie.setCookie('password', this.originData.password)
          this.Cookie.setCookie('isAdmin', x.body.data.isAdmin)
          this.Cookie.setCookie('isAudit', x.body.data.isAudit)
          this.$router.push({
            name: 'index'
          })
        } else {
          this.$message.error(x.body.msg)
        }
      })
    }
  }
}
</script>

<style scoped>
  .login{
    width: 1400px;
    height: 675px;
    background-color: #eaeaea;
    /*background-size: 1400px;*/
  }
  /*url('../assets/test.jpg') center center no-repeat;*/
</style>
