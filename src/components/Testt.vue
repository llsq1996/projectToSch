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
        <el-col :span="4">
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
  created () {

  },
  data () {
    return {

    }
  },
  methods: {
    login () {
      let ob1
      this.$http.get('/api' + '/test?userName=liu').then(x => {
        ob1 = x.body
        console.log(ob1)
      })
      let data = {userName: 'jia'}
      this.$http.post('/api' + '/test', data).then(x => ob1 = x.body)
    }
  }
}
</script>
