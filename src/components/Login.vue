<template>
  <div class="img1">
    <el-row >
    <el-col :span="24">
      <Head></Head>
    </el-col>
    <el-col>
      <br/> <br/> <br/> <br/>
    </el-col>
      <el-col :span="18" :offset="6">
        <el-form :model="originData" ref="originData" label-position="right" label-width="80px" size="medium" >
          <el-form-item label="用户" prop="user" >
            <el-col :span="6">
              <el-input v-model="originData.user" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item label="密码" prop="password" >
            <el-col :span="6">
              <el-input type="password" v-model="originData.password" clearable></el-input>
            </el-col>
          </el-form-item>
          <el-form-item>
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
  .img1{
    width: 1400px;
    height: 675px;
    background: url('../assets/test.jpg') center center no-repeat;
    background-size: 1400px;
  }
</style>
