<template>
  <div class="w-full mx-auto px-2 py-8 flex flex-col min-h-screen">
    <h1 class="text-center text-3xl mb-4">Bus Telemetry</h1>
    <div class="grid grid-cols-2 gap-4 flex-1">
      <div class="m-5 flex flex-col">
        <LMap ref="map" :zoom="zoom" :center="[47.02, 28.84]" :use-global-leaflet="false"
          class="flex-1 rounded-lg shadow-md">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />
          <LCircle v-for="point in tableData" :key="point.id" :lat-lng="[point.lat, point.lng]" :radius="5"
            :color="point.color" :fill-color="point.color" :fill-opacity="0.2" />
        </LMap>
      </div>
      <div class="flex flex-col">
        <div class="flex gap-4 w-auto m-10 mb-4 items-center">
          <UCalendar v-model="selectedDate" size="xs" />
          <div class="flex flex-col gap-4">
            <TimePicker v-model="fromTime" label="From"/>
            <TimePicker v-model="toTime" label="To"/>
          </div>
        </div>
        <div class="m-6 mt-0 flex-1 overflow-y-scroll">
          <TelemetryTable v-model="tableData" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { getLocalTimeZone, today } from '@internationalized/date';

const selectedDate = ref(today(getLocalTimeZone()))
const fromTime = ref("01:00")
const toTime = ref("23:00")
const zoom = ref(13)
const map = ref(null) as any;

const pagination = ref({
  pageIndex: 1,
  pageSize: 10,
})
const tableData = computed(() => {
  const data = telemetryResponse.value?.data || []
  return data.map((item: any) => ({
    ...item,
    color: calculateColor(item),
  }))
})

const calculateColor = (item: any) => {
  const colorIndexX = calculateAccelerationIndexX(item.accX)
  const colorIndexY = calculateAccelerationIndexY(item.accY)
  if (colorIndexX === undefined || colorIndexY === undefined) return 'gray'
  const colorIndex = Math.max(colorIndexX, colorIndexY)
  switch (colorIndex) {
    case 0:
      return 'green'
    case 1:
      return 'yellow'
    case 2:
      return 'red'
    default:
      return 'gray'
  }
}
const calculateAccelerationIndexX = (accX: number) => {
  if (accX === undefined || accX === null) return undefined
  const abs = Math.abs(accX)
  if (abs < 0.125) return 0
  else if (abs < 0.250) return 1
  else return 2
}
const calculateAccelerationIndexY = (accY: number) => {
  if (accY === undefined || accY === null) return undefined
  const abs = Math.abs(accY)
  if (abs < 0.125) return 0
  else if (abs < 0.250) return 1
  else return 2
}
const offset = computed(() => {
  return (pagination.value.pageIndex - 1) * pagination.value.pageSize
})
const limit = computed(() => {
  return pagination.value.pageSize
})
const fromParam = computed(() => {
  return `${selectedDate.value.toString()}T${fromTime.value}:00Z`
})
const toParam = computed(() => {
  return `${selectedDate.value.toString()}T${toTime.value}:00Z`
})
const { data: telemetryResponse } = await useApi('/api/telemetry', {
  query: {
    limit,
    offset,
    from: fromParam,
    to: toParam,
  },
})
</script>