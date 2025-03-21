<template>
  <div>
    <QuestionData
      v-for="item in car_crashes"
      :key="item.name"
      :id="parseInt(item.collision_id)"
      :item="item"
    >
    </QuestionData>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import QuestionData from '@/components/questionData.vue'
const car_crashes = ref([])
async function getCrashes() {
  let res = await fetch('https://data.cityofnewyork.us/resource/h9gi-nx95.json')
  let data = await res.json()
  car_crashes.value = data
}
onMounted(() => getCrashes())
</script>
<style scoped></style>
