<template>
  <div class="container">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs'
import { onMounted, ref } from 'vue'
import * as chartConfig from './chartConfig.js'

ChartJS.register(ArcElement, Tooltip, Legend) // got all this stuff from vuechartjs website

export default {
  name: 'App',
  components: {
    Pie,
  },
  data() {
    return chartConfig
  },
}
</script>
