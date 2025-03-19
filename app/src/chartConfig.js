const { cardata } = await fetch('https://data.cityofnewyork.us/resource/h9gi-nx95.json')
let carTypes = []
cardata.forEach((entry) => {
  if (carTypes.contains(entry.vehicle_type_code1) == true) {
    carTypes.push(entry.vehicle_type_code1)
  }
})
export const data = {
  labels: carTypes,
  datasets: [
    {
      backgroundColor: ['#41B883', '#E46651', '#00D8FF', '#DD1B16'],
      data: [40, 20, 80, 10],
    },
  ],
}

export const options = {
  responsive: true,
  maintainAspectRatio: false,
}
