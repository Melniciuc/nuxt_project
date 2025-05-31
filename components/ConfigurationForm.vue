<template>
    <div class="space-y-6">
        <div>
            <h4 class="text-md font-medium mb-3">Calibration</h4>
            <div class="grid grid-cols-2 gap-4">
                <UFormGroup>
                    <UInput v-model="calibrationX" type="number" step="0.001">
                        <label class="pointer-events-none absolute left-0 -top-2.5 text-xs px-1.5 text-gray-400">
                            <span class="inline-flex bg-default px-1">X calibration</span>
                        </label>
                    </UInput>
                </UFormGroup>
                <UFormGroup label="Calibration Y">
                    <UInput v-model="calibrationY" type="number" step="0.001">
                        <label class="pointer-events-none absolute left-0 -top-2.5 text-xs px-1.5 text-gray-400">
                            <span class="inline-flex bg-default px-1">Y calibration</span>
                        </label>
                    </UInput>
                </UFormGroup>
            </div>
        </div>

        <div>
            <h4 class="text-md font-medium mb-3">Color Rules</h4>

            <div class="space-y-4">
                <div>
                    <div class="grid grid-cols-2 gap-2">
                        <UFormGroup label="Green Threshold">
                            <UInput v-model="colorRules.accYplus.green" type="number" step="0.001">
                                <label class="pointer-events-none absolute left-0 -top-2.5 text-xs px-1.5 text-gray-400">
                                    <span class="inline-flex bg-default px-1">accY+ green</span>
                                </label>
                            </UInput>
                        </UFormGroup>
                        <UFormGroup label="Yellow Threshold">
                            <UInput v-model="colorRules.accYplus.yellow" type="number" step="0.001">
                                <label class="pointer-events-none absolute left-0 -top-2.5 text-xs px-1.5 text-gray-400">
                                    <span class="inline-flex bg-default px-1">accY+ yellow</span>
                                </label>
                            </UInput>
                        </UFormGroup>
                    </div>
                </div>

                <div>
                    <div class="grid grid-cols-2 gap-2">
                        <UFormGroup label="Green Threshold">
                            <UInput v-model="colorRules.accYminus.green" type="number" step="0.001">
                                <label class="pointer-events-none absolute left-0 -top-2.5 text-xs px-1.5 text-gray-400">
                                    <span class="inline-flex bg-default px-1">accY- green</span>
                                </label>
                            </UInput>
                        </UFormGroup>
                        <UFormGroup label="Yellow Threshold">
                            <UInput v-model="colorRules.accYminus.yellow" type="number" step="0.001">
                                <label class="pointer-events-none absolute left-0 -top-2.5 text-xs px-1.5 text-gray-400">
                                    <span class="inline-flex bg-default px-1">accY- yellow</span>
                                </label>
                            </UInput>
                        </UFormGroup>
                    </div>
                </div>

                <div>
                    <div class="grid grid-cols-2 gap-2">
                        <UFormGroup label="Green Threshold">
                            <UInput v-model="colorRules.accX.green" type="number" step="0.001">
                                <label class="pointer-events-none absolute left-0 -top-2.5 text-xs px-1.5 text-gray-400">
                                    <span class="inline-flex bg-default px-1">accX green</span>
                                </label>
                            </UInput>
                        </UFormGroup>
                        <UFormGroup label="Yellow Threshold">
                            <UInput v-model="colorRules.accX.yellow" type="number" step="0.001">
                                <label class="pointer-events-none absolute left-0 -top-2.5 text-xs px-1.5 text-gray-400">
                                    <span class="inline-flex bg-default px-1">accX yellow</span>
                                </label>
                            </UInput>
                        </UFormGroup>
                    </div>
                </div>

                <div>
                    <div class="grid grid-cols-2 gap-2">
                        <UFormGroup label="Green Threshold">
                            <UInput v-model="colorRules.speed.green" type="number" step="1">
                                <label class="pointer-events-none absolute left-0 -top-2.5 text-xs px-1.5 text-gray-400">
                                    <span class="inline-flex bg-default px-1">speed green</span>
                                </label>
                            </UInput>
                        </UFormGroup>
                        <UFormGroup label="Yellow Threshold">
                            <UInput v-model="colorRules.speed.yellow" type="number" step="1">
                                <label class="pointer-events-none absolute left-0 -top-2.5 text-xs px-1.5 text-gray-400">
                                    <span class="inline-flex bg-default px-1">speed yellow</span>
                                </label>
                            </UInput>
                        </UFormGroup>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script setup lang="ts">
const calibrationX = defineModel<number>('calibrationX')
const calibrationY = defineModel<number>('calibrationY')
const colorRules = defineModel<{
    accYplus: { green: number; yellow: number }
    accYminus: { green: number; yellow: number }
    accX: { green: number; yellow: number }
    speed: { green: number; yellow: number }
}>('colorRules')
</script>
