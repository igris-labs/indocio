<script setup lang="ts">
import type { DocsConfig } from '@igrislabs/indocio/types'
defineProps<{ settings: DocsConfig }>()
</script>
<template><DocsCustomizerTrigger :compact="false" class="mb-4" /></template>
