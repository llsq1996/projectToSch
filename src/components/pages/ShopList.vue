<template>
  <div>
    <el-row>
      <br/>
      <el-col  :span="22" :offset="1">
        <el-card >
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer;color: goldenrod">&nbsp;&nbsp;首页</b><b> / 商家列表</b></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
      <br/>  <br/>  <br/> <br/>
      <el-col  :span="22" :offset="1">
        <el-switch
          v-model="key"
          @change="getShopList"
          inactive-text="商家列表"
          active-text="线下商家列表"
          active-value=2
          inactive-value=1
          inactive-color="#13ce66">
        </el-switch>
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
          <el-table-column prop="id" label="id" width="70"  sortable></el-table-column>
          <el-table-column prop="category" label="类别" width="120" sortable></el-table-column>
          <el-table-column prop="spName" label="商家名称" width="200" sortable>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>商家负责人: {{ scope.row.leader }}</p>
                <p>联系方式: {{ scope.row.leaderPhone }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.spName }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="isTradeMark" label="品牌商家" width="100" sortable>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>地址: {{ scope.row.address }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.isTradeMark }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="delivery" label="配送方式" width="100" sortable>
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
          <el-table-column prop="worker" label="录入人" width="100" sortable>
            <template slot-scope="scope">
              <el-popover trigger="hover" placement="top">
                <p>客服电话: {{ scope.row.cusPhone }}</p>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.worker }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
          <el-table-column prop="CTime" label="创建时间" width="180" sortable></el-table-column>
          <el-table-column prop="ETime" label="修改时间" width="180" sortable></el-table-column>
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'ShopList',
  created () {
    this.getShopList(this.key)
  },
  data () {
    return {
      originData: [],
      filterData: [],
      currentPage: 1,
      pageSize: 10,
      pageSizeLists: [10, 15, 20, 25],
      total: 0,
      searchWards: '',
      key: 1
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
    getShopList (key) {
      let str = '/api/shopList?key=' + key
      console.log(str)
      this.$http.get(str).then(ref => {
        if (ref.body.code === 1) {
          this.originData = ref.body.data
          console.log(this.originData)
          this.filterData = JSON.parse(JSON.stringify(this.originData))
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
    // 向后台发送请求逻辑删除该门店，并刷新页面
    Del (id) {
      console.log(id)
      this.$http.get('/api/shopDelete?id=' + id).then(ref => {
        if (ref.body.code === 1) {
          this.$message.success('删除成功')
          this.filterData = this.filterData.filter(x => x.id !== id)
        } else {
          this.$message.error('服务错误')
        }
      })
    },
    search () {
      console.log(this.searchWards)
      let wards = this.searchWards.toLowerCase()
      this.filterData = this.originData.filter(data => {
        return (data.id.toString().toLowerCase().includes(wards)) ||
         (data.category.toLowerCase().includes(wards)) ||
        (data.spName.toLowerCase().includes(wards)) ||
          (data.isTradeMark.toLowerCase().includes(wards)) ||
          (data.delivery.toLowerCase().includes(wards)) ||
          (data.worker.toLowerCase().includes(wards))
      })
      this.total = this.filterData.length
    },
    // 跳转到详情页，携带id
    Detail (id) {
      console.log(id)
      this.$router.push({
        params: {id: id},
        name: 'shopDetail'
      })
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
      } else if (obj.prop === 'category') {
        if (obj.order === 'descending') {
          this.filterData.sort((a, b) => {
            return b.category - a.category
          })
        } else if (obj.order === 'ascending') {
          this.filterData.sort((a, b) => {
            return a.category - b.category
          })
        }
      } else if (obj.prop === 'spName') {
        if (obj.order === 'descending') {
          this.filterData.sort((a, b) => {
            return b.spName - a.spName
          })
        } else if (obj.order === 'ascending') {
          this.filterData.sort((a, b) => {
            return a.spName - b.spName
          })
        }
      } else if (obj.prop === 'isTradeMark') {
        if (obj.order === 'descending') {
          this.filterData.sort((a, b) => {
            return b.isTradeMark - a.isTradeMark
          })
        } else if (obj.order === 'ascending') {
          this.filterData.sort((a, b) => {
            return a.isTradeMark - b.isTradeMark
          })
        }
      } else if (obj.prop === 'delivery') {
        if (obj.order === 'descending') {
          this.filterData.sort((a, b) => {
            return b.delivery - a.delivery
          })
        } else if (obj.order === 'ascending') {
          this.filterData.sort((a, b) => {
            return a.delivery - b.delivery
          })
        }
      } else if (obj.prop === 'worker') {
        if (obj.order === 'descending') {
          this.filterData.sort((a, b) => {
            return b.worker - a.worker
          })
        } else if (obj.order === 'ascending') {
          this.filterData.sort((a, b) => {
            return a.worker - b.worker
          })
        }
      } else if (obj.prop === 'CTime') {
        if (obj.order === 'descending') {
          this.filterData.sort((a, b) => {
            return b.CTime - a.CTime
          })
        } else if (obj.order === 'ascending') {
          this.filterData.sort((a, b) => {
            return a.CTime - b.CTime
          })
        }
      } else if (obj.prop === 'ETime') {
        if (obj.order === 'descending') {
          this.filterData.sort((a, b) => {
            return b.ETime - a.ETime
          })
        } else if (obj.order === 'ascending') {
          this.filterData.sort((a, b) => {
            return a.ETime - b.ETime
          })
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
