<script setup lang="ts">
withDefaults(defineProps<{ columns?: 1 | 2 | 3 }>(), { columns: 2 })
</script>
<template>
  <div
    class="my-6 grid gap-4 [&>*]:my-0"
    :class="
      columns === 3
        ? 'sm:grid-cols-2 xl:grid-cols-3'
        : columns === 2
          ? 'sm:grid-cols-2'
          : 'grid-cols-1'
    "
  >
    <slot />
  </div>
</template>
