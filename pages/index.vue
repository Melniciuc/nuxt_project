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
            <TimePicker v-model="fromTime" label="From" />
            <TimePicker v-model="toTime" label="To" />
          </div>
          <div class="flex flex-col gap-4">
            <UCheckboxGroup v-model="selectedFilters" :items="filters" />
          </div>
          <UModal v-model="isSettingsModalOpen" title="Config" :close="{
            color: 'primary',
            variant: 'outline',
            class: 'rounded-full'
          }">
            <UButton icon="i-heroicons-cog-6-tooth" variant="ghost" @click="isSettingsModalOpen = true" />
            <template #body>
              <ConfigurationForm v-model:calibrationX="calibrationX" v-model:calibrationY="calibrationY"
                v-model:colorRules="colorRules" />
            </template>
          </UModal>
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
import type { CheckboxGroupItem, CheckboxGroupValue } from '@nuxt/ui'

const isSettingsModalOpen = ref(false);

const calibrationX = ref(0.13)
const calibrationY = ref(-0.025)

const colorRules = ref({
  accYplus: {
    'green': 0.125,
    'yellow': 0.250,
  },
  accYminus: {
    'green': -0.125,
    'yellow': -0.250,
  },
  accX: {
    'green': 0.125,
    'yellow': 0.250,
  },
  speed: {
    'green': 50,
    'yellow': 60,
  }
})

const filters = ref<CheckboxGroupItem[]>([
  { label: 'Acceleration', value: 'accYplus' },
  { label: 'Deceleration', value: 'accYminus' },
  { label: 'Lateral', value: 'accX' },
  { label: 'Speed', value: 'speed' }
])
const selectedFilters = ref<CheckboxGroupValue[]>(['accYplus', 'accYminus', 'accX', 'speed'])
const selectedDate = ref(today(getLocalTimeZone()))
const fromTime = ref("01:00")
const toTime = ref("23:00")
const zoom = ref(13)
const map = ref(null) as any;

const tableData = computed(() => {
  const dataFromApi = telemetryResponse.value?.data
  const dataArray = Array.isArray(dataFromApi) ? dataFromApi : [];
  return dataArray.map((item: any) => convertTelemetryDataPoint(item));
})

const convertTelemetryDataPoint = (item: any) => {
  const calibratedItem = {
    ...item,
    accX: item.accX + calibrationX.value,
    accY: item.accY + calibrationY.value,
  }
  return {
    ...calibratedItem,
    color: calculateColor(calibratedItem),
  }
}

const calculateColor = (item: any) => {
  const colorIndexX = selectedFilters.value.includes('accX') ? calculateAccelerationIndexX(item.accX) : -1
  const colorIndexYplus = selectedFilters.value.includes('accYplus') ? calculateAccelerationIndexYplus(item.accY) : -1
  const colorIndexYminus = selectedFilters.value.includes('accYminus') ? calculateAccelerationIndexYminus(item.accY) : -1
  const colorIndexSpeed = selectedFilters.value.includes('speed') ? calculateSpeedIndex(item.speedKmh) : -1
  const colorIndex = Math.max(colorIndexX, colorIndexYplus, colorIndexYminus, colorIndexSpeed)
  switch (colorIndex) {
    case -1:
      return 'gray'
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

const calculateAccelerationIndexYplus = (accY: number) => {
  if (accY === undefined || accY === null) return -1
  if (accY < colorRules.value.accYplus.green) return 0
  else if (accY < colorRules.value.accYplus.yellow) return 1
  else return 2
}
const calculateAccelerationIndexYminus = (accY: number) => {
  if (accY === undefined || accY === null) return -1
  if (accY > colorRules.value.accYminus.green) return 0
  else if (accY > colorRules.value.accYminus.yellow) return 1
  else return 2
}
const calculateAccelerationIndexX = (accX: number) => {
  if (accX === undefined || accX === null) return -1
  const absAccX = Math.abs(accX);
  if (absAccX < colorRules.value.accX.green) return 0
  else if (absAccX < colorRules.value.accX.yellow) return 1
  else return 2
}
const calculateSpeedIndex = (speed: number) => {
  if (speed === undefined || speed === null) return -1
  if (speed < colorRules.value.speed.green) return 0
  else if (speed < colorRules.value.speed.yellow) return 1
  else return 2
}

const fromParam = computed(() => {
  return `${selectedDate.value.toString()}T${fromTime.value}:00Z`
})
const toParam = computed(() => {
  return `${selectedDate.value.toString()}T${toTime.value}:00Z`
})
const { data: telemetryResponse } = await useApi('/api/telemetry', {
  query: {
    from: fromParam,
    to: toParam,
  },
})
</script>