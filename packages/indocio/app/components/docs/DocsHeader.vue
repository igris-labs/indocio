<script setup lang="ts">
import type { DocsConfig } from '../../utils/docs-config'
import { Button } from '../ui/button'
defineProps<{
  settings: DocsConfig
  currentCategory: string
  currentTitle: string
  categoryTo?: string
}>()
defineEmits<{ navigation: []; search: [] }>()
const { brand, home } = useIndocio()
</script>
<template>
  <div
    class="flex h-full w-full items-center gap-2 px-3 text-[13px] max-[380px]:gap-1 max-[380px]:px-1 lg:w-(--docs-header-brand-width) lg:shrink-0 lg:border-r lg:border-border/50"
  >
    <Button
      variant="ghost"
      color="secondary"
      size="md"
      shape="icon"
      :class="settings.sidebar.collapsible ? '' : 'lg:hidden'"
      v-if="settings.sidebar.enabled"
      aria-label="Open navigation"
      @click="$emit('navigation')"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        aria-hidden="true"
      >
        <path d="M4 6h16M4 12h16M4 18h16" />
      </svg>
    </Button>
    <NuxtLink
      :to="home"
      :aria-label="`${brand.name} home`"
      class="inline-flex items-center rounded-sm text-xl leading-none font-semibold tracking-tight focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ring"
      ><BrandLogo
        wordmark
        class="[&>span]:max-[380px]:hidden"
        :class="[
          settings.sidebar.enabled && (settings.sidebar.width < 240 || settings.sidebar.collapsible)
            ? 'lg:[&>span]:hidden'
            : '',
          brand.customizer.enabled ? '[&>span]:max-[440px]:hidden' : '',
        ]"
    /></NuxtLink>
    <NuxtLink
      :to="home"
      v-if="
        !settings.sidebar.collapsible &&
        (!settings.sidebar.enabled || settings.sidebar.width >= 240)
      "
      class="hidden items-center border-l border-border pl-2 leading-none font-medium text-muted-foreground hover:text-foreground sm:inline-flex"
      >Docs</NuxtLink
    >
    <Button
      v-if="settings.search"
      variant="ghost"
      color="secondary"
      size="md"
      shape="icon"
      class="ml-auto"
      aria-label="Search documentation"
      aria-haspopup="dialog"
      aria-keyshortcuts="Control+K Meta+K"
      title="Search documentation (Ctrl/Cmd+K)"
      @click="$emit('search')"
    >
      <Icon name="tabler:search" class="size-4" aria-hidden="true" />
    </Button>
  </div>
  <nav
    v-if="settings.breadcrumbs"
    aria-label="Breadcrumb"
    class="hidden min-w-0 px-6 text-xs text-muted-foreground xl:block"
  >
    <ol class="flex min-w-0 items-center gap-2">
      <li class="min-w-0">
        <NuxtLink
          :to="categoryTo ?? home"
          aria-current-value="false"
          class="inline-flex min-h-10 items-center rounded-sm no-underline hover:text-accent focus-visible:outline-1 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >{{ currentCategory }}</NuxtLink
        >
      </li>
      <li aria-hidden="true" class="shrink-0">
        <svg
          class="size-3"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
        >
          <path d="m9 5 7 7-7 7" />
        </svg>
      </li>
      <li class="min-w-0">
        <span
          aria-current="page"
          class="inline-flex min-h-10 items-center font-medium text-accent"
          >{{ currentTitle }}</span
        >
      </li>
    </ol>
  </nav>
  <div class="mr-3 ml-auto flex shrink-0 items-center gap-1 max-[380px]:mr-1 max-[380px]:gap-0">
    <slot name="actions"><DocsHeaderActions :settings="settings" /></slot>
  </div>
</template>
