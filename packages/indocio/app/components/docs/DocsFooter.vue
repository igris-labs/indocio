<script setup lang="ts">
import type { DocsConfig } from '../../utils/docs-config'
defineProps<{ settings: DocsConfig; page?: unknown }>()
</script>
<template>
  <footer class="mt-8 border-t border-border/50 pt-4">
    <slot><SiteFooter compact /></slot>
  </footer>
</template>
