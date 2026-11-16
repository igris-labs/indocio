<script setup lang="ts">
import { computed, useSlots } from 'vue'

import { markdownItems } from '../../utils/markdown-items'
import MarkdownPanel from '../../utils/markdown-panel'
import { Accordion as UiAccordion } from '../ui/accordion'
withDefaults(defineProps<{ type?: 'single' | 'multiple' }>(), { type: 'single' })
const slots = useSlots()
const panels = computed(() => markdownItems(slots.default?.() ?? [], 'Accordion'))
const items = computed(() =>
  panels.value.map(({ title, value }) => ({ label: title, value, slot: `item-${value}` })),
)
</script>
<template>
  <UiAccordion :items="items" :type="type" class="my-6"
    ><template v-for="panel in panels" :key="panel.value" #[`item-${panel.value}`]
      ><MarkdownPanel :node="panel.node" /></template
  ></UiAccordion>
</template>
