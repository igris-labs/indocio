<script setup lang="ts">
import type { DocsConfig } from '../../utils/docs-config'
defineProps<{ settings: DocsConfig; page?: unknown; space?: unknown }>()
</script>
<template>
  <slot><DocsCustomizerTrigger :compact="false" class="mb-4" /></slot>
</template>
