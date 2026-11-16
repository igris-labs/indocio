<script setup lang="ts">
import type { DocsConfig } from '../../utils/docs-config'
defineProps<{ settings: DocsConfig }>()
</script>
<template>
  <SiteNavigation compact /><LocaleSwitch /><ColorModeButton /><DocsCustomizerTrigger />
</template>
