<script setup lang="ts">
import type { DocsCollectionItem } from '@nuxt/content'

import type { DocsConfig } from '../../utils/docs-config'
import { Button } from '../ui/button'
const props = defineProps<{ page: DocsCollectionItem; settings: DocsConfig }>()
const route = useRoute()
const editUrl = computed(() =>
  props.settings.actions.edit
    ? props.settings.actions.edit.url.replace(
        '{path}',
        `${props.page.stem}.md`.split('/').map(encodeURIComponent).join('/'),
      )
    : undefined,
)
const copyStatus = ref('Copy link')
watch(
  () => route.path,
  () => (copyStatus.value = 'Copy link'),
)
async function copyLink() {
  try {
    await navigator.clipboard.writeText(window.location.href)
    copyStatus.value = 'Copied link'
  } catch {
    copyStatus.value = 'Copy failed'
  }
}
</script>
<template>
  <header class="mb-10">
    <h1 class="text-[2rem] leading-10 font-semibold tracking-tight text-highlighted">
      {{ page?.title }}
    </h1>
    <p class="mt-3 max-w-150 text-[15px] leading-7 text-muted-foreground">
      {{ page?.description }}
    </p>
    <div
      v-if="settings.actions.copyLink || settings.actions.edit"
      class="mt-5 flex items-center gap-2"
    >
      <Button
        v-if="settings.actions.copyLink"
        variant="ghost"
        color="accent"
        size="xs"
        @click="copyLink"
      >
        <svg
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          stroke-width="1.75"
          aria-hidden="true"
        >
          <path
            d="m10 13 4-4m-6 7-1 1a4 4 0 0 1-6-6l4-4a4 4 0 0 1 6 0m2 6a4 4 0 0 0 6 0l4-4a4 4 0 0 0-6-6l-1 1"
          />
        </svg>
        {{ copyStatus }}
      </Button>
      <span class="sr-only" role="status">{{ copyStatus === 'Copy link' ? '' : copyStatus }}</span>
    </div>

    <NuxtLink
      v-if="settings.actions.edit"
      :to="editUrl"
      target="_blank"
      rel="noopener noreferrer"
      class="mt-3 inline-flex text-xs text-muted-foreground hover:text-foreground"
      >{{ settings.actions.edit.label ?? 'Edit this page' }}</NuxtLink
    >
  </header>
</template>
