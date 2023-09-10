<template>
    <div style="height: 100%">
        <div ref="chart" :style="style"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
export default {
    props: {
        width: { type: String, default: '100%' },
        height: { type: String, default: '100%' },
        options: {
            type: Object,
            default: () => ({
                title: {
                    text: 'echart图表'
                },
                xAxis: {
                    data: ['1月', '2月', '3月', '4月', '5月', '6月']
                },
                yAxis: {},
                series: [
                    {
                        type: 'bar',
                        data: [10, 20, 30, 40, 50, 60]
                    }
                ]
            })
}

    },
    data() {
        return {
            myChart: ''
        }
    },
    computed: {
        style() {
            return {
                 width: this.width,
                 height: this.height
            }
        }
    },
    mounted() {
        this.myChart = echarts.init(this.$refs.chart)
        this.myChart.setOption(this.options)
        // 响应式
        window.addEventListener('resize', () => {
            this.myChart.resize()
        })
    }

}
</script>
<style lang="scss" scoped>
</style>