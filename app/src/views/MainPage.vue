<template>
  <div>
    <PokemonCard v-for="(item, index) in pokemon" :key="item.name" :id="index + 1" :item="item">
    </PokemonCard>
  </div>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import Graph from '@/components/questionData.vue'
const pokemon = ref([])
async function getPokemon() {
  let res = await fetch('https://pokeapi.co/api/v2/pokemon?limit-151')
  let data = await res.json()
  pokemon.value = data.results
}
onMounted(() => getPokemon())
</script>
<style scoped></style>
