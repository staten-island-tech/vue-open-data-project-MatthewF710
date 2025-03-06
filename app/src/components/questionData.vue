<template>
  <router-link :to="dataPath">
    <h1>Filler</h1>
  </router-link>
</template>
<script setup>
import { computed } from 'vue'
const props = defineProps({ item: Object, id: Number })
const dataPath = computed(() => {
  return `data/${props.id}` //fix
})
</script>
