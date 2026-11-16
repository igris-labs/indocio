<script setup lang="ts">
import { computed } from 'vue'

import { themePalettes } from '../../utils/customizer'
import type { ThemeMode } from '../../utils/customizer'

const props = defineProps<{
  label: string
  mode: ThemeMode
  modelValue?: string
  foreground?: boolean
  allowPrimary?: boolean
}>()
const emit = defineEmits<{ 'update:modelValue': [value: string] }>()
const options = computed(() => [
  {
    value: 'site',
    label: props.foreground ? 'Automatic' : 'Site default',
    color: undefined,
  },
  ...(props.allowPrimary ? [{ value: 'primary', label: 'Use primary', color: undefined }] : []),
  ...themePalettes.map((palette) => ({
    value: palette.id,
    label: palette.label,
    color: palette[props.mode],
  })),
])
</script>
<template>
  <UiSelect
    :model-value="modelValue ?? 'site'"
    :options="options"
    :aria-label="label"
    class="w-full"
    @update:model-value="emit('update:modelValue', String($event))"
  >
    <template #value="{ option, label: selectedLabel }"
      ><span class="flex min-w-0 items-center gap-3"
        ><span
          v-if="option?.color"
          class="size-3 shrink-0 rounded-sm border border-foreground/15"
          :style="{ backgroundColor: String(option.color) }"
          aria-hidden="true"
        /><span class="truncate">{{ selectedLabel }}</span></span
      ></template
    >
    <template #option="{ option, label: optionLabel }"
      ><span class="flex min-w-0 items-center gap-3"
        ><span
          v-if="option.color"
          class="size-3 shrink-0 rounded-sm border border-foreground/15"
          :style="{ backgroundColor: String(option.color) }"
          aria-hidden="true"
        /><span>{{ optionLabel }}</span></span
      ></template
    >
  </UiSelect>
</template>
