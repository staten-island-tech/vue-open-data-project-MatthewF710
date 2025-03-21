<template>
  <div class="container">
    <Pie v-if="chartData" :data="chartData" />
  </div>
</template>

<script>
import { ref, watchEffect } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { data } from '../chartConfig.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'ChartComponent',
  components: { Pie },
  setup() {
    const chartData = ref(null)
    watchEffect(() => {
      if (data.value) {
        chartData.value = data.value
      }
    })

    return { chartData }
  },
}
</script>
