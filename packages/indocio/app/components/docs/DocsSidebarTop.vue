<script setup lang="ts">
import type { DocsConfig } from '../../utils/docs-config'
defineProps<{ settings: DocsConfig }>()
</script>
<template><DocsSpaceSwitcher /></template>
