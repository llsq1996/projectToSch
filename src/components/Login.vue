<template>
  <div>
    <el-row >
    <el-col :span="24">
      <Head></Head>
    </el-col>
    <el-col>
      <br/> <br/> <br/> <br/>
    </el-col>
      <div >
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
      </div>
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
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
          this.Cookie.setCookie('user', this.originData.user)
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

</style>
