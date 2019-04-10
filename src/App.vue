<template>
  <div>
    <!--<img src="./assets/logo.png">-->
    <div >
      <el-button @click="change" type="primary">跳转</el-button>
    </div>
    <div >
   <router-view/>
    </div>
  </div>
</template>

<script>
import frame from './components/Frame'
export default {
  name: 'App',
  components: {frame},
  created () {
  },
  data () {
    return {
      flag: false
    }
  },
  methods: {
    change () {
      if (this.flag) {
        this.$router.push('/index')
      } else {
        this.$router.push('/test')
      }
      this.flag = !this.flag
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
