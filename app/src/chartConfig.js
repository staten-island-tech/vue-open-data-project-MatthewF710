import { ref } from 'vue'
const carTypes = ref([])
const carNumbers = ref([])
async function getData() {
  try {
    const { cardata } = await fetch('https://data.cityofnewyork.us/resource/h9gi-nx95.json')
    const carEntries = await cardata.json()
    carEntries.forEach((entry) => {
      if (carTypes.contains(entry.vehicle_type_code1) == true) {
        carTypes.push(entry.vehicle_type_code1)
      }
    })
    carTypes.forEach((Car) => {
      let numberCount = 0
      carEntries.forEach((object) => {
        if (object.entry.vehicle_type_code1 == Car) {
          numberCount += 1
        }
      })
      carNumbers.push({ numberCount })
    })
  } catch (error) {
    alert('error')
  }
}
getData()
export const data = {
  labels: carTypes,
  datasets: [
    {
      data: carNumbers,
    },
  ],
}
export const options = {
  responsive: true,
  maintainAspectRatio: false,
}
