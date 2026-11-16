<script setup lang="ts">
import { ref } from 'vue'

const searchOpen = ref(false)
const { brand, home } = useIndocio()
</script>

<template>
  <UiAppLayout
    scroll="page"
    sticky-header
    :ui="{
      root: 'min-h-dvh bg-background text-foreground',
      header: 'z-30 flex h-14 items-center border-0 bg-background px-0',
      main: 'min-w-0',
      footer: 'border-0 bg-muted p-0',
    }"
  >
    <template #header>
      <div
        class="mx-auto flex h-full w-full max-w-[90rem] items-center gap-3 px-5 max-[380px]:gap-2 max-[380px]:px-3 sm:px-8"
      >
        <NuxtLink
          :to="home"
          :aria-label="`${brand.name} home`"
          class="mr-auto inline-flex items-center rounded-sm text-xl leading-none focus-visible:outline-1 focus-visible:outline-ring md:mr-6"
        >
          <BrandLogo
            wordmark
            class="[&>span]:max-[380px]:hidden"
            :class="brand.customizer.enabled ? '[&>span]:max-[440px]:hidden' : ''"
          />
        </NuxtLink>
        <SiteNavigation />
        <UiButton
          variant="soft"
          color="secondary"
          size="md"
          class="ml-auto max-lg:size-8 max-lg:p-0 lg:w-56 lg:justify-start"
          :ui="{ content: 'w-full gap-2' }"
          aria-label="Search documentation"
          aria-haspopup="dialog"
          aria-keyshortcuts="Control+K Meta+K"
          @click="searchOpen = true"
        >
          <Icon name="tabler:search" class="size-4" aria-hidden="true" />
          <span class="hidden text-[13px] text-muted-foreground lg:inline"
            >Search documentation…</span
          >
        </UiButton>
        <LocaleSwitch />
        <ColorModeButton />
        <DocsCustomizerTrigger />
      </div>
    </template>
    <slot />
    <DocsSearch v-model:open="searchOpen" />
    <template #footer>
      <div
        class="mx-auto flex w-full max-w-[90rem] flex-wrap items-center justify-between gap-6 px-5 py-10 sm:px-8"
      >
        <BrandLogo wordmark class="text-xl" />
        <SiteFooter />
      </div>
    </template>
  </UiAppLayout>
</template>
