<template>
  <div class="container">
    <Pie v-if="chartData" :data="chartData" />
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
  name: 'ChartComponent',
  components: { Pie },
  setup() {
    //got from chatgpt on how to combine my code files
    const chartData = ref(null)
    const carTypes = ref([])
    const excludedTypes = ref([])
    const carNumbers = ref([])
    const sectorColor = ref([])
    function rngCOLOR() {
      const hexdigits = '0123456789ABCDEF'
      let currentColor = '#'
      for (let i = 0; i < 6; i++) {
        let randomNum = Math.floor(Math.random() * 16)
        currentColor += hexdigits[randomNum]
      }
      return currentColor
    }
    async function getData() {
      try {
        const response = await fetch('https://data.cityofnewyork.us/resource/h9gi-nx95.json')
        const carEntries = await response.json()
        //getting all data stuff
        let otherVehicleNumberCount = 0
        carEntries.forEach((entry) => {
          if (
            !carTypes.value.includes(entry.vehicle_type_code1) &&
            !excludedTypes.value.includes(entry.vehicle_type_code1)
          ) {
            let potentialcategory = entry.vehicle_type_code1
            let newCategoryCount = 0
            carEntries.forEach((object) => {
              if (object.vehicle_type_code1 === potentialcategory) {
                newCategoryCount += 1
              }
            })
            if (newCategoryCount < 14) {
              otherVehicleNumberCount += newCategoryCount
              excludedTypes.value.push(potentialcategory)
            } else {
              carTypes.value.push(potentialcategory)
              carNumbers.value.push(newCategoryCount)
            }
          }
        })
        carTypes.value.push('Other Vehicles')
        carNumbers.value.push(otherVehicleNumberCount)
        for (let i = 0; i < carTypes.value.length; i++) {
          let selectedColor = rngCOLOR()
          sectorColor.value.push(selectedColor)
        }
        //assigning chart data
        chartData.value = {
          labels: carTypes.value,
          datasets: [
            {
              data: carNumbers.value,
              backgroundColor: sectorColor.value,
            },
          ],
        }
      } catch (error) {
        alert('Error fetching data: ' + error)
        chartData.value = { labels: [], datasets: [{ data: [] }] }
      }
    }
    onMounted(() => {
      getData()
    })
    return { chartData }
  },
}
</script>
