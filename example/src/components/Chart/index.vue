<template>
    <div ref="chartEl" :style="{ width: `${w}px`, height: `${h}px` }"></div>
</template>
<script setup lang="ts">
import { onMounted, Ref, ref, computed, nextTick } from "vue";
import type { EChartsOption } from 'echarts'
import useChart, { RenderType, ThemeType } from '@qc2168/use-charts'
import axios from 'axios'

let w = ref<number>(300)
let h = ref<number>(300)

setInterval(() => {
    w.value += 100
    h.value += 100
    if (w.value >= 1000) {
        w.value = 300
        h.value = 300
    }
}, 1000)

// 图表数据
const barData = ref<number[]>([])

const option = computed<EChartsOption>(() => ({
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: barData.value,
            type: 'line',
            smooth: true
        }
    ]

}))

const chartEl = ref<HTMLDivElement | null>(null)

const {
    setOption,
    showLoading,
} = useChart(chartEl as Ref<HTMLDivElement>, true, true, RenderType.SVGRenderer, ThemeType.Light)

const getData = async () => {
    try {
        const res = await axios.get('/api/bar')
        barData.value = res.data.data;
        setOption(option.value);
    } catch {
        setOption({
            title: {
                show: true,
                text: '获取数据失败',
                left: 'center',
                top: 'center',
                textStyle: {
                    fontSize: 20
                }
            }
        });
    }
}



onMounted(() => {
    nextTick(() => {
        showLoading()
        getData()
    })
})

</script>
<style lang="less" scoped>
</style>
