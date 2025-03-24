<template>
  <div class="min-h-screen bg-light-gray-bg text-text-color flex flex-col items-center py-12">
    <router-link
      to="/"
      class="btn bg-blue-bg text-white hover:bg-indigo-blue-dark px-6 py-3 rounded-md shadow-md transition-transform transform hover:scale-105 hover:-translate-y-1 ease-in-out duration-300 mb-8"
    >
      Home
    </router-link>
    <h1 v-if="stored_data" class="text-3xl font-semibold text-indigo-blue-dark mb-6">
      Vehicle Type:
      <span class="text-2xl text-gold mb-6">{{ stored_data[0].vehicle_type_code1 }}</span>
    </h1>
    <h1 v-if="stored_data" class="text-3xl font-semibold text-indigo-blue-dark mb-6">
      Time:
      <span class="text-2xl text-gold mb-6">{{ stored_data[0].crash_time }}</span>
    </h1>
    <div class="w-full max-w-4xl px-6">
      <ChartComponent />
    </div>
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
