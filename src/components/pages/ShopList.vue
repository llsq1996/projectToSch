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
          <el-table-column prop="spName" label="商家名称" width="200">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>商家负责人: {{ scope.row.leader }}</p>
                <p>联系方式: {{ scope.row.leaderPhone }}</p>
                <p>地址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.spName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="delivery" label="配送方式" width="100">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>起送价: {{ scope.row.deliPrice }}</p>
                <p>配送费: {{ scope.row.dispatch }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.delivery }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="worker" label="录入人" width="100">
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>客服电话: {{ scope.row.cusPhone }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.worker }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
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
          background
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
        console.log(this.originData)
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
      pageSize: 15,
      pageSizeLists: [10, 15, 20, 25],
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
      this.$http.get('/api/shopDelete?id=' + id).then(ref => {
        if (ref.body.code === 1) {
          this.$message.success('删除成功')
          location.reload()
        } else {
          this.$message.error('服务错误')
        }
      })
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
