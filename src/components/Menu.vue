<template>
  <div style="background-color:#727272; height: 600px;">
    <aside>
    <el-menu router
             class="el-menu-vertical-demo"
             text-color="#ffff"
             active-text-color=" #B8840B"
             background-color="#727272"
             @open="handleOpen"
             @close="handleClose"
             @Select="handleSelect"
    >
      <el-submenu index="/1">
        <template slot="title">
          <i class="el-icon-menu" style="color: #B8840B"></i>
          <span >门店管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/">门店录入录入</el-menu-item>
          <el-menu-item index="/logout">门店列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="/2">
        <template slot="title">
          <i class="el-icon-menu" style="color: #B8840B"></i>
          <span >人员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/">人员录入</el-menu-item>
          <el-menu-item index="/logout">人员列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
    </aside>
  </div>
</template>
<script>
  export default {
    name: 'Menu',
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
