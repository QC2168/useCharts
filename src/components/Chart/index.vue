<template>
    <div ref="chartEl" :style="{ width: `${width}px`, height: `${height}px` }"></div>
</template>
<script setup lang="ts">
import { onMounted, Ref, ref } from "vue";
import type { EChartsOption } from 'echarts'
import useChart from './useChart'

interface Props {
    width?: Number;
    height?: Number;
}

withDefaults(defineProps<Props>(), {
    width: () => 300,
    height: () => 300
})
const option: EChartsOption = {
    xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }
    ]

}

const chartEl = ref<HTMLDivElement | null>(null)

const {
    setOption
} = useChart(chartEl as Ref<HTMLDivElement>,true)

onMounted(() => {
    setOption(option)
})

</script>
<style lang="less" scoped>
</style>
