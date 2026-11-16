<script setup lang="ts">
defineProps<{ title: string }>()
</script>
<template>
  <li
    class="relative ml-3 border-l border-border pb-8 pl-8 [counter-increment:step] before:absolute before:top-0 before:-left-3.5 before:flex before:size-7 before:items-center before:justify-center before:rounded-full before:border before:border-border before:bg-background before:text-xs before:font-medium before:text-foreground before:content-[counter(step)] last:border-transparent last:pb-0"
  >
    <p class="mb-3 font-semibold text-highlighted">{{ title }}</p>
    <slot />
  </li>
</template>
