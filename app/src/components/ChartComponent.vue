<template>
  <div class="min-h-screen bg-light-gray-bg text-text-color flex flex-col items-center py-12">
    <button
      @click="toggleGraph"
      class="btn bg-blue-bg text-white hover:bg-indigo-blue-dark px-6 py-3 rounded-md shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105 hover:shadow-xl hover:rotate-3 hover:translate-x-2 mb-8"
    >
      Switch Graph
    </button>
    <div v-if="chartData" class="w-full max-w-3xl p-6">
      <Pie :data="chartData" class="shadow-xl border border-light-gray-border rounded-lg" />
    </div>
    <div v-else class="text-center mt-6">
      <p class="text-lg text-indigo-blue-dark">Loading chart data...</p>
    </div>
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
    const chartData = ref(null)
    const selectedChart = ref('vehicleTypes')
    const hours = [
      { hour: 0, counted: 0 },
      { hour: 1, counted: 0 },
      { hour: 2, counted: 0 },
      { hour: 3, counted: 0 },
      { hour: 4, counted: 0 },
      { hour: 5, counted: 0 },
      { hour: 6, counted: 0 },
      { hour: 7, counted: 0 },
      { hour: 8, counted: 0 },
      { hour: 9, counted: 0 },
      { hour: 10, counted: 0 },
      { hour: 11, counted: 0 },
      { hour: 12, counted: 0 },
      { hour: 13, counted: 0 },
      { hour: 14, counted: 0 },
      { hour: 15, counted: 0 },
      { hour: 16, counted: 0 },
      { hour: 17, counted: 0 },
      { hour: 18, counted: 0 },
      { hour: 19, counted: 0 },
      { hour: 20, counted: 0 },
      { hour: 21, counted: 0 },
      { hour: 22, counted: 0 },
      { hour: 23, counted: 0 },
    ]
    const carTypes = []
    const excludedTypes = []
    const carNumbers = []
    const sectorColor = []

    function rngCOLOR() {
      const hexdigits = '0123456789ABCDEF'
      let currentColor = '#'
      for (let i = 0; i < 6; i++) {
        const randomNum = Math.floor(Math.random() * 16)
        currentColor += hexdigits[randomNum]
      }
      return currentColor
    }

    async function getData() {
      try {
        const response = await fetch('https://data.cityofnewyork.us/resource/h9gi-nx95.json')
        const carEntries = await response.json()
        const tempCarTypes = []
        const tempCarNumbers = []
        const tempExcludedTypes = []
        let tempOtherVehicleNumberCount = 0

        carEntries.forEach((entry) => {
          if (
            !tempCarTypes.includes(entry.vehicle_type_code1) &&
            !tempExcludedTypes.includes(entry.vehicle_type_code1)
          ) {
            const potentialCategory = entry.vehicle_type_code1
            let newCategoryCount = 0
            carEntries.forEach((object) => {
              if (object.vehicle_type_code1 === potentialCategory) {
                newCategoryCount += 1
              }
            })
            if (newCategoryCount < 14) {
              tempOtherVehicleNumberCount += newCategoryCount
              tempExcludedTypes.push(potentialCategory)
            } else {
              tempCarTypes.push(potentialCategory)
              tempCarNumbers.push(newCategoryCount)
            }
          }
        })
        tempCarTypes.push('Other Vehicles')
        tempCarNumbers.push(tempOtherVehicleNumberCount)
        carEntries.forEach((entry) => {
          const crashTime = entry.crash_time.split(':')
          let crashHour = parseInt(crashTime[0])
          if (crashHour === 24) {
            crashHour = 0
          }
          if (crashHour >= 0 && crashHour < 24) {
            hours[crashHour].counted += 1
          }
        })
        const tempSectorColor = []
        const labels = []
        const data = []

        if (selectedChart.value === 'vehicleTypes') {
          tempCarTypes.forEach((type) => {
            labels.push(type)
          })
          tempCarNumbers.forEach((count) => {
            data.push(count)
          })
        } else if (selectedChart.value === 'crashHours') {
          hours.forEach((timeframe) => {
            labels.push(`${timeframe.hour}:00-${timeframe.hour + 1}:00`)
            data.push(timeframe.counted)
          })
        }
        for (let i = 0; i < labels.length; i++) {
          tempSectorColor.push(rngCOLOR())
        }

        chartData.value = {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: tempSectorColor,
            },
          ],
        }
      } catch (error) {
        console.error('Error fetching data:', error)
        alert('Error fetching data')
        chartData.value = { labels: [], datasets: [{ data: [] }] }
      }
    }

    function toggleGraph() {
      selectedChart.value = selectedChart.value === 'vehicleTypes' ? 'crashHours' : 'vehicleTypes'
      getData()
    }

    onMounted(() => {
      getData()
    })

    return { chartData, selectedChart, toggleGraph }
  },
}
</script>
