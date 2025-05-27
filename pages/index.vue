<template>
  <div class="mx-auto max-w-4xl px-4 py-8">
    <h1 class="text-center text-3xl">Bus Telemetry</h1>
    <UTable :data="tableData" v-model:pagination="pagination" class="flex-1">
    </UTable>
    <div> {{  pagination }}</div>
    <UPagination v-model:page="pagination.pageIndex" v-model:pageSize="pagination.pageSize" :total="total"
      class="mt-4"></UPagination>
  </div>
</template>
<script setup lang="ts">
import { UPagination } from '#components'

const pagination = ref({
  pageIndex: 1,
  pageSize: 10,
})
const tableData = computed(() => {
  return data.value.data
})
const total = computed(() => {
  return data.value.total
})
const offset = computed(() => {
  return (pagination.value.pageIndex - 1) * pagination.value.pageSize
})
const limit = computed(() => {
  return pagination.value.pageSize
})
const { data } = await useApi('/api/telemetry', {
  query: {
    limit,
    offset,
  },
})
</script>