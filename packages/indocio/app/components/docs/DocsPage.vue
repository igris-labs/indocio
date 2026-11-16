<script setup lang="ts">
import type { DocsCollectionItem } from '@nuxt/content'
import { computed, useTemplateRef } from 'vue'
const props = defineProps<{ page: DocsCollectionItem }>()
const { settings, space, pages } = await useDocsSettings(() => props.page)
const container = useTemplateRef<HTMLElement>('container')
const probe = useTemplateRef<HTMLElement>('probe')
const room = ref(false)
function measure() {
  if (container.value && probe.value)
    room.value = container.value.clientWidth >= probe.value.getBoundingClientRect().width
}
useResizeObserver(container, measure)
useResizeObserver(probe, measure)
const desktop = useMediaQuery('(min-width: 1024px)')
const links = computed(() => {
  function filter(
    items: NonNullable<DocsCollectionItem['body']['toc']>['links'],
  ): NonNullable<DocsCollectionItem['body']['toc']>['links'] {
    return items
      .filter((item) => item.depth <= settings.value.toc.depth)
      .map((item) => ({ ...item, children: item.children ? filter(item.children) : undefined }))
  }
  return filter(props.page.body.toc?.links ?? [])
})
const showToc = computed(() => settings.value.toc.enabled && links.value.length > 0)
const desktopToc = computed(() => showToc.value && room.value && desktop.value)
const adjacent = computed(() => {
  const index = pages.value.findIndex((page) => page.path === props.page.path)
  return index < 0 ? [] : [pages.value[index - 1], pages.value[index + 1]]
})
</script>
<template>
  <div
    ref="container"
    class="docs-page"
    :data-toc-position="settings.toc.position"
    :data-desktop-toc="desktopToc || undefined"
    :style="{ '--docs-content-width': settings.content.width }"
  >
    <div class="docs-probe-clip" aria-hidden="true">
      <div ref="probe" class="docs-width-probe" />
    </div>
    <article class="docs-article min-w-0 pt-12 pb-24">
      <slot name="before" :page="page" :space="space" :settings="settings"
        ><DocsPageBefore :page="page" :space="space" :settings="settings"
      /></slot>
      <slot name="header"><DocsPageHeader :page="page" :settings="settings" /></slot>
      <details
        v-if="showToc && !desktopToc"
        class="group/toc mb-8 rounded-lg border border-border p-3"
        data-testid="mobile-toc"
      >
        <summary
          class="flex min-h-8 cursor-pointer list-none items-center justify-between text-sm font-medium [&::-webkit-details-marker]:hidden"
        >
          <span>On this page</span
          ><Icon
            mode="svg"
            name="tabler:chevron-down"
            class="size-4 shrink-0 transition-transform duration-150 group-open/toc:rotate-180 motion-reduce:transition-none"
            aria-hidden="true"
          />
        </summary>
        <DocsToc :links="links" class="static mt-3 max-h-64" />
      </details>
      <slot :page="page"
        ><ContentRenderer
          :value="page"
          class="min-w-0 text-[0.9375rem] leading-7 text-pretty text-foreground"
          data-testid="docs-prose"
      /></slot>
      <slot name="after" :page="page" :space="space" :settings="settings"
        ><DocsPageAfter :page="page" :space="space" :settings="settings"
      /></slot>
      <DocsPageNavigation v-if="settings.navigation" :previous="adjacent[0]" :next="adjacent[1]" />
      <DocsFooter v-if="settings.footer" :page="page" :settings="settings" />
    </article>
    <div v-if="desktopToc" class="docs-page-toc min-w-0 pt-12">
      <slot name="toc"
        ><DocsToc :links="links" /><DocsTocBottom :page="page" :space="space" :settings="settings"
      /></slot>
    </div>
  </div>
</template>
<style>
.docs-page {
  position: relative;
  pointer-events: none;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(
      0,
      min(var(--docs-content-width), calc(100% - 2 * var(--docs-center-gutter)))
    ) minmax(0, 1fr);
  --docs-center-gutter: max(1.25rem, calc(var(--docs-left-width, 0px) + 2rem));
  --docs-required-gutter: max(
    calc(var(--docs-left-width, 0px) + 2rem),
    calc(var(--docs-toc-width) + var(--docs-toc-gap))
  );
  width: calc(100% + var(--docs-left-width, 0px));
  margin-left: calc(-1 * var(--docs-left-width, 0px));
  min-height: calc(100dvh - var(--docs-header-height, 3.5rem));
}
.docs-article {
  grid-column: 2;
  pointer-events: auto;
}
.docs-probe-clip {
  position: absolute;
  inset: 0;
  height: 0;
  overflow: hidden;
  visibility: hidden;
  pointer-events: none;
}
.docs-width-probe {
  width: calc(var(--docs-content-width) + 2 * var(--docs-required-gutter));
  height: 0;
}
.docs-page-toc {
  pointer-events: auto;
  grid-column: 3;
  grid-row: 1;
  width: calc(var(--docs-toc-width) + var(--docs-toc-gap));
  padding-left: var(--docs-toc-gap);
}
.docs-page[data-desktop-toc] {
  --docs-center-gutter: max(
    calc(var(--docs-left-width, 0px) + 2rem),
    calc(var(--docs-toc-width) + var(--docs-toc-gap))
  );
}
.docs-page[data-toc-position='right'] {
  --docs-required-gutter: max(
    calc(var(--docs-left-width, 0px) + 2rem),
    calc(var(--docs-toc-width) + 1.5rem)
  );
}
.docs-page[data-toc-position='right'] .docs-page-toc {
  pointer-events: auto;
  width: calc(var(--docs-toc-width) + 1.5rem);
  padding-left: 0;
  padding-right: 1.5rem;
  justify-self: end;
}
.docs-page[data-toc-position='right'][data-desktop-toc] {
  --docs-center-gutter: max(
    calc(var(--docs-left-width, 0px) + 2rem),
    calc(var(--docs-toc-width) + 1.5rem)
  );
}
@media (max-width: 1023px) {
  .docs-page {
    --docs-center-gutter: 1.25rem;
  }
}
</style>
