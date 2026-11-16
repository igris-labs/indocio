<script setup lang="ts">
import { Collapsible as UiCollapsible } from '../ui/collapsible'
withDefaults(defineProps<{ title?: string }>(), { title: 'More details' })
</script>
<template>
  <UiCollapsible class="my-6"
    ><template #trigger>{{ title }}</template><template #content><slot /></template
  ></UiCollapsible>
</template>
