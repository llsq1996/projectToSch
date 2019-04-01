<template>
  <div>
    <el-row>
      <br/>
      <el-col  :span="22" :offset="1">
        <el-card >
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer;color: goldenrod">&nbsp;&nbsp;首页</b><b> / 审核归档列表</b></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
      <br/>  <br/>  <br/> <br/>
      <el-col  :span="22" :offset="1">
        <el-card >
        <el-table
          :data="filterData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          size="medium"
          :highlight-current-row="true"
          stripe
          style="width: 100%">
          <el-table-column prop="id" label="id" width="70"></el-table-column>
          <el-table-column prop="name" label="名称" width="150"></el-table-column>
          <el-table-column prop="submitter" label="提交人" width="150"></el-table-column>
          <el-table-column prop="tradeMarkName" label="品牌名" width="200"></el-table-column>
          <el-table-column prop="ETime" label="审核日期" width="200"></el-table-column>
          <el-table-column prop="doing" label="操作" width="150" fixed="right">
            <template slot-scope="scope">
            <el-button type="primary" size="small" @click="download(scope.row.id,scope.row.name)">文档查看</el-button>
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
  name: 'AuditList',
  created () {
    this.$http.get('/api/auditList2').then(ref => {
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
    download (id, name) {
      this.$message.info('正在下载')
      this.$http.get('/api/download?id=' + id).then(ref => {
        console.log(ref)
        let aTag = document.createElement('a')
        let blob = new Blob([ref.body.data], {type: 'application/vnd.ms-excel'})
        aTag.download = name
        aTag.href = URL.createObjectURL(blob)
        aTag.click()
        URL.revokeObjectURL(blob)
      })
    },
    // 跳转到详情页，携带id
    Detail (id) {
      console.log(id)
      this.$http.get('/api/auditExcel?id=' + id).then(ref => {
        if (ref.body.code === 1) {
          this.$message.success('审核通过，已添加')
        } else {
          this.$message.error('审核失败，' + this.body.msg)
        }
      })
      // this.$router.push({
      //   params: {id: id},
      //   name: 'shopDetail'
      // })
    }
  }
}
</script>

<style scoped>

</style>
