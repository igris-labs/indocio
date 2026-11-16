<script setup lang="ts">
import { provideToastManager } from 'akaza-ui'
provideToastManager()
const { brand } = useIndocio()
useHead({ titleTemplate: (title) => title || brand.name })
useSeoMeta({ description: () => brand.description })
</script>

<template>
  <NuxtRouteAnnouncer />
  <NuxtLayout><NuxtPage /></NuxtLayout>
  <DocsCustomizer v-if="brand.customizer.enabled" />
</template>
