<template>
  <el-cascader
    :options="options2"
    @active-item-change="handleItemChange"
    :props="props"
  ></el-cascader>
</template>

<script>
export default {
  name: 'RegionTest',
  created () {
    let url = '省份'
    // 存储省份，希望后台返回json对象数组例如[{pid:2,provincal:'北京'},{pid:2,provincal:'北京'}]
   // this.proviincals = this.$http.get('/Api' + url)
  },
  data () {
    return {
      options2: [{
        label: '江苏',
        cities: [
          {
            label: '南京'
          },
          {
            label: 'hha'
          }
        ]
      }, {
        label: '浙江',
        cities: [
          {
            label: '苏北'
          },
          {
            label: '如今'
          }
        ]
      }],
      props: {
        value: 'label',
        children: 'cities'
      },
      proviincals: {}
    }
  },
  methods: {
    //选择省份后，触发此函数，向后台发送get请求携带此省份id，收到返回的城市json对象数组[{city:''},{city:''}]
    //插入组件对应省份的城市
    handleItemChange (val) {
      console.log('active item:', val)
      setTimeout(_ => {
        if (val.indexOf('江苏') > -1 && !this.options2[0].cities.length) {
          this.options2[0].cities = [{
            label: '南京'
          }]
        } else if (val.indexOf('浙江') > -1 && !this.options2[1].cities.length) {
          this.options2[1].cities = [{
            label: '杭州'
          }]
        }
      }, 300)
    }
  }
}
</script>

<style scoped>

</style>
