<script setup lang="ts">
defineProps<{ compact?: boolean }>()
const { brand } = useIndocio()
</script>
<template>
  <p class="text-xs text-muted-foreground">
    {{ brand.name }} · Built with Nuxt Content, IPEX, and Akaza UI.
  </p>
</template>
