<script setup lang="ts">
import { ref } from 'vue';
import Chart from './components/Chart/index.vue'

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
</script>

<template>
  <Chart :width="w" :height="h"></Chart>
</template>

