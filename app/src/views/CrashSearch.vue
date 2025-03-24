<template>
  <div class="min-h-screen bg-light-gray-bg text-text-color flex flex-col items-center py-12">
    <router-link
      to="/"
      class="btn bg-blue-bg text-white hover:bg-indigo-blue-dark px-6 py-3 rounded-md shadow-md transition-transform transform hover:scale-105 hover:-translate-y-1 ease-in-out duration-300 mb-8"
    >
      Home
    </router-link>
    <div class="space-y-4 w-full max-w-xl px-6">
      <div class="flex items-center space-x-4">
        <input
          v-model="searching"
          type="text"
          placeholder="Search Here!"
          class="input input-bordered bg-white w-full border-black text-text-color focus:border-blue-500 px-4 py-3 rounded-md"
        />
        <button
          @click="search"
          class="btn bg-button-color text-white hover:bg-indigo-blue-dark px-6 py-3 rounded-md shadow-md transition-transform transform hover:scale-105 hover:-translate-y-1 ease-in-out duration-300"
        >
          Search
        </button>
      </div>
      <div class="flex flex-wrap gap-4 mt-6">
        <button
          @click="updateCategory('borough')"
          :class="{
            'bg-indigo-500 text-white': category === 'borough',
            'bg-blue-bg text-white': category !== 'borough',
            'opacity-50 cursor-not-allowed': category !== '' && category !== 'borough',
          }"
          class="btn hover:bg-indigo-blue-dark px-6 py-3 rounded-md shadow-md transition-transform transform hover:scale-105 hover:-translate-y-1 ease-in-out duration-300"
        >
          Borough
        </button>
        <button
          @click="updateCategory('vehicle_type_code1')"
          :class="{
            'bg-indigo-500 text-white': category === 'vehicle_type_code1',
            'bg-blue-bg text-white': category !== 'vehicle_type_code1',
            'opacity-50 cursor-not-allowed': category !== '' && category !== 'vehicle_type_code1',
          }"
          class="btn hover:bg-indigo-blue-dark px-6 py-3 rounded-md shadow-md transition-transform transform hover:scale-105 hover:-translate-y-1 ease-in-out duration-300"
        >
          Car
        </button>
        <button
          @click="updateCategory('checkInjury')"
          :class="{
            'bg-indigo-500 text-white': category === 'checkInjury',
            'bg-blue-bg text-white': category !== 'checkInjury',
            'opacity-50 cursor-not-allowed': category !== '' && category !== 'checkInjury',
          }"
          class="btn hover:bg-indigo-blue-dark px-6 py-3 rounded-md shadow-md transition-transform transform hover:scale-105 hover:-translate-y-1 ease-in-out duration-300"
        >
          Amount Injured
        </button>
        <button
          @click="updateCategory('checkKilled')"
          :class="{
            'bg-indigo-500 text-white': category === 'checkKilled',
            'bg-blue-bg text-white': category !== 'checkKilled',
            'opacity-50 cursor-not-allowed': category !== '' && category !== 'checkKilled',
          }"
          class="btn hover:bg-indigo-blue-dark px-6 py-3 rounded-md shadow-md transition-transform transform hover:scale-105 hover:-translate-y-1 ease-in-out duration-300"
        >
          Amount Killed
        </button>
      </div>
    </div>
    <div v-if="filteredCrashes.length === 0 && searching !== ''" class="mt-4">
      <p class="text-red-500 font-semibold">Please reenter: invalid or doesn't exist in the API.</p>
    </div>
    <div v-else class="mt-6 grid grid-cols-3 gap-6 w-full px-4">
      <div v-for="item in filteredCrashes" :key="item.name" class="w-full">
        <CrashCard :id="parseInt(item.collision_id)" :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import CrashCard from '@/components/crashCard.vue'
const car_crashes = ref([])
const searching = ref('')
const category = ref('')
const filteredCrashes = ref([])
async function getCrashes() {
  let res = await fetch('https://data.cityofnewyork.us/resource/h9gi-nx95.json')
  let data = await res.json()
  car_crashes.value = data
}
onMounted(() => getCrashes())
function updateCategory(selectedCategory) {
  category.value = selectedCategory
}
function search() {
  filteredCrashes.value = []
  if (category.value === 'borough') {
    filteredCrashes.value = car_crashes.value.filter(
      (entry) => entry.borough?.toLowerCase() === searching.value.toLowerCase(), //both lower case
    )
  } else if (category.value === 'checkInjury') {
    filteredCrashes.value = car_crashes.value.filter(
      (entry) => entry.number_of_persons_injured.toString() === searching.value,
    )
  } else if (category.value === 'checkKilled') {
    filteredCrashes.value = car_crashes.value.filter(
      (entry) => entry.number_of_persons_killed.toString() === searching.value,
    )
  } else if (category.value === 'vehicle_type_code1') {
    filteredCrashes.value = car_crashes.value.filter(
      (entry) =>
        entry.vehicle_type_code1 &&
        entry.vehicle_type_code1.toLowerCase() === searching.value.toLowerCase(),
    )
  } else {
    alert('Please enter a category before filtering!')
  }
}
</script>
<style scoped></style>
