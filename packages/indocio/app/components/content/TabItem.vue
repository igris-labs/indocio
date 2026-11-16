<script setup lang="ts">
defineProps<{ title: string; value?: string }>()
</script>
<template>
  <div class="min-w-0"><slot /></div>
</template>
