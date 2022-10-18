# useCharts

## 📖 Introduction

Using usecharts can make it easier to create chart components

## 🌈 Feature

- auto resize chart
- Loading effect before rendering
- custom theme
- custom renderer

## 📦 Installation

```
# pnpm (recommend)
pnpm add echarts @qc2168/use-charts

# yarn
yarn add echarts @qc2168/use-charts

# npm
npm install echarts @qc2168/use-charts

```

## 🤖 Usage

```typescript

// template

<!-- width height must be provided for element -->

<div ref="chartEl" style="height:200px;width:200px;"><div>


// script setup
import useChart from "@qc2168/use-charts"
//  provide a element
const chartEl = ref<HTMLDivElement | null>(null)

const {
    setOption,
    showLoading,
} = useChart(chartEl as Ref<HTMLDivElement>)

onMounted(() => {
    onMounted(() => {
    nextTick(() => {
        // turn on chart loading ~
        showLoading()
        // setOption
        setOption({
            /* set data ... */
        })
    })
})
}),
```
> example https://github.com/QC2168/useCharts/tree/main/example

## 🛠️ Argument

| Name    | Description       | Type                  | required |
| ------- | ----------------- | --------------------- | -------- |
| elRef   | echart dom        | `Ref<HTMLDivElement>` | `true`     |
| Options | see options below | `OptionsType`         | `false`    |

### OptionsType
| Name          | Description               | Type                                               | required | Default                  |
| ------------- | ------------------------- | -------------------------------------------------- | -------- | ------------------------ |
| render        | echart render mode        | `RenderType.SVGRenderer/RenderType.CanvasRenderer` | `false`  | `RenderType.SVGRenderer` |
| autoChartSize | watch chart size changes  | `boolean`                                          | `false`  | `false`                    |
| animation     | Define transition effects | `AnimationType`                                    | `false`  | `{}`                       |
| theme         | echart theme              | `ThemeType.Light/ThemeType.Dark/ThemeType.Default` | `false`  | `ThemeType.Default`        |

### AnimationType
| Name   | Description                                                 | Type    | required | Default |
| ------ | ----------------------------------------------------------- | ------- | -------- | ------- |
| enable | set to false to prevent the transition effects from showing | `boolean` | `false`   |         |
| styles | styles object                                               | `Object`  | `false`   |         |
