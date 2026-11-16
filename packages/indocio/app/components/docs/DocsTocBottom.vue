<script setup lang="ts">
import type { DocsConfig } from '../../utils/docs-config'
defineProps<{ settings: DocsConfig; page?: unknown; space?: unknown }>()
</script>
<template><slot /></template>
