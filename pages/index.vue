<template>
  <div class="mx-auto px-8 py-8">
    <h1 class="text-center text-3xl">Bus Telemetry</h1>
    <div class="flex gap-4">
      <div class="w-1/2">
        <LMap ref="map" :zoom="zoom" :center="[47.02, 28.84]" :use-global-leaflet="false">
          <LTileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base" name="OpenStreetMap" />
          <LCircle v-for="point in tableData" :key="point.id" :lat-lng="[point.lat, point.lng]" :radius="5"
            :color="point.color" :fill-color="point.color" :fill-opacity="0.2"/>
        </LMap>
      </div>
      <div class="w-1/2">
        <UTable :data="tableData" v-model:pagination="pagination" class="flex-1">
        </UTable>
        <UPagination v-model:page="pagination.pageIndex" v-model:pageSize="pagination.pageSize" :total="total"
          class="mt-4" :show-edges="true">
        </UPagination>
        <!-- <UInput v-model="pagination.pageIndex" type="number" /> -->
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { UPagination } from '#components'

const zoom = ref(12)

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

const total = computed(() => {
  return telemetryResponse.value?.total || 0
})
const offset = computed(() => {
  return (pagination.value.pageIndex - 1) * pagination.value.pageSize
})
const limit = computed(() => {
  return pagination.value.pageSize
})
const { data: telemetryResponse } = await useApi('/api/telemetry', {
  query: {
    limit,
    offset,
  },
})
</script>