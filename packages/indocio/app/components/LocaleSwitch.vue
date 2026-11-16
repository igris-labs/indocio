<script setup lang="ts">
import { documentationSpaces, spacePages } from '../utils/spaces'
const { config, scope } = useIndocio()
const route = useRoute()
const { space } = await useDocsContext()
const { data: allNavigation } = await useAsyncData('docs-locale-navigation', () =>
  queryCollectionNavigation('docs', ['space', 'redirect']),
)
function localePath(code: string) {
  const destination = `/${code}${route.path.slice(scope.value.length) === '/' ? '' : route.path.slice(scope.value.length)}`
  const pages = spacePages(allNavigation.value ?? [])
  if (pages.some((page) => page.path === destination)) return destination
  const root = space.value ? `/${code}${space.value.path.slice(scope.value.length)}` : undefined
  const product = documentationSpaces(allNavigation.value ?? []).find((item) => item.path === root)
  return product?.to ?? `/${code}`
}
</script>

<template>
  <nav v-if="config.i18n" class="flex items-center gap-3 px-2 text-xs" aria-label="Language">
    <NuxtLink
      v-for="locale in config.locales"
      :key="locale.code"
      :to="localePath(locale.code)"
      :lang="locale.language"
      :aria-current="scope === `/${locale.code}` ? 'page' : undefined"
      class="rounded-sm text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-ring"
      :class="{ 'text-foreground': scope === `/${locale.code}` }"
      >{{ locale.name }}</NuxtLink
    >
  </nav>
</template>
