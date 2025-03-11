<template>
  <div class="">
    <Bar v-if="loaded" :data="chartData" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Bar } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from 'chart.js'
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
//find out how to make vue-ChartJS work
const route = useRoute()
const stored_data = ref([])
async function getData() {
  let res = await fetch(
    `https://data.cityofnewyork.us/resource/h9gi-nx95.json?collision_id=${route.params.id}`,
  )
  let data = await res.json()
  stored_data.value = data
}
onMounted(() => getData())
</script>
