<template>
  <div >
    <el-row>
      <el-col>
        <br/>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer">&nbsp;&nbsp;首页</b><b> / 品牌商家补录</b></el-breadcrumb-item>
        </el-breadcrumb>
        <hr/>
        <br/>
      </el-col>
      <el-form ref="originData" :model="originData" label-width="120px" size="medium ">
        <el-form-item label="品牌商家" pror="isTradeMark" required>
          <el-autocomplete
            class="inline-input"
            v-model="value"
            :fetch-suggestions="querySearch"
            placeholder="请输入内容"
            @select="handleSelect"
          ></el-autocomplete>
        </el-form-item>
        <el-form-item label="品牌商家文档" prop="world">
          <el-upload
            class="upload-demo"
            :auto-upload="false"
            :action="uploadUrlExcel"
            ref="excUpload"
            :limit="1"
            :before-upload="handleBeforeExcel"
            :on-exceed="handleExceed"
            :on-success="handExSuccess"
            :data="fileData"
            :file-list="fileList">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传.xls和.xlsx的excel文件，且不超过1Mb,非品牌商家不会上传</div>
          </el-upload>
        </el-form-item>
        <el-col><br/></el-col>
        <el-form-item>
          <el-button type="primary" @click="formSubmit()">提交</el-button>
        </el-form-item>
      </el-form>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'shopSupplement',
  created () {
    let name = this.Cookie.getCookie('user')
    if (name) {
      this.fileData.user = unescape(name)
    }
  },
  data () {
    return {
      restaurants: [],
      value: '',
      originData: {id: 0},
      shopList: [],
      uploadUrlExcel: '/api/excel',
      fileList: [],
      fileData: {name: '', id: '', user: ''},
      fileSuccess: false
    }
  },
  methods: {
    querySearch (queryString, cb) {
      let restaurants = this.restaurants
      let results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants
      // 调用 callback 返回建议列表的数据
      cb(results)
    },
    createFilter (queryString) {
      return (restaurant) => {
        return (restaurant.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0)
      }
    },
    loadAll () {
      return [{'value': '肯德基'}, {'value': '麦德劳'}]
    },
    handleSelect (item) {
      console.log(item)
    },
    handleBeforeExcel (file) {
      console.log(file)
      let types = file.name.split('.')
      console.log(types)
      if (types[1] !== 'xls' && types[1] !== 'xlsx') {
        this.$message.error('上传文件类型错误，已取消该文件上传')
        return false
      }
      this.fileData.name = file.name
    },
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handExSuccess (response, file, fileList) {
      this.fileSuccess = true
      this.$message.success('提交成功')
    },
    formSubmit () {
      if (this.value) {
        this.shopList.forEach(each => {
          if (this.value === each.tradeMarkName) {
            this.fileData.id = each.id
          }
        })
        this.$refs.excUpload.submit()
      } else {
        this.$message.error('请填写品牌')
      }
    }
  },
  mounted () {
    this.$http.get('/api/tradeShop').then(ref => {
      let array = []
      this.shopList = ref.body.data
      ref.body.data.forEach(each => {
        let obj = {value: ''}
        obj.value = each.tradeMarkName
        array.push(obj)
      })
      this.restaurants = array
    })
  }
}
</script>

<style scoped>

</style>
