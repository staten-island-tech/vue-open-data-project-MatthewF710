<template>
  <div class="">
    <h1>{{ stored_data.vehicle_make }}</h1>
    <div class="otherdatastuff">
      <h2 v-for="stat in stored_data.stats" :key="stat">FIX THIS{{ stat.base_stat }}</h2>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()
const stored_data = ref([])
async function getData() {
  let res = await fetch(`https://data.cityofnewyork.us/resource/h9gi-nx95.json/${route.params.id}`) //figure out if API works
  let data = await res.json()
  stored_data.value = data
}
onMounted(() => getData())
</script>
