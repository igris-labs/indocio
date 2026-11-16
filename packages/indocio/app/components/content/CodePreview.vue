<script setup lang="ts">
withDefaults(defineProps<{ title?: string }>(), { title: 'Preview' })
</script>
<template>
  <figure class="my-6 min-w-0 overflow-hidden rounded-lg border border-border">
    <figcaption class="border-b border-border px-4 py-2 text-xs text-muted-foreground">
      {{ title }}
    </figcaption>
    <div class="overflow-auto p-6">
      <slot name="preview"><slot /></slot>
    </div>
    <div
      v-if="$slots.code"
      class="border-t border-border [&>div]:my-0 [&>div]:rounded-none [&>div]:border-0"
    >
      <slot name="code" />
    </div>
  </figure>
</template>
