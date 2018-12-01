<template>
  <div>
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
  created(){
    let name = this.Cookie.getCookie('user')
    if(name){
      this.$router.push({
        name: 'index',
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
      // let ob1
      // this.$http.get('/api' + '/test?userName=liu').then(x => {
      //   ob1 = x.body
      //   console.log(ob1)
      // })
      // let data = {userName: 'jia'}
      // this.$http.post('/api' + '/test', data).then(x => ob1 = x.body)
      this.Cookie.setCookie('user', this.originData.user)
      console.log(this.originData.user)
      console.log(this.originData.password)
      this.$router.push({
        name: 'index'
      })
    }
  }
}
</script>

<style scoped>

</style>
