<template>
  <div style="background-color:#D2B48C ; height: 1020px;">
    <aside>
    <el-menu router
             class="el-menu-vertical-demo"
             text-color="#ffff"
             active-text-color="#000000"
             background-color="#D2B48C "
             @open="handleOpen"
             @close="handleClose"
             @Select="handleSelect"
    >
      <el-submenu index="/">
        <template slot="title">
          <i class="el-icon-menu" style="color: #ffff"></i>
          <span >商家管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/shopAdd">商家入驻</el-menu-item>
          <el-menu-item index="/shopSupplement">品牌商家批量补录</el-menu-item>
          <el-menu-item index="/shopList">商家列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="/audit">
        <template slot="title">
          <i class="el-icon-menu" style="color:#ffff"></i>
          <span >审核管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/shopAdd">商家审核</el-menu-item>
          <el-menu-item index="/shopList">审核列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-submenu index="/count">
        <template slot="title">
          <i class="el-icon-menu" style="color: #ffff"></i>
          <span >统计管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/category">商家类别统计</el-menu-item>
          <el-menu-item index="/addCount">商家入驻统计</el-menu-item>
          <el-menu-item index="/addCount">人员统计</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="/people">
        <template slot="title">
          <i class="el-icon-menu" style="color:#ffff"></i>
          <span >人员管理</span>
        </template>
        <el-menu-item-group>
          <el-menu-item index="/userAdd">人员录入</el-menu-item>
          <el-menu-item index="/userList">人员列表</el-menu-item>
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
