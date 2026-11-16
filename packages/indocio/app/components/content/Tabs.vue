<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'

import { markdownItems } from '../../utils/markdown-items'
import MarkdownPanel from '../../utils/markdown-panel'
import { Tabs as UiTabs } from '../ui/tabs'
const props = withDefaults(
  defineProps<{ label?: string; sync?: string; defaultValue?: string }>(),
  { label: 'Examples' },
)
const slots = useSlots()
const panels = computed(() => markdownItems(slots.default?.() ?? [], 'Tabs'))
const items = computed(() => panels.value.map(({ value, title }) => ({ value, label: title })))
const local = ref(props.defaultValue)
const shared = useState<Record<string, string>>('indocio-markdown-tabs', () => ({}))
const active = computed({
  get: () => {
    const value = (props.sync ? shared.value[props.sync] : local.value) ?? props.defaultValue
    return panels.value.some((item) => item.value === value) ? value : panels.value[0]?.value
  },
  set: (value) => {
    if (value) {
      if (props.sync) shared.value[props.sync] = value
      else local.value = value
    }
  },
})
</script>
<template>
  <UiTabs
    v-if="items.length"
    v-model="active"
    :items="items"
    :aria-label="label"
    :unmount-on-hide="false"
    class="my-6"
    :ui="{ list: 'max-w-full overflow-x-auto', indicator: 'bg-accent/6' }"
  >
    <template v-for="panel in panels" :key="panel.value" #[`panel-${panel.value}`]
      ><MarkdownPanel :node="panel.node"
    /></template>
  </UiTabs>
  <slot v-else />
</template>
