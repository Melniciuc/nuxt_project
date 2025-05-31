<template>
  <div class="inline-flex items-center">
    <div class="flex flex-col items-center">
      <UButton
        icon="i-lucide-chevron-up"
        size="2xs"
        variant="ghost"
        class="px-1 h-3 w-5"
        @click="adjustTime(3600)"
        aria-label="Increase hour"
      />
      <UButton
        icon="i-lucide-chevron-down"
        size="2xs"
        variant="ghost"
        class="px-1 h-3 w-5"
        @click="adjustTime(-3600)"
        aria-label="Decrease hour"
      />
    </div>

    <div class="relative mx-1">
      <UInput
        :id="inputId"
        type="time"
        v-model="modelValueProxy"
        size="md"
        class="w-28 text-center"
        :step="60"
      >
        <label class="pointer-events-none absolute left-0 -top-2.5 text-xs px-1.5 text-gray-400">
            <span class="inline-flex bg-default px-1">{{ label }}</span>
        </label>
    </UInput>
    </div>

    <div class="flex flex-col items-center">
      <UButton
        icon="i-lucide-chevron-up"
        size="2xs"
        variant="ghost"
        class="px-1 h-3 w-5"
        @click="adjustTime(60)"
        aria-label="Increase minute"
      />
      <UButton
        icon="i-lucide-chevron-down"
        size="2xs"
        variant="ghost"
        class="px-1 h-3 w-5"
        @click="adjustTime(-60)"
        aria-label="Decrease minute"
      />
    </div>
  </div>
</template>

<script setup>
import { computed, useId } from 'vue'

const props = defineProps({
  modelValue: {
    type: String,
    required: true
  },
  label: {
    type: String,
    default: ''
  }
})
const emit = defineEmits(['update:modelValue'])

const inputId = useId()

const modelValueProxy = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
})

function adjustTime(delta) {
  const [hours, minutes] = props.modelValue.split(':').map(Number)
  const totalSeconds = hours * 3600 + minutes * 60 + delta

  const clampedSeconds = Math.max(0, Math.min(86340, totalSeconds)) // 86340 seconds = 23:59
  const newHours = Math.floor(clampedSeconds / 3600)
  const newMinutes = Math.floor((clampedSeconds % 3600) / 60)

  emit('update:modelValue', `${String(newHours).padStart(2, '0')}:${String(newMinutes).padStart(2, '0')}`)
}
</script>