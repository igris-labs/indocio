<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

import { codeBlocks } from '../../utils/code-blocks'
import { Tabs as UiTabs } from '../ui/tabs'
import DocsCode from './DocsCode.vue'
const slots = useSlots()
const blocks = computed(() => codeBlocks(slots.default?.() ?? []))
const items = computed(() =>
  blocks.value.map((block) => ({ value: block.value, label: block.filename ?? block.label })),
)
const active = ref('code-0')
</script>
<template>
  <UiTabs
    v-if="items.length"
    v-model="active"
    :items="items"
    orientation="vertical"
    aria-label="Source files"
    :unmount-on-hide="false"
    class="my-6 min-w-0 overflow-hidden rounded-lg border border-border max-sm:flex-col"
    :ui="{
      list: 'w-44 shrink-0 flex-col items-stretch overflow-auto rounded-none bg-muted/30 max-sm:w-full max-sm:flex-row',
      indicator: 'bg-accent/6',
      tab: 'justify-start truncate',
      panels: 'min-w-0 flex-1',
    }"
    ><template v-for="block in blocks" :key="block.value" #[`panel-${block.value}`]
      ><DocsCode
        :code="block.code"
        :filename="block.filename"
        :language="block.language"
        class="my-0! rounded-none border-0" /></template></UiTabs
  ><slot v-else />
</template>
