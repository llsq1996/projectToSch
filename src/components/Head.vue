<template>
  <div >
    <el-menu router
             class="el-menu-vertical-demo"
             mode="horizontal"
             text-color="#ffff"
             active-text-color=" #B8840B"
             background-color="#727272"
             @open="handleOpen"
             @close="handleClose"
             @Select="handleSelect"
    >
      <el-col :span="2" :offset="6" >
        <h4 style="color:#ffff;">商家信息管理</h4>
      </el-col>
      <el-col :span="2" :offset="10">
        <el-submenu style="text-align: center" index="/">
          <template slot="title"><span>{{userName}}</span></template>
          <el-menu-item index="/login" style="text-align: center;">登录</el-menu-item>
          <el-menu-item index="/logout" style="text-align: center;">注销</el-menu-item>
        </el-submenu>
      </el-col>
    </el-menu>
  </div>
</template>

<script>
export default {
  name: 'Head',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      userName: 'liujiashu'
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
    }
  }
}
</script>

<style scoped>

</style>
