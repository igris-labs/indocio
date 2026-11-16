<script setup lang="ts">
import { NuxtLink } from '#components'
defineProps<{ title: string; description?: string; icon?: string; to?: string }>()
const { localPath } = useIndocio()
</script>
<template>
  <component
    :is="to ? NuxtLink : 'div'"
    :to="to ? localPath(to) : undefined"
    class="my-4 block min-w-0 rounded-lg border border-border p-5 no-underline transition-colors hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-ring motion-reduce:transition-none"
    ><Icon
      v-if="icon"
      :name="icon"
      class="mb-3 size-5 text-muted-foreground"
      aria-hidden="true" /><span class="block font-semibold text-highlighted">{{ title }}</span>
    <p v-if="description" class="mt-2 text-sm leading-6 text-muted-foreground">{{ description }}</p>
    <div v-if="$slots.default" class="mt-3 text-sm"><slot /></div
  ></component>
</template>
