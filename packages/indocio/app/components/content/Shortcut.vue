<script setup lang="ts">
defineProps<{ keys: string[] }>()
</script>
<template>
  <span class="inline-flex items-center gap-1" role="group" :aria-label="keys.join(' + ')"
    ><kbd
      v-for="(key, index) in keys"
      :key="index"
      class="rounded border border-border bg-muted px-1.5 py-0.5 font-mono text-xs"
      >{{ key }}</kbd
    ></span
  >
</template>
