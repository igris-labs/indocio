<script setup lang="ts">
const route = useRoute()
const { brand } = useIndocio()
const { data: page } = await useAsyncData(
  () => `docs:${route.path}`,
  () => queryCollection('docs').path(route.path).first(),
)
if (!page.value || page.value.path.endsWith('/.navigation'))
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
useSeoMeta({
  title: () => `${page.value?.title} · ${brand.name}`,
  description: () => page.value?.description,
})
</script>
<template><DocsPage v-if="page" :page="page" /></template>
