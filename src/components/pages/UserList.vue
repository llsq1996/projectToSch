<template>
  <div>
    <el-row>
      <br/>
      <el-col  :span="22" :offset="1">
        <el-card >
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer;color: goldenrod">&nbsp;&nbsp;首页</b><b> / 人员列表</b></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
      <br/>  <br/>  <br/> <br/>
      <el-col :span="22" :offset="1">
        <el-card >
        <el-table
          :data="filterData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          size="medium"
          :highlight-current-row="true"
          stripe
          style="width: 100%">
          <el-table-column prop="userId" label="id" width="100"></el-table-column>
          <el-table-column prop="userName" label="人员名字" width="200"></el-table-column>
          <el-table-column prop="isAdmin" label="审核权限" width="230"></el-table-column>
          <el-table-column prop="isAudit" label="管理员权限" width="230"></el-table-column>
          <el-table-column prop="doing" label="操作" width="200" fixed="right">
            <template slot-scope="scope">
            <el-button  type="primary" size="small" @click="Detail(scope.row.userId)">编辑</el-button>
            <el-button type="danger" size="small" @click="Del(scope.row.userId)">删除</el-button>
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ShopList',
  created () {
    this.admin = unescape(this.Cookie.getCookie('isAdmin'))
    console.log(this.admin)
    if (this.admin !== '1') {
      this.$message.error('无管理员权限')
    } else {
      this.$http.get('/api/userList').then(ref => {
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
    }
  },
  data () {
    return {
      originData: [],
      filterData: [],
      currentPage: 1,
      pageSize: 15,
      pageSizeLists: [10, 15, 20, 25],
      total: 0,
      admin: 2
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
      this.$http.get('/api/userDelete?userId=' + id).then(ref => {
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
        name: 'userDetail'
      })
    }
  }
}
</script>

<style scoped>

</style>
