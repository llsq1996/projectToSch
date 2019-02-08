<template>
  <div>
    <el-row>
      <el-col>
        <br/>
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{path:'/index'}" ><b style="cursor: pointer">&nbsp;&nbsp;首页</b><b> / 商家类别统计</b></el-breadcrumb-item>
        </el-breadcrumb>
        <hr/>
        <br/>
      </el-col>
    </el-row>
        <el-row type="flex">
      <el-col :span="11" :offset="1">
        <el-tag>商家总数:{{shopSum}}</el-tag>
        <br/>
        <el-table
          :data="filterData"
          size="medium"
          :highlight-current-row="true"
          stripe
          style="width: 100%">
          <el-table-column prop="categoryName" label="商家类别" width="250"></el-table-column>
          <el-table-column prop="number" label="数量" width="250">
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
      </el-col>
      <el-col :span="12" >
        <div id="myChart" :style="{width: '600px', height: '400px'}">
        </div>
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
            name: '品牌商家',
            type: 'bar',
            stack: '总量',
            itemStyle: {normal: {label: {show: true, position: 'insideRight'}}},
            data: []
          },
          {
            name: '非品牌商家',
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
     init () {
      this.$http.get('/api/categoryCount').then(ref => {
        if (ref.body.code === 1) {
          console.log(ref.body.data)
          // 表格填充
          ref.body.data.forEach(each => {
            let obj = {
              categoryName: '',
              number: 0,
              shopList: []
            }
            obj.categoryName = each.categoryName
            obj.number = each.shopList.length
            obj.shopList = each.shopList
            this.filterData.push(obj)
            this.option.yAxis[0].data.push(each.categoryName)
            this.option.series[0].data.push(each.pinNum)
            this.option.series[1].data.push(each.shopList.length-each.pinNum)
            this.shopSum+=each.shopList.length
          })
          this.drawLine()
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
