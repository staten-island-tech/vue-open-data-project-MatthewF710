<template>
  <router-link
    :to="dataPath"
    class="block bg-white rounded-xl shadow-md p-4 m-3 transition-transform hover:-translate-y-1 w-[30%]"
  >
    <div class="flex flex-col space-y-2">
      <h1 class="text-lg font-bold text-gray-800">Vehicle Type: {{ item.vehicle_type_code1 }}</h1>
      <h2 class="text-sm text-gray-600 font-semibold">
        People Injured: <span class="text-red-500">{{ item.number_of_persons_injured }}</span>
      </h2>
      <h2 class="text-sm text-gray-600 font-semibold">
        People Killed: <span class="text-red-500">{{ item.number_of_persons_killed }}</span>
      </h2>
      <h2 class="text-sm text-gray-600 font-semibold">
        Location: <span class="text-red-500">{{ item.on_street_name }}</span>
      </h2>
      <h2 class="text-sm text-gray-600 font-semibold">
        Time: <span class="text-red-500">{{ item.crash_time }}</span>
      </h2>
    </div>
  </router-link>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({ item: Object, id: Number })

const dataPath = computed(() => {
  return `graph/${props.id}`
})
</script>
