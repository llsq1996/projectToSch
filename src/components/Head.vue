<template>
  <div >
    <el-menu router
             class="el-menu-vertical-demo"
             mode="horizontal"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             @open="handleOpen"
             @close="handleClose"
             @Select="handleSelect"
    >
      <el-col :span="3" :offset="6" >
        <h4 style="color:#ffff;">商家信息管理与审核</h4>
      </el-col>
      <el-col :span="2" :offset="10">
        <el-submenu style="text-align: center" index="/">
          <template slot="title"><span>{{userName}}</span></template>
          <el-menu-item index="/login" style="text-align: center;">登录</el-menu-item>
          <el-menu-item index="/login" @click="logout" style="text-align: center;">注销</el-menu-item>
        </el-submenu>
      </el-col>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Head',
  created () {
    console.log(this.userName)
    let name = this.Cookie.getCookie('user')
    if (name) {
      this.userName = unescape(name)
    }
  },
  data () {
    return {
      userName: '未登录'
    }
  },
  methods: {
    handleOpen (key, keyPath) {
      console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      console.log(key, keyPath)
    },
    handleSelect (key, keyPath) {
      console.log(key, keyPath)
    },
    logout () {
      this.Cookie.delCookie('user')
      this.$router.push({
        name: 'login'
      })
    }
  }
}
</script>

<style scoped>

</style>
