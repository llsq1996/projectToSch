<template>
  <div>
    <br/>
    <el-row class="warp">
      <el-col :span="24" class="warp-breadcrum">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/'}"><b>&nbsp;&nbsp;首页</b></el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>
    </el-row>
    <hr/>
    <br>
    <el-form label-position="right" label-width="80px" size="medium">
      <el-form-item label="用户" >
        <el-col :span="4">
        <el-input ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item label="密码" >
        <el-col :span="6">
        <el-input type="password" ></el-input>
        </el-col>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="login()">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  methods: {
    async login () {
      console.log('ok')
      let ob1 = this.$http.get('/api' + '/test?userName=liu').then(x => {
        console.log(x)
      })
      console.log('ob1')
      console.log(ob1)
      let data = {userName: 'jia'}
      let ob2 = this.$http.post('/api' + '/test', data)
      console.log('ob2')
      console.log(ob2)
    }
  }
}
</script>

<style scoped>

</style>
