# useCharts

## 📖 Introduction

Using usecharts can make it easier to create chart components

## 🌈 Feature
 - auto resize chart
 - Loading effect before rendering
 - custom theme
 - custom renderer

📦 Installation

```
# pnpm
pnpm add echart @qc2168/use-charts

# yarn
yarn add echart @qc2168/use-charts

# npm
npm install echart @qc2168/use-charts

```

## 🤖 Usage

```typescript
// template
<!-- width height must be provided for element -->

<div ref="chartEl" style="height:200px;width:200px;"><div>


// script setup

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
            /*  */
        })
    })
})
}),
```