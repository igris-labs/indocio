<script setup lang="ts">
import { findPageBreadcrumb } from '@nuxt/content/utils'
import { computed, ref, useTemplateRef } from 'vue'

import { firstPage } from '../../utils/spaces'
const route = useRoute()
const { data: page } = await useAsyncData(
  () => `docs:${route.path}`,
  () => queryCollection('docs').path(route.path).first(),
)
const { settings, tree, space } = await useDocsSettings(page)
const collapsed = ref(false)
const sidebar = useTemplateRef<{ toggle: () => void }>('sidebar')
const searchOpen = ref(false)
const breadcrumb = computed(() => findPageBreadcrumb(tree.value, route.path, { current: true }))
const category = computed(() => breadcrumb.value.find((node) => node.page === false))
const categoryTo = computed(
  () => space.value?.to ?? firstPage(category.value ? [category.value] : tree.value),
)
const style = computed(() => ({
  '--docs-sidebar-width': `${settings.value.sidebar.width}px`,
  '--docs-left-width':
    settings.value.sidebar.enabled && !collapsed.value ? 'var(--docs-sidebar-width)' : '0px',
  '--docs-header-brand-width':
    settings.value.sidebar.enabled && !collapsed.value ? 'var(--docs-sidebar-width)' : 'auto',
}))
</script>
<template>
  <UiAppLayout
    scroll="page"
    sticky-header
    sticky-sides
    :style="style"
    class="docs-layout"
    :ui="{
      root: 'min-h-dvh bg-background text-foreground',
      header:
        'z-20 flex h-(--docs-header-height) items-center border-b border-border/60 bg-background px-0',
      left: 'max-lg:w-0',
      main: 'min-w-0 outline-none',
    }"
  >
    <template #header
      ><slot name="header"
        ><DocsHeader
          :settings="settings"
          :current-title="breadcrumb.at(-1)?.title ?? 'Documentation'"
          :category-to="categoryTo"
          :current-category="space?.title ?? category?.title ?? 'Documentation'"
          @navigation="sidebar?.toggle()"
          @search="searchOpen = true" /></slot
    ></template>
    <template v-if="settings.sidebar.enabled" #left
      ><slot name="sidebar"
        ><DocsSidebar
          ref="sidebar"
          v-model:collapsed="collapsed"
          :tree="tree"
          :settings="settings" /></slot
    ></template>
    <slot />
    <DocsSearch v-if="settings.search" v-model:open="searchOpen" />
  </UiAppLayout>
</template>
<style>
.docs-layout {
  --docs-header-height: 3.5rem;
  --docs-toc-width: 13rem;
  --docs-toc-gap: 6rem;
}
@media (max-width: 1023px) {
  .docs-layout {
    --docs-left-width: 0px !important;
  }
}
</style>
