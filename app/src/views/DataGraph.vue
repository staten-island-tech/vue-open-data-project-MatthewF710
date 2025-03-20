<template>
  <div class="">
    <h1 class="">Vehicle Type:</h1>
    <ChartComponent />
  </div>
</template>

<script setup>
import ChartComponent from '@/components/ChartComponent.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const stored_data = ref()
async function getData() {
  let res = await fetch(
    `https://data.cityofnewyork.us/resource/h9gi-nx95.json?collision_id=${route.params.id}`,
  )
  let data = await res.json()
  stored_data.value = data
  console.log(stored_data.vehicle_type_code1)
}
onMounted(() => getData())
</script>
