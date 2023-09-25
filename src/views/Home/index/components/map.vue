<template>
<div style="height: 100%">
    <div ref="map" :style="style"></div>
</div>
</template>
<script>
import * as echarts from 'echarts'
import chinaMap from '@/assets/json/china.json'
import { queryEmployeMap } from '@/api/modules/user.js'
export default {
    name: 'Map',
    props: {
        width: { type: String, default: '100%' },
        height: { type: String, default: '100%' }
    },
    data() {
        return {
            myChart: '',
            lists: []
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
        queryEmployeMap().then(res => {
            this.lists = res.data
            this.init()
        })
    },
    methods: {
        init() {
            this.myChart = echarts.init(this.$refs.map)
            // 注册地图
            echarts.registerMap('china', chinaMap)
            const options = {
                // geo: {
                //     show: true,
                //     type: 'map',
                //     map: 'china'
                // }
                title: {
                    text: '企业员工分布',
                    left: 'center'
                },
                visualMap: {
                    type: 'piecewise',
                    pieces: [
                        { min: 600, max: 10000 },
                        { min: 300, max: 599 },
                        { min: 100, max: 299 },
                        { min: 10, max: 99 },
                        { min: 1, max: 9 }
                        // { max: 0 }
                    ],
                    realtime: false,
                    calculable: true,
                    inRange: {
                    color: ['lightskyblue', 'yellow', 'orangered']
                    }
                },
                series: [
                    {
                        type: 'map',
                        map: 'china',
                        label: { // 标签文字样式 图形上的文本标签，可用于说明图形的一些数据信息，比如值，名称等。
                            show: true,
                            // color: '#fff',
                            color: '#666',
                            fontSize: 12
                        },
                        itemStyle: { // 区域样式
                            areaColor: '#5e84fd',
                            borderColor: '#fff',
                            shadowOffsetX: 3,
                            shadowOffsetY: 3,
                            shadowColor: 'rgba(255, 255, 255, 0.5)',
                            shadowBlur: 10
                        },
                        emphasis: { // 高亮状态下的样式
                            itemStyle: {
                                areaColor: '#9069eb8a'
                            }
                        },
                        data: this.lists

                    }
                ]

            }
            this.myChart.setOption(options)
            // 响应式
            window.addEventListener('resize', () => {
                this.myChart.resize()
            })
        }

    }

}
</script>
<style lang="scss" scoped>

</style>