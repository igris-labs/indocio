<script setup lang="ts">
defineProps<{ name: string; type?: string; required?: boolean; defaultValue?: string }>()
</script>
<template>
  <div class="my-6 border-b border-border pb-5 last:border-0">
    <div class="mb-3 flex flex-wrap items-center gap-2">
      <code class="font-mono text-sm font-semibold">{{ name }}</code
      ><span v-if="type" class="text-xs text-muted-foreground">{{ type }}</span
      ><Badge v-if="required" color="accent">required</Badge
      ><span v-if="defaultValue !== undefined" class="text-xs text-muted-foreground"
        >Default: <code>{{ defaultValue }}</code></span
      >
    </div>
    <div class="text-sm leading-6"><slot /></div>
  </div>
</template>
