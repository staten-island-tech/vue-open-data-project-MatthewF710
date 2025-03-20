<template>
  <div class="container">
    <Pie :data="chartData" />
  </div>
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { onMounted, ref } from 'vue'
import * as chartConfig from '../chartConfig.js'

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
