<template>
  <router-link
    :to="dataPath"
    class="block bg-white rounded-xl shadow-lg p-6 m-4 transition-transform transform hover:-translate-y-2 hover:shadow-2xl hover:bg-light-gray-bg w-[max]"
  >
    <div class="flex flex-col space-y-4">
      <h1 class="text-xl font-bold text-text-color">Vehicle Type: {{ item.vehicle_type_code1 }}</h1>
      <h2 class="text-sm text-gray-600 font-medium">
        People Injured:
        <span class="text-red-500 font-semibold">{{ item.number_of_persons_injured }}</span>
      </h2>
      <h2 class="text-sm text-gray-600 font-medium">
        People Killed:
        <span class="text-red-500 font-semibold">{{ item.number_of_persons_killed }}</span>
      </h2>
      <h2 class="text-sm text-gray-600 font-medium">
        Borough: <span class="text-blue-500 font-semibold">{{ item.borough }}</span>
      </h2>
      <h2 class="text-sm text-gray-600 font-medium">
        Location: <span class="text-blue-500 font-semibold">{{ item.on_street_name }}</span>
      </h2>
      <h2 class="text-sm text-gray-600 font-medium">
        Time: <span class="text-blue-500 font-semibold">{{ item.crash_time }}</span>
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
