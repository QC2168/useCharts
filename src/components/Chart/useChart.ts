import { nextTick, onMounted, onUnmounted, Ref, unref } from "vue";
import type { EChartsOption } from 'echarts';
import echarts from "./lib";
import { throttle } from "lodash-es";
export default function useChart(elRef: Ref<HTMLDivElement>, animation: boolean = false) {

    // echart实例
    let chartInstance: echarts.ECharts | null = null;

    // 初始化echart
    const initCharts = () => {
        const el = unref(elRef)
        console.log(elRef);
        if (!el || !unref(el)) {
            return
        }
        chartInstance = echarts.init(el);

    }

    // 更新/设置配置
    const setOption = (option: EChartsOption) => {
        nextTick(() => {
            setTimeout(() => {
                if (!chartInstance) {
                    initCharts();
                    if (!chartInstance) return;
                }

                console.log(chartInstance);

                chartInstance.setOption(option)
            }, 0);
        })

    }

    // 获取echart实例
    function getInstance(): echarts.ECharts | null {
        if (!chartInstance) {
            initCharts();
        }
        return chartInstance;
    }

    // 更新大小
    function resize() {
        chartInstance?.resize();
    }

    // 监听元素大小
    function watchEl() {
        // 给元素添加过渡
        if (animation) { elRef.value.style.transition = 'width 1s, height 1s' }
        const resizeObserver = new ResizeObserver(throttle((entries => resize()), 100));
        resizeObserver.observe(elRef.value);
    }

    onMounted(() => {
        window.addEventListener('resize', throttle(resize, 1000))
        watchEl()
    })

    onUnmounted(() => {
        window.removeEventListener('resize', resize)
    })

    return {
        setOption,
        getInstance
    }
}