import { onMounted, onUnmounted, nextTick, unref } from 'vue';
import * as echarts from 'echarts/core';
import { BarChart, LineChart, PieChart, MapChart, RadarChart, PictorialBarChart, ScatterChart } from 'echarts/charts';
import { LegendComponent, TitleComponent, TooltipComponent, GridComponent, PolarComponent, AriaComponent, ParallelComponent, RadarComponent, ToolboxComponent, DataZoomComponent, VisualMapComponent, TimelineComponent, CalendarComponent, GraphicComponent } from 'echarts/components';
import { SVGRenderer, CanvasRenderer } from 'echarts/renderers';

echarts.use([
    LegendComponent,
    TitleComponent,
    TooltipComponent,
    GridComponent,
    PolarComponent,
    AriaComponent,
    ParallelComponent,
    BarChart,
    LineChart,
    PieChart,
    MapChart,
    RadarChart,
    PictorialBarChart,
    RadarComponent,
    ToolboxComponent,
    DataZoomComponent,
    VisualMapComponent,
    TimelineComponent,
    CalendarComponent,
    GraphicComponent,
    ScatterChart
]);

var RenderType;
(function (RenderType) {
    RenderType["SVGRenderer"] = "SVGRenderer";
    RenderType["CanvasRenderer"] = "SVGRenderer";
})(RenderType || (RenderType = {}));
var ThemeType;
(function (ThemeType) {
    ThemeType["Light"] = "light";
    ThemeType["Dark"] = "dark";
    ThemeType["Default"] = "default";
})(ThemeType || (ThemeType = {}));

function useChart(elRef, autoChartSize = false, animation = false, render = RenderType.SVGRenderer, theme = ThemeType.Default) {
    // 渲染模式
    echarts.use(render === RenderType.SVGRenderer ? SVGRenderer : CanvasRenderer);
    // echart实例
    let chartInstance = null;
    // 初始化echart
    const initCharts = () => {
        const el = unref(elRef);
        if (!el || !unref(el)) {
            return;
        }
        chartInstance = echarts.init(el, theme);
    };
    // 更新/设置配置
    const setOption = (option) => {
        nextTick(() => {
            if (!chartInstance) {
                initCharts();
                if (!chartInstance)
                    return;
            }
            chartInstance.setOption(option);
            hideLoading();
        });
    };
    // 获取echart实例
    function getInstance() {
        if (!chartInstance) {
            initCharts();
        }
        return chartInstance;
    }
    // 更新大小
    function resize() {
        chartInstance === null || chartInstance === void 0 ? void 0 : chartInstance.resize();
    }
    // 监听元素大小
    function watchEl() {
        // 给元素添加过渡
        if (animation) {
            elRef.value.style.transition = 'width 1s, height 1s';
        }
        const resizeObserver = new ResizeObserver((entries => resize()));
        resizeObserver.observe(elRef.value);
    }
    // 显示加载状
    function showLoading() {
        if (!chartInstance) {
            initCharts();
        }
        chartInstance === null || chartInstance === void 0 ? void 0 : chartInstance.showLoading();
    }
    // 显示加载状
    function hideLoading() {
        if (!chartInstance) {
            initCharts();
        }
        chartInstance === null || chartInstance === void 0 ? void 0 : chartInstance.hideLoading();
    }
    onMounted(() => {
        window.addEventListener('resize', resize);
        if (autoChartSize)
            watchEl();
    });
    onUnmounted(() => {
        window.removeEventListener('resize', resize);
    });
    return {
        setOption,
        getInstance,
        showLoading,
        hideLoading
    };
}

export { RenderType, ThemeType, useChart as default };
