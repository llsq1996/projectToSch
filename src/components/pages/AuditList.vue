<template>
  <div>
    <el-row>
      <br/>
      <el-col  :span="22" :offset="1">
        <el-card >
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer;color: goldenrod">&nbsp;&nbsp;首页</b><b> / 文档审核列表</b></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
      <br/>  <br/>  <br/> <br/>
      <el-col  :span="22" :offset="1">
        <el-card >
          <el-tooltip content="支持搜索各属性" placement="top" effect="light" :hide-after=2000>
            <el-input
              placeholder="请输入搜索内容"
              prefix-icon="el-icon-search"
              clearable
              @change="search"
              v-model="searchWards"
              style="width: 600px">
              <el-button slot="append" icon="el-icon-search" @click="search"></el-button>
            </el-input>
          </el-tooltip>
        <el-table
          :data="filterData.slice((currentPage-1)*pageSize,currentPage*pageSize)"
          size="medium"
          :highlight-current-row="true"
          stripe
          @sort-change="sort"
          style="width: 100%">
          <el-table-column prop="id" label="id" width="70" sortable></el-table-column>
          <el-table-column prop="name" label="名称" width="150" ></el-table-column>
          <el-table-column prop="submitter" label="提交人" width="150" ></el-table-column>
          <el-table-column prop="tradeMarkName" label="品牌名" width="180" ></el-table-column>
          <el-table-column prop="CTime" label="上传日期" width="200" sortable></el-table-column>
          <el-table-column prop="doing" label="操作" width="200" fixed="right">
            <template slot-scope="scope">
            <el-button  type="primary" size="small" @click="Detail(scope.row.id)">自动审核</el-button>
            <el-button type="primary" size="small" @click="download(scope.row.id)">文档查看</el-button>
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
    this.$http.get('/api/auditList').then(ref => {
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
      total: 0,
      searchWards: ''
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
    download (id) {
      this.$message.info('正在下载')
      window.location.href = '/api/download?id=' + id
    },
    search () {
      console.log(this.searchWards)
      let wards = this.searchWards.toLowerCase()
      this.filterData = this.originData.filter(data => {
        return (data.id.toString().toLowerCase().includes(wards)) ||
          (data.name.toLowerCase().includes(wards)) ||
          (data.submitter.toLowerCase().includes(wards)) ||
          (data.tradeMarkName.toLowerCase().includes(wards))
      })
      this.total = this.filterData.length
    },
    Detail (id) {
      console.log(id)
      let name = this.Cookie.getCookie('user')
      if (name) {
        name = unescape(name)
      }
      this.$http.get('/api/auditExcel?id=' + id+'&name='+name).then(ref => {
        if (ref.body.code === 1) {
          this.$message.success('审核通过，已添加')
          this.filterData = this.filterData.filter(x => x.id !== id)
        } else {
          this.$message.error('审核失败，' + ref.body.msg)
        }
      })
      // this.$router.push({
      //   params: {id: id},
      //   name: 'shopDetail'
      // })
    },
    // 排序
    sort (obj) {
      console.log('sdfsd')
      console.log(obj)
      if (obj.prop === 'id') {
        if (obj.order === 'descending') {
          this.filterData.sort((a, b) => {
            return b.id - a.id
          })
        } else if (obj.order === 'ascending') {
          this.filterData.sort((a, b) => {
            return a.id - b.id
          })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
