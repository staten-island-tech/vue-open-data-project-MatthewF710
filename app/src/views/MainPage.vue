<template>
  <div>
    <PokemonCard v-for="(item, index) in car_crashes" :key="item.name" :id="index + 1" :item="item">
    </PokemonCard>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import Graph from '@/components/questionData.vue'
const car_crashes = ref([])
async function getCrashes() {
  let res = await fetch('https://data.cityofnewyork.us/resource/pvqr-7yc4.json')
  let data = await res.json()
  car_crashes.value = data.results
}
onMounted(() => getCrashes())
</script>
<style scoped></style>
