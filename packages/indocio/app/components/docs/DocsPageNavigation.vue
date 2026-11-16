<script setup lang="ts">
import type { ContentNavigationItem } from '@nuxt/content'
defineProps<{ previous?: ContentNavigationItem; next?: ContentNavigationItem }>()
</script>
<template>
  <nav class="mt-16 grid gap-3 border-t border-border pt-6 sm:grid-cols-2" aria-label="Guide pages">
    <NuxtLink
      v-if="previous"
      :to="previous.path"
      class="group flex items-center gap-3 rounded-md border border-border px-4 py-3 text-sm hover:bg-muted focus-visible:outline-1 focus-visible:outline-ring"
    >
      <svg
        class="size-4 shrink-0 text-muted-foreground"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        aria-hidden="true"
      >
        <path d="m15 5-7 7 7 7" />
      </svg>
      <span class="min-w-0"
        ><span class="block text-xs text-muted-foreground">Previous</span
        ><span class="mt-1 block font-medium text-highlighted">{{ previous.title }}</span></span
      >
    </NuxtLink>
    <NuxtLink
      v-if="next"
      :to="next.path"
      class="group flex items-center justify-end gap-3 rounded-md border border-border px-4 py-3 text-right text-sm hover:bg-muted focus-visible:outline-1 focus-visible:outline-ring sm:col-start-2"
    >
      <span class="min-w-0"
        ><span class="block text-xs text-muted-foreground">Next</span
        ><span class="mt-1 block font-medium text-highlighted">{{ next.title }}</span></span
      >
      <svg
        class="size-4 shrink-0 text-muted-foreground"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="1.75"
        aria-hidden="true"
      >
        <path d="m9 5 7 7-7 7" />
      </svg>
    </NuxtLink>
  </nav>
</template>
