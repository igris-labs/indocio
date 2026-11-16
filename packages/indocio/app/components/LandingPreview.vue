<script setup lang="ts">
import { computed, ref } from 'vue'

const props = defineProps<{ path: string }>()
const view = ref('preview')
const { data: navigation } = await useDocsNavigation()
const { brand } = useIndocio()
const { data: page } = await useAsyncData(
  () => `landing-preview:${props.path}`,
  () => queryCollection('docs').path(props.path).first(),
)
const links = computed(() => navigationPages(navigation.value ?? []).slice(0, 6))
</script>

<template>
  <div class="overflow-hidden rounded-xl border border-border/60 bg-background" data-ui>
    <div
      class="flex min-h-12 items-center justify-between gap-4 border-b border-border/60 bg-muted/20 px-4"
    >
      <span class="text-sm font-medium">{{ brand.name }}</span>
      <UiTabs
        v-model="view"
        :items="[
          { value: 'preview', label: 'Documentation' },
          { value: 'source', label: 'Nuxt layer' },
        ]"
        aria-label="Documentation example"
        size="sm"
        :ui="{ panels: 'hidden' }"
      />
    </div>
    <div v-if="view === 'preview'" class="grid md:grid-cols-[13rem_minmax(0,1fr)]">
      <nav
        class="hidden border-r border-border/60 bg-muted/10 p-4 md:block"
        aria-label="Documentation preview"
      >
        <p class="mb-3 px-3 text-xs font-medium text-muted-foreground">Documentation</p>
        <NuxtLink
          v-for="link in links"
          :key="link.path"
          :to="link.path"
          class="mb-1 block rounded-md px-3 py-2 text-[13px] hover:bg-muted focus-visible:outline-1 focus-visible:outline-ring"
          :class="
            link.path === path
              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
              : 'text-muted-foreground'
          "
          >{{ link.title }}</NuxtLink
        >
      </nav>
      <div
        class="max-h-[32rem] overflow-y-auto p-6 sm:p-10"
        role="region"
        tabindex="0"
        aria-label="Documentation content preview"
      >
        <div class="mx-auto max-w-168">
          <template v-if="page">
            <h3 class="text-2xl font-semibold tracking-tight text-highlighted">{{ page.title }}</h3>
            <p class="mt-3 text-sm leading-6 text-muted-foreground">{{ page.description }}</p>
            <ContentRenderer :value="page" class="mt-8 text-[15px] leading-7" />
          </template>
          <p v-else class="text-sm text-muted-foreground">
            Preview page unavailable. Check the preview path in content/index.yml.
          </p>
        </div>
      </div>
    </div>
    <div v-else class="p-6 sm:p-10">
      <DocsCode
        :code="`export default defineNuxtConfig({\n  extends: ['@igrislabs/indocio'],\n})`"
        filename="nuxt.config.ts"
        language="ts"
      />
      <p class="mt-6 text-sm leading-6 text-muted-foreground">
        Your app owns the content. The Indocio layer supplies layouts, navigation, and components.
      </p>
    </div>
  </div>
</template>
