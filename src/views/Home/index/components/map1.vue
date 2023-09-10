<template>
    <div style="height: 100%">
        <div ref="map1" :style="style"></div>
    </div>
</template>
<script>
import * as echarts from 'echarts'
import guangdongMap from '@/assets/json/guangdong.json'
export default {
    name: 'Map1',
    props: {
        width: { type: String, default: '100%' },
        height: { type: String, default: '100%' }
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
        this.myChart = echarts.init(this.$refs.map1)
        echarts.registerMap('guangdong', guangdongMap)
        const option = {
            title: {
                text: '广东省员工分布',
                left: 'center'
            },
            geo: {
                show: true,
                type: 'map',
                map: 'guangdong',
                label: { // 标签文字样式
                    show: false,
                    color: '#666',
                    fontSize: 12
                },
                itemStyle: { // 区域样式
                    areaColor: '#5e84fd',
                    borderColor: '#fff'
                },
                emphasis: { // 高亮状态下的样式
                    itemStyle: {
                        areaColor: '#9069eb8a'
                    }
                },
                zoom: 1.1
            },
            series: [
                { // 涟漪
                    type: 'effectScatter',
                    coordinateSystem: 'geo',
                    symbol: 'circle',
                    symbolSize: function(v) {
                        return v[2]
                    },
                    // 涟漪设置
                    rippleEffect: {
                        color: '#29bce1'
                    },
                    label: {
                        show: true,
                        position: 'right',
                        formatter: '{b}'
                    },
                    itemStyle: {
                        color: '#5e84fd', // 涟漪颜色
                        number: 3, // 波纹数量
                        period: 4, // 涟漪动画周期
                        scale: 2.5, // 动画中波纹的最大缩放比例
                        brushType: 'fill' // 波纹的绘制方式
                    },
                    data: [
                        { name: '广州', value: [113.280637, 23.125178, 10] },
                        { name: '韶关', value: [113.591544, 24.801322, 4] },
                        { name: '深圳', value: [114.085947, 22.547, 10] },
                        { name: '珠海', value: [113.553986, 22.224979, 10] },
                        { name: '汕头', value: [116.575361, 23.322231, 4] },
                        { name: '湛江', value: [110.364977, 21.274898, 6] },
                        { name: '江门', value: [113.094942, 22.590431, 6] }
                    ]
                },
                {
                    type: 'lines',
                    coordinateSystem: 'geo',
                    effect: {
                        show: true,
                        period: 4,
                        trailLength: 0.2,
                        symbol: 'arrow',
                        symbolSize: 8,
                        color: '#29bce1'
                    },
                    lineStyle: {
                        color: '#29bce1',
                        width: 1,
                        curveness: 0.3,
                        opacity: 0.5
                    },
                    data: [
                        {
                            coords: [
                                [113.280637, 23.125178], // 起点 广州
                                [113.591544, 24.801322] // 终点 韶关
                            ]
                        },
                        {
                            coords: [
                                [114.085947, 22.547], // 起点 深圳
                                [110.364977, 21.274898] // 终点 湛江
                            ]
                        }

                    ]
                }
            ]

        }
        this.myChart.setOption(option)
        // 响应式
        window.addEventListener('resize', () => {
            this.myChart.resize()
        })
    }
}
</script>
