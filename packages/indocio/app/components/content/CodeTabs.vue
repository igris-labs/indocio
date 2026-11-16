<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

import { codeBlocks } from '../../utils/code-blocks'
import { Tabs } from '../ui/tabs'
import CodeFileIcon from './CodeFileIcon.vue'
import DocsCode from './DocsCode.vue'

withDefaults(defineProps<{ label?: string }>(), { label: 'Code examples' })
const slots = useSlots()
const active = ref('code-0')
const blocks = computed(() => codeBlocks(slots.default?.() ?? []))
const items = computed(() => blocks.value.map(({ value, label }) => ({ value, label })))
</script>

<template>
  <Tabs
    v-if="blocks.length"
    v-model="active"
    :items="items"
    :aria-label="label"
    :unmount-on-hide="false"
    class="my-6 overflow-hidden rounded-lg border border-border/60 bg-(--syntax-background)"
    :ui="{
      root: 'gap-0',
      list: 'w-full rounded-none border-b border-border/50 bg-(--syntax-header) p-2',
      indicator: 'bg-accent/6',
      tab: 'gap-2 data-[akaza-state=active]:text-foreground',
    }"
  >
    <template #tab="{ item }">
      <CodeFileIcon
        v-if="blocks.find((block) => block.value === item.value)?.filename"
        :filename="item.label ?? ''"
      />
      {{ item.label }}
    </template>
    <template v-for="block in blocks" :key="block.value" #[`panel-${block.value}`]>
      <DocsCode
        :code="block.code"
        :language="block.language"
        :header="false"
        class="my-0! rounded-none border-0"
      />
    </template>
  </Tabs>
  <slot v-else />
</template>
