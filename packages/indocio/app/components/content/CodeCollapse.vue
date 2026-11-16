<script setup lang="ts">
import { Collapsible as UiCollapsible } from '../ui/collapsible'
withDefaults(defineProps<{ title?: string }>(), { title: 'Show code' })
</script>
<template>
  <UiCollapsible
    class="my-6"
    :ui="{ content: 'p-0 [&>div]:my-0 [&>div]:rounded-none [&>div]:border-0' }"
    ><template #trigger>{{ title }}</template><template #content><slot /></template
  ></UiCollapsible>
</template>
