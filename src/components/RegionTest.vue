<template>
  <div>

    <el-button @click="areaTest">
      点击你这头猪hhhh
    </el-button>
  </div>

</template>

<script>
export default {
  name: 'RegionTest',
  created () {
    // 存储省份，希望后台返回json对象数组例如[{pid:2,provincal:'北京'},{pid:2,provincal:'北京'}]
    // this.proviincals = this.$http.get('/api' + url)

  },
  data () {
    return {

    }
  },
  methods: {
    // 选择省份后，触发此函数，向后台发送get请求携带此省份id，收到返回的城市json对象数组[{city:''},{city:''}]
    // 插入组件对应省份的城市

    areaTest () {
      console.log(this.area)
    },
  }
}
</script>

<style scoped>

</style>
