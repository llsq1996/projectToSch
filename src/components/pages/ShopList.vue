<template>
  <div>
    <el-row>
      <el-col>
        <br/>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer">&nbsp;&nbsp;首页</b><b> / 商家列表</b></el-breadcrumb-item>
        </el-breadcrumb>
        <hr/>
        <br/>
      </el-col>
      <el-col :span="24" :offset="1">
        <el-table
          :data="filterData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          size="medium"
          :highlight-current-row="true"
          stripe
          style="width: 100%">
          <el-table-column prop="id" label="id" width="80"></el-table-column>
          <el-table-column prop="category" label="类别" width="120"></el-table-column>
          <el-table-column prop="spName" label="商家名称" width="220"></el-table-column>
          <el-table-column prop="address" label="地址" width="200"></el-table-column>
          <el-table-column prop="CTime" label="创建时间" width="200"></el-table-column>
          <el-table-column prop="ETime" label="修改时间" width="200"></el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="pageSizeList"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ShopList',
  created () {
    this.$http.get('/api/shopList').then(ref => {
      if (ref.body.code === 1) {
        this.originData = ref.body.data
        this.filterData = JSON.parse(JSON.stringify(this.originData))
        console.log(this.filterData.length)
        this.total = this.filterData.length
      } else {
        this.$message({
          showClose: true,
          message: '服务器返回错误',
          type: 'error'
        })
      }
    })
  },
  data () {
    return {
      originData: [],
      filterData: [],
      currentPage: 1,
      pageSize: 10,
      total: 0,
      pageSizeList: [10, 50, 100, 200]
    }
  },
  methods: {
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pageSize = val
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.currentPage = val
    }
  }
}
</script>

<style scoped>

</style>
