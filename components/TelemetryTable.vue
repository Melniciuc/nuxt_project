<template>
  <div class="w-full mt-4 mb-4">
    <div class="overflow-x-auto">
      <table v-if="paginatedData.length > 0" class="w-full text-sm border-collapse shadow-md rounded-md overflow-hidden">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="header in tableHeaders"
              :key="header.key"
              class="py-3 px-2 border border-gray-300 text-left font-semibold text-gray-700 align-middle"
            >
              {{ header.label }}
            </th>
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <tr v-for="(item, index) in paginatedData" :key="item.id || index" class="hover:bg-gray-100">
            <td
              v-for="header in tableHeaders"
              :key="header.key"
              class="py-3 px-2 border border-gray-300 align-middle"
            >
              {{ formatCellContent(item, header.key) }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <p v-if="props.modelValue && props.modelValue.length > 0 && paginatedData.length === 0" class="text-center mt-6 text-gray-600 italic">
      No data for the current page.
    </p>
    <p v-if="!props.modelValue || props.modelValue.length === 0" class="text-center mt-6 text-gray-600 italic">
      No telemetry data to display.
    </p>
    <div v-if="props.modelValue && props.modelValue.length > 0" class="flex items-center justify-between mt-4 text-sm">
      <div class="flex items-center space-x-2">
        <button
          @click="prevPage"
          :disabled="currentPage === 1"
          class="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <span class="text-gray-700">
          Page {{ currentPage }} of {{ totalPages }}
        </span>
        <button
          @click="nextPage"
          :disabled="currentPage === totalPages || totalPages === 0"
          class="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
      <div class="flex items-center space-x-2">
        <span class="text-gray-700">Items per page:</span>
        <select
          v-model.number="itemsPerPage"
          class="border border-gray-300 rounded-md px-2 py-1 focus:ring-indigo-500 focus:border-indigo-500"
        >
          <option v-for="option in itemsPerPageOptions" :key="option" :value="option">
            {{ option }}
          </option>
        </select>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue';

interface TelemetryItem {
  id: number;
  lat: number;
  lng: number;
  speedKmh: number;
  accX: number;
  accY: number;
  accZ: number;
  recordedAt: number;
  createdAt: Date | string | number;
  [key: string]: any;
}

interface Props {
  modelValue: TelemetryItem[];
}

const props = defineProps<Props>();

const currentPage = ref(1);
const itemsPerPageOptions = [1, 10, 50, 100, 1000];
const itemsPerPage = ref(itemsPerPageOptions[1]);

watch(() => props.modelValue, () => {
  currentPage.value = 1;
});

watch(itemsPerPage, () => {
  currentPage.value = 1;
});


const totalItems = computed(() => props.modelValue?.length || 0);

const totalPages = computed(() => {
  if (totalItems.value === 0 || itemsPerPage.value === 0) return 0;
  return Math.ceil(totalItems.value / itemsPerPage.value);
});

const paginatedData = computed(() => {
  if (!props.modelValue || props.modelValue.length === 0) {
    return [];
  }
  const start = (currentPage.value - 1) * itemsPerPage.value;
  const end = start + itemsPerPage.value;
  return props.modelValue.slice(start, end);
});

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const tableHeaders = computed(() => [
  { key: 'id', label: 'ID' },
  { key: 'lat', label: 'Latitude' },
  { key: 'lng', label: 'Longitude' },
  { key: 'speedKmh', label: 'Speed (km/h)' },
  { key: 'accX', label: 'Acc X' },
  { key: 'accY', label: 'Acc Y' },
  { key: 'recordedAt', label: 'Recorded At' },
]);

const formatCellContent = (item: TelemetryItem, key: string): string => {
  const value = item[key];

  if (value === null || value === undefined) {
    return 'N/A';
  }

  switch (key) {
    case 'createdAt':
      if (value instanceof Date) {
        return value.toISOString();
      }
      return new Date(value).toISOString();
    case 'recordedAt':
      return new Date(Number(value) * 1000).toISOString();
    case 'lat':
    case 'lng':
      return Number(value).toFixed(6);
    case 'speedKmh':
    case 'accX':
    case 'accY':
    case 'accZ':
      return Number(value).toFixed(3);
    default:
      return String(value);
  }
};
</script>