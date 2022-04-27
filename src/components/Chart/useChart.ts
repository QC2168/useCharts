import { nextTick, Ref, unref } from "vue";
import type { EChartsOption } from 'echarts';
import echarts from "./lib";
export default function useChart(elRef: Ref<HTMLDivElement>) {

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

    return {
        setOption,
        getInstance
    }
}