<template>
  <div>
    <el-row>
      <br/>
      <el-col  :span="22" :offset="1">
        <el-card >
          <el-breadcrumb separator="/">
            <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer;color: goldenrod">&nbsp;&nbsp;首页</b><b> / 人员统计</b></el-breadcrumb-item>
          </el-breadcrumb>
        </el-card>
      </el-col>
      <br/>  <br/>  <br/> <br/>
    </el-row>
        <el-row type="flex">
      <el-col :span="11" :offset="1">
        <br/>
        <el-card>
        <el-table
          :data="filterData"
          size="medium"
          :highlight-current-row="true"
          stripe
          style="width: 100%">
          <el-table-column prop="name" label="名字" width="200"></el-table-column>
          <el-table-column prop="number" label="工作量" width="200">
            <template slot-scope="scope" style="width: 50%;">
              <el-popover trigger="hover" placement="right-start" >
                <el-table
                  :data="scope.row.shopList"
                  size="medium"
                  :highlight-current-row="true"
                  stripe
                  style="width: 100%"
                  max-height="300">
                  <el-table-column prop="id" label="id" width="70"></el-table-column>
                  <el-table-column prop="category" label="类别" width="120"></el-table-column>
                  <el-table-column prop="spName" label="商家名称" width="200">
                  </el-table-column>
                  <el-table-column prop="isTradeMark" label="品牌商家" width="100">
                  </el-table-column>
                  <el-table-column prop="worker" label="录入人" width="100">
                  </el-table-column>
                  <el-table-column prop="doing" label="操作" width="100" fixed="right">
                    <template slot-scope="scope">
                      <el-button  type="primary" size="small" @click="Detail(scope.row.id)">编辑</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium">{{ scope.row.number }}</el-tag>
                </div>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
        </el-card>
      </el-col>
      <el-col :span="11" :offset="1">
        <el-card>
        <div id="myChart" :style="{width: '600px', height: '400px'}">
        </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
let echarts = require('echarts/lib/echarts')
// 引入柱状图组件
require('echarts/lib/chart/bar')
// 引入提示框和title组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
export default {
  name: 'CategoryCount',
  created () {
    this.init()
    console.log(1)
  },
  data () {
    return {
      filterData: [],
      shopSum: 0,
      option: {
        title: { text: '商家类别统计' },
        tooltip: {
          trigger: 'axis',
          axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        legend: {
          data: ['品牌商家']
        },
        toolbox: {
          show: true,
          feature: {
            mark: {show: true},
            dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar', 'stack', 'tiled']},
            restore: {show: true},
            saveAsImage: {show: true}
          }
        },
        calculable: true,
        xAxis: [
          {
            type: 'value'
          }
        ],
        yAxis: [
          {
            type: 'category',
            data: []
          }
        ],
        series: [
          {
            name: '审核量',
            type: 'bar',
            stack: '总量',
            itemStyle: {normal: {label: {show: true, position: 'insideRight'}}},
            data: []
          },
          {
            name: '录入量',
            type: 'bar',
            stack: '总量',
            itemStyle: {normal: {label: {show: true, position: 'insideLeft'}}},
            data: []
          }
        ]
      }
    }
  },
  mounted () {
  },
  methods: {
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('myChart'))
      // 绘制图表
      myChart.setOption(this.option)
    },
    Detail (id) {
      console.log(id)
      this.$router.push({
        params: {id: id},
        name: 'shopDetail'
      })
    },
    init () {
      this.$http.get('/api/userCount').then(ref => {
        if (ref.body.code === 1) {
          console.log(ref.body.data)
          // 表格填充
          ref.body.data.forEach(each => {
            let obj = {
              name: '',
              number: 0,
              shopList: []
            }
            obj.name = each.name
            obj.number = each.shopList.length + each.num
            obj.shopList = each.shopList
            this.filterData.push(obj)
          })
          // 统计图填充
          for (let i = ref.body.data.length - 1; i >= 0; i--) {
            let each = ref.body.data[i]
            this.option.yAxis[0].data.push(each.name)
            this.option.series[0].data.push(each.num)
            this.option.series[1].data.push(each.shopList.length)
          }
          this.drawLine()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
