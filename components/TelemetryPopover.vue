<template>
    <UPopover :open="open" @update:open="val => $emit('update:open', val)" :dismissible="true"
        :ui="{ content: 'min-w-[320px] max-w-[90vw] p-4' }">
        <template #anchor>
            <span class="sr-only" aria-hidden="true"></span>
        </template>
        <template #content>
            <div class="relative">
                <UButton icon="i-heroicons-x-mark" size="xs" color="neutral" variant="ghost"
                    class="absolute top-1 right-1 z-10" @click="$emit('close')" aria-label="Close" />
                <div class="space-y-2 text-sm pt-6">
                    <div><b>ID:</b> {{ point.id }}</div>
                    <div><b>Latitude:</b> {{ point.lat.toFixed(6) }}</div>
                    <div><b>Longitude:</b> {{ point.lng.toFixed(6) }}</div>
                    <div><b>Speed (km/h):</b> {{ point.speedKmh?.toFixed(2) ?? 'N/A' }}</div>
                    <div><b>Acc X:</b> {{ point.accX?.toFixed(3) ?? 'N/A' }}</div>
                    <div><b>Acc Y:</b> {{ point.accY?.toFixed(3) ?? 'N/A' }}</div>
                    <div><b>Recorded At:</b> {{ recordedAt }}</div>
                </div>
            </div>
        </template>
    </UPopover>
</template>

<script setup lang="ts">
const props = defineProps({
    point: { type: Object, required: true },
    open: { type: Boolean, required: true }
})
const emit = defineEmits(['update:open', 'open', 'close'])
const recordedAt = computed(() => {
    return new Date(Number(props.point.recordedAt) * 1000).toISOString()
})
</script>
