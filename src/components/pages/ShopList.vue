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
      <el-col :span="23" :offset="1">
        <el-table
          :data="filterData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          size="medium"
          :highlight-current-row="true"
          stripe
          style="width: 100%">
          <el-table-column prop="id" label="id" width="70"></el-table-column>
          <el-table-column prop="category" label="类别" width="120"></el-table-column>
          <el-table-column prop="spName" label="商家名称" width="200"></el-table-column>
          <el-table-column prop="delivery" label="配送方式" width="100"></el-table-column>
          <el-table-column prop="CTime" label="创建时间" width="180"></el-table-column>
          <el-table-column prop="ETime" label="修改时间" width="180"></el-table-column>
          <el-table-column prop="doing" label="操作" width="200" fixed="right">
            <template slot-scope="scope">
            <el-button  type="primary" size="small" @click="Detail(scope.row.id)">编辑</el-button>
            <el-button type="danger" size="small" @click="Del(scope.row.id)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pageSize"
          layout="total, prev, pager, next, jumper"
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
      total: 0
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
    },
    // 向后台发送请求逻辑删除该门店，并刷新页面
    Del (id) {
      console.log(id)
      // to do
      location.reload()
    },
    // 跳转到详情页，携带id
    Detail (id) {
      console.log(id)
      this.$router.push({
        params: {id: id},
        name: 'shopDetail'
      })
    }
  }
}
</script>

<style scoped>

</style>
