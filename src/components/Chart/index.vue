<template>
    <div ref="chartEl" :style="{ width: `${width}px`, height: `${height}px` }"></div>
</template>
<script setup lang="ts">
import { onMounted, Ref, ref, computed, nextTick } from "vue";
import type { EChartsOption } from 'echarts'
import useChart from './useChart'
import axios from 'axios'

interface Props {
    width?: Number;
    height?: Number;
}

withDefaults(defineProps<Props>(), {
    width: () => 300,
    height: () => 300
})
const statusText = ref('获取数据中')
const status = ref(false)
const barData = ref<number[]>([])

const option = computed<EChartsOption>(() => ({
    title: {
        show: barData.value.length === 0 && !status,
        text: statusText.value,
        left: 'center',
        top: 'center',
        textStyle: {
            fontSize: 20
        }
    },
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
    showLoading
} = useChart(chartEl as Ref<HTMLDivElement>, true, true)

const getData = async () => {
    try {
        const res = await axios.get('/api/bar')
        barData.value = res.data.data;
        setOption(option.value);
    } catch {
        statusText.value = '获取数据失败'
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
