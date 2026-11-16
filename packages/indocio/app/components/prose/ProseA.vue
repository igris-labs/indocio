<script setup lang="ts">
defineProps<{ href?: string; target?: string }>()
</script>
<template>
  <NuxtLink
    :href="href"
    :target="target"
    class="font-medium text-foreground underline decoration-accent/40 underline-offset-4 transition-colors hover:decoration-accent focus-visible:outline-1 focus-visible:outline-ring motion-reduce:transition-none"
    ><slot
  /></NuxtLink>
</template>
