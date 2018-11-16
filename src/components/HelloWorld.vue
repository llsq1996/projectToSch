<template>
  <el-container class="el-container">
    <el-aside class="el-aside">
      <MenuPage></MenuPage>
    </el-aside>
    <el-container>
      <el-header class="el-header">
        <HeadPage></HeadPage>
      </el-header>
      <el-main class="el-main" ref="MenuPage">
      </el-main>
      <el-footer class="el-header">
      </el-footer>
    </el-container>
  </el-container>
</template>


<script>
import HeadPage from '@/components/Head.vue'
import MenuPage from '@/components/Menu.vue'
export default {
  name: 'HelloWorld',
  components: {
    'HeadPage': HeadPage,
    'MenuPage': MenuPage
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .el-header, .el-footer {
    background-color: #545c64;
    color: #fff;
    text-align: center;
    line-height: 80px;
  }

  .el-aside {
    background-color: #fff;
    color: #fff;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #fff;
    color: #fff;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }
</style>
