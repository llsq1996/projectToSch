<template>
  <div >
    <el-row >
      <el-col :span="24">
      <Head></Head>
      </el-col>
      <el-col :span="24">
        <el-col :span="4">
          <Menu></Menu>
        </el-col>
        <el-col :span="20">
          <router-view/>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import Head from '@/components/Head'
import Menu from '@/components/Menu'
export default {
  name: 'HelloWorld',
  components: {
    Head: Head,
    Menu: Menu
  },
  created () {
    let name = this.Cookie.getCookie('user')
    if (!name) {
      this.$router.push({
        name: 'login'
      })
    }
  },
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>
