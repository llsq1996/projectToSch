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
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
    }
  },
  methods: {
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.head{
  width: 100%;
  height: 10%;
  background-color:#161d29 ;
}
  .aside{
    width: 100%;
    height:90%;
    background-color:#21344f ;
  }
</style>
