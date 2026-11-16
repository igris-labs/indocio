<script setup lang="ts">
import { computed, ref, resolveComponent, watch } from 'vue'

import { headerLeafLinks, resolveHeaderLinks } from '../utils/header-navigation'
import { NavigationMenu } from './ui/navigation-menu'

const props = defineProps<{ compact?: boolean }>()
const route = useRoute()
const { brand, localPath } = useIndocio()
const link = resolveComponent('NuxtLink')
const open = ref<string | null>(null)
const desktop = useMediaQuery('(min-width: 768px)')
watch(desktop, () => {
  open.value = null
})
const groups = computed(() => resolveHeaderLinks(brand.header.links, route.path, localPath, link))
const mobileItems = computed(() => [
  { value: 'header-menu', label: 'Menu', children: headerLeafLinks(groups.value) },
])
watch(
  () => route.fullPath,
  () => {
    open.value = null
  },
)

const ui = computed(() => ({
  trigger: props.compact ? 'text-xs leading-4' : 'text-[13px] leading-4',
  link: props.compact ? 'text-xs leading-4' : 'text-[13px] leading-4',
  content: 'rounded-xl border-border/70 bg-background p-2 shadow-lg',
  viewport: 'rounded-lg bg-muted/40',
  panel: 'w-[min(36rem,calc(100vw-2rem))] max-w-none p-0',
  contentList:
    'grid max-h-[min(32rem,75dvh)] grid-cols-1 gap-1 overflow-y-auto p-2 sm:grid-cols-2 sm:gap-2 sm:p-4',
  contentLink: 'h-full justify-start gap-2 px-3 py-3 text-left text-[13px] leading-5',
  description: 'max-w-none text-[13px] leading-5 text-muted-foreground',
}))
const mobileUi = computed(() => ({
  ...ui.value,
  panel: 'w-[min(22rem,calc(100vw-2rem))] max-w-none p-0',
  contentList: 'grid max-h-[min(32rem,75dvh)] grid-cols-1 gap-1 overflow-y-auto p-2',
  contentLink: 'gap-1 px-3 py-2 text-[13px] leading-5',
}))
</script>

<template>
  <template v-if="groups.length">
    <NavigationMenu
      v-model:open="open"
      :items="groups"
      content-mode="flyout"
      teleport="#teleports"
      size="md"
      :side-offset="2"
      :ui="ui"
      aria-label="Main navigation"
      class="hidden shrink-0 md:block"
    >
      <template #header-link="{ item }">
        <span class="flex w-full items-start gap-3">
          <Icon
            v-if="item.navigationIcon"
            :name="String(item.navigationIcon)"
            class="mt-0.5 size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <span class="min-w-0">
            <span class="block font-medium">{{ item.label }}</span>
            <span
              v-if="item.description"
              class="mt-1 block text-[13px] leading-5 text-muted-foreground"
              >{{ item.description }}</span
            >
          </span>
        </span>
      </template>
    </NavigationMenu>
    <NavigationMenu
      v-model:open="open"
      :items="mobileItems"
      content-mode="flyout"
      teleport="#teleports"
      size="md"
      :side-offset="2"
      :ui="mobileUi"
      aria-label="Main navigation"
      class="shrink-0 md:hidden"
    >
      <template #header-link="{ item }">
        <span class="flex w-full items-start gap-3">
          <Icon
            v-if="item.navigationIcon"
            :name="String(item.navigationIcon)"
            class="mt-0.5 size-4 shrink-0 text-muted-foreground"
            aria-hidden="true"
          />
          <span class="min-w-0">
            <span class="block font-medium">{{ item.label }}</span>
            <span
              v-if="item.description"
              class="mt-1 block text-[13px] leading-5 text-muted-foreground"
              >{{ item.description }}</span
            >
          </span>
        </span>
      </template>
    </NavigationMenu>
  </template>
</template>
