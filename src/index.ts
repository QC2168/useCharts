import { nextTick, onMounted, onUnmounted, unref } from "vue";
import type { Ref } from "vue";
import echarts from "./lib";
import { SVGRenderer, CanvasRenderer } from "echarts/renderers";
import type { EChartsOption, SetOptionOpts } from "echarts";
import { RenderType, ThemeType, UseChartsOptionType } from "./types";
export * from "./types";

export default function useChart(
    elRef: Ref<HTMLDivElement>,
    option?: UseChartsOptionType
) {
    const { render, theme, autoChartSize, animation } = option || {
        render: RenderType.SVGRenderer,
        autoChartSize: false,
        animation: {},
        theme: ThemeType.Default,
    };
    // 渲染模式
    echarts.use(render === RenderType.SVGRenderer ? SVGRenderer : CanvasRenderer);
    // echart实例
    let chartInstance: echarts.ECharts | null = null;

    // 初始化echart
    const initCharts = () => {
        const el = unref(elRef);
        if (!el || !unref(el)) {
            return;
        }
        chartInstance = echarts.init(el, theme);
    };

    // 更新/设置配置
    function setOption(option: EChartsOption,opts: boolean|SetOptionOpts=false, lazyUpdate=false): void{
        nextTick(() => {
            if (!chartInstance) {
                initCharts();
                if (!chartInstance) return;
            }
            if(typeof opts ==='boolean'){
                chartInstance.setOption(option,opts,lazyUpdate);
            } else if(typeof opts === 'object'){
                chartInstance.setOption(option,opts);
            }
            hideLoading();
        });
    };

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
        if (animation?.enable) {
            let styles = animation?.styles ?? {};
            for (let key in styles) {
                elRef.value.style[key] = styles[key];
            }
        }
        const resizeObserver = new ResizeObserver((entries) => resize());
        resizeObserver.observe(elRef.value);
    }

    // 显示加载状
    function showLoading() {
        if (!chartInstance) {
            initCharts();
        }
        chartInstance?.showLoading();
    }
    // 显示加载状
    function hideLoading() {
        if (!chartInstance) {
            initCharts();
        }
        chartInstance?.hideLoading();
    }

    onMounted(() => {
        window.addEventListener("resize", resize);
        if (autoChartSize) watchEl();
    });

    onUnmounted(() => {
        window.removeEventListener("resize", resize);
    });

    return {
        setOption,
        getInstance,
        showLoading,
        hideLoading,
    };
}
