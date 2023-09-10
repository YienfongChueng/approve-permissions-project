<template>
  <div class="content">
    <!-- 一行两列 -->
      <el-row  :gutter="10">
        <el-col :xs="24" :sm="12" :md="16" :lg="16" >
          <div class="card-panel">
            <!-- 两行三列 -->
            <el-row :gutter="10">
              <el-col :span="8">
                <CountTo title="企业投资回报" :qty="13595" :colorBg="randomRgbColor()"></CountTo>
              </el-col>
              <el-col :span="8">
                <CountTo title="营销运营服务" :qty="9833" :colorBg="randomRgbColor()"></CountTo>
              </el-col>
              <el-col :span="8">
                <CountTo title="业绩领跑率" :qty="8888" :colorBg="randomRgbColor()"></CountTo>
              </el-col>
            </el-row>
            <!-- 两行三列 -->
            <el-row :gutter="10">
              <el-col :span="8">
                <CountTo title="市场回报率" :qty="6666" :colorBg="randomRgbColor()"></CountTo>
              </el-col>
              <el-col :span="8">
                <CountTo title="企业在职员工" :qty="9595" :colorBg="randomRgbColor()"></CountTo>
              </el-col>
              <el-col :span="8">
                <CountTo title="精准客户资源" :qty="15598" :colorBg="randomRgbColor()"></CountTo>
              </el-col>
            </el-row>
          </div>
        </el-col>
        <el-col :xs="24" :sm="12" :md="8" :lg="8">
          <div class="card-panel"><Chart :options="chartData"/></div>
        </el-col>
      </el-row>
      <!-- 一行三列 -->
      <el-row  :gutter="10">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" >
          <div class="card-panel"><Chart :options="chartData1" /></div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" >
           <div class="card-panel"><Chart :options="chartData2"/></div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="8" :lg="8" >
          <div class="card-panel"><Chart :options="chartData3"/></div>
        </el-col>
      </el-row>
      <!-- 一行两列 -->
      <el-row  :gutter="10">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" >
          <div class="card-panel">
            <Map1 />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :md="16" :lg="16" >
           <div class="card-panel"><Map /></div>
        </el-col>
      </el-row>
  </div>
</template>
<script>
import { CountTo, Chart, Map, Map1 } from './components'
import { randomRgbColor } from '@/utils/index.js'
export default {
  components: {
    CountTo, Chart, Map, Map1
  },
  data() {
    return {
      chartData: {
        title: {
          text: '企业成长辉煌',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          type: 'category',
          data: ['2018', '2019', '2020', '2021', '2022', '2023']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [120, 200, 230, 250, 300, 340],
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)',
              borderRadius: 15
            },
            itemStyle: {
              color: 'rgba(18, 221, 221, 0.6)',
              borderRadius: 15
            },
            label: {
              show: true,
              position: 'top',
              color: '#666'
            }
          }
        ]
      },
      chartData1: {
        title: {
          text: '世界销售排名',
          left: 'center'
        },
        tooltip: {
          trigger: 'item'
        },
        xAxis: {
          type: 'category',
          data: ['中国', '美国', '德国', '英国', '意大利', '瑞士']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            data: [678, 553, 256, 137, 412, 333],
            type: 'line',
            symbol: 'triangle',
            symbolSize: 8,
            label: {
              show: true
            },
            lineStyle: {
              color: '#5470C6',
              width: 2,
              type: 'dashed'
            },
            itemStyle: {
              borderWidth: 3
              // borderColor: 'yellow',
              // color: 'yellow'
            }
          }
        ]

      },
      chartData2: {
        title: {
          text: '年度员工流失率',
          left: 'center'
        },
        tooltip: {
          formatter: '{a} <br/>{b} : {c}%'
        },
        series: [
          {
            name: '人才流失率',
            type: 'gauge',
            detail: {
              formatter: '{value}%'
            },
            data: [
              {
                value: 23,
                name: '人才流失率'
              }
            ]
          }
        ]
      },
      chartData3: {
        title: {
          text: '企业人才傍',
          left: 'center'
        },
        legend: {
          top: '9%',
          left: 'center'
        },
        series: [
          {
            name: '面积模式',
            type: 'pie',
            radius: [20, 90],
            center: ['50%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 30
            },
            data: [
              { value: 20, name: '大专' },
              { value: 48, name: '本科' },
              { value: 42, name: '硕士' },
              { value: 30, name: '博士' },
              { value: 28, name: '博士以上' }
              ]
          }
        ]
      }
    }
  },
  
  methods: {
    randomRgbColor
  }

}
</script>
<style lang="scss" scoped>
.card-panel {
  background-color: $whiteColor;
  box-shadow: 0px 8px 12px rgba(0,0,0,0.1);
  padding: 10px;
  border-radius: 8px;
  height: 300px;
  margin-bottom: 10px;
}
</style>
