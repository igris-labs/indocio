<script setup lang="ts">
withDefaults(defineProps<{ color?: 'neutral' | 'accent' | 'success' | 'warning' }>(), {
  color: 'neutral',
})
</script>
<template>
  <span
    class="inline-flex items-center rounded-md border px-2 py-0.5 text-xs leading-5 font-medium"
    :class="{
      'border-border bg-muted text-foreground': color === 'neutral',
      'border-accent/20 bg-accent/6 text-foreground': color === 'accent',
      'border-success/20 bg-success/5 text-foreground': color === 'success',
      'border-warning/20 bg-warning/5 text-foreground': color === 'warning',
    }"
    ><slot
  /></span>
</template>
