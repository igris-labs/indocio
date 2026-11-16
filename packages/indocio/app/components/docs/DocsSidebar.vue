<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
import { computed, resolveComponent, useTemplateRef, watch } from 'vue'

import type { DocsConfig } from '../../utils/docs-config'
import { Button } from '../ui/button'
import { Sidebar } from '../ui/sidebar'
import type { SidebarItem } from '../ui/sidebar'
const props = defineProps<{ tree: ContentNavigationItem[]; settings: DocsConfig }>()
const collapsed = defineModel<boolean>('collapsed', { default: false })
const navigation = useTemplateRef<InstanceType<typeof Sidebar>>('navigation')
defineExpose({ toggle: () => navigation.value?.toggle() })
const route = useRoute()
const { brand, home } = useIndocio()
const link = resolveComponent('NuxtLink')
watch(
  () => route.path,
  () => navigation.value?.closeMobile(),
)
function menuItems(nodes: ContentNavigationItem[], seen = new Set<string>()): SidebarItem[] {
  return nodes.flatMap((node) => {
    const duplicate = seen.has(node.path)
    seen.add(node.path)
    const item: SidebarItem =
      node.page === false
        ? { value: node.path, label: node.title, type: 'label' }
        : {
            value: node.path,
            label: node.title,
            to: node.path,
            as: link,
            navigationIcon:
              node.navigation && typeof node.navigation === 'object' && 'icon' in node.navigation
                ? node.navigation.icon
                : node.icon,
          }
    return [...(duplicate ? [] : [item]), ...menuItems(node.children ?? [], seen)]
  })
}
const items = computed(() => menuItems(props.tree))
</script>
<template>
  <Sidebar
    ref="navigation"
    v-model:collapsed="collapsed"
    aria-label="Documentation navigation"
    navigation-label="Documentation"
    variant="soft"
    :items="items"
    :model-value="route.path"
    breakpoint="(max-width: 1023px)"
    :default-size="settings.sidebar.width"
    :size="settings.sidebar.width"
    :min-size="180"
    :max-size="480"
    :collapsible="settings.sidebar.collapsible ? 'offcanvas' : false"
    :mobile-size="288"
    :ui="{
      root: 'h-[calc(100dvh-var(--docs-header-height))]',
      navigation: {
        list: 'before:bg-sidebar-accent',
        itemLeading: '[[data-akaza-active]_&]:text-inherit',
      },
    }"
  >
    <template #header="{ closeMobile }"
      ><span class="font-semibold">Documentation</span
      ><Button variant="ghost" color="secondary" size="xs" @click="closeMobile"
        >Close</Button
      ></template
    >
    <template #body-start
      ><slot name="top"><DocsSidebarTop :settings="settings" /></slot
    ></template>
    <template #item-leading="{ item }"
      ><Icon
        v-if="item.navigationIcon"
        :name="String(item.navigationIcon)"
        class="size-4"
        aria-hidden="true"
    /></template>
    <template #footer
      ><slot name="bottom"
        ><DocsSidebarBottom :settings="settings" /><NuxtLink
          :to="home"
          class="inline-flex items-center gap-2 hover:text-highlighted"
          ><Icon name="tabler:arrow-up-left" class="size-3.5" aria-hidden="true" />{{
            brand.name
          }}</NuxtLink
        ></slot
      ></template
    >
  </Sidebar>
</template>
