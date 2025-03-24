<template>
  <div
    class="min-h-screen flex flex-col justify-center items-center bg-light-gray-bg text-text-color"
  >
    <div class="text-center animate-fade-up">
      <h1 class="text-4xl font-bold mb-6 text-blue-bg animate-slide-up">
        Welcome To My Accident Website!
      </h1>
      <h2 class="text-2xl mb-6 text-button-color animate-slide-up animation-delay-200">
        Click below to explore more...
      </h2>
      <div class="space-y-4">
        <router-link
          to="/search"
          class="btn bg-button-color text-white hover:bg-indigo-blue-dark px-6 py-3 rounded-md shadow-md transition-all transform hover:scale-110 hover:rotate-3 hover:text-gray-100 hover:shadow-xl hover:shadow-indigo-500/50 ease-in-out duration-400 w-full max-w-xs mx-auto animate-slide-up animation-delay-200"
        >
          Filter to Find a Specific Accident
        </router-link>
        <router-link
          :to="link"
          class="btn bg-button-color text-white hover:bg-indigo-blue-dark px-6 py-3 rounded-md shadow-md transition-all transform hover:scale-110 hover:rotate-3 hover:text-gray-100 hover:shadow-xl hover:shadow-indigo-500/50 ease-in-out duration-400 w-full max-w-xs mx-auto animate-slide-up animation-delay-200"
        >
          One Random Crash Data
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
const random_crash = ref([])
let link = ref('')

async function getCrashes() {
  let res = await fetch('https://data.cityofnewyork.us/resource/h9gi-nx95.json')
  let data = await res.json()
  const randomIndex = Math.floor(Math.random() * data.length)
  random_crash.value = data[randomIndex]
  link.value = `/graph/${random_crash.value.collision_id}`
}

onMounted(() => getCrashes())
</script>
