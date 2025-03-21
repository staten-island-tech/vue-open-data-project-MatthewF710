<template>
  <div class="">
    <h1 class="" v-if="stored_data">Vehicle Type:{{ stored_data[0].vehicle_type_code1 }}</h1>
    <ChartComponent />
  </div>
</template>

<script setup>
import ChartComponent from '@/components/ChartComponent.vue'
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const stored_data = ref(null)
async function getData() {
  let res = await fetch(
    `https://data.cityofnewyork.us/resource/h9gi-nx95.json?collision_id=${route.params.id}`,
  )
  let data = await res.json()
  stored_data.value = data
}
onMounted(() => getData())
</script>
