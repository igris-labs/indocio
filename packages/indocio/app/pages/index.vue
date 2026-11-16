<script setup lang="ts">
import { buttonVariants } from '../components/ui/button'
definePageMeta({ layout: 'marketing' })
const { scope, brand, localPath } = useIndocio()
const { data: landing } = await useAsyncData(
  () => `landing:${scope.value}`,
  () =>
    queryCollection('landing')
      .where('stem', '=', `${scope.value.slice(1) ? `${scope.value.slice(1)}/` : ''}index`)
      .first(),
)
if (!landing.value)
  throw createError({
    statusCode: 404,
    statusMessage: 'Landing page not found. Add content/index.yml (or content/<locale>/index.yml).',
  })
useSeoMeta({
  title: () => `${landing.value?.title} · ${brand.name}`,
  description: () => landing.value?.description,
})
</script>

<template>
  <div class="mx-auto w-full max-w-[90rem] px-5 pb-16 sm:px-8">
    <section
      class="mx-auto flex max-w-4xl flex-col items-center pt-14 pb-14 text-center sm:pt-20 sm:pb-20"
      aria-labelledby="hero-title"
    >
      <h1
        id="hero-title"
        class="text-[clamp(2rem,3.5vw,3rem)] leading-[1.08] font-semibold tracking-[-0.045em] text-balance text-highlighted"
      >
        {{ landing?.title }}
      </h1>
      <p class="mt-5 max-w-2xl text-base leading-7 text-pretty text-foreground sm:text-lg">
        {{ landing?.description }}
      </p>
      <div class="mt-7 flex flex-wrap justify-center gap-3">
        <NuxtLink
          v-for="(link, index) in landing?.links"
          :key="link.to"
          :to="localPath(link.to)"
          :class="
            buttonVariants({
              variant: index === 0 ? 'solid' : 'soft',
              color: index === 0 ? 'primary' : 'accent',
              size: 'md',
            }).root()
          "
          >{{ link.label }}</NuxtLink
        >
      </div>
    </section>
    <section
      v-if="landing?.features?.length"
      class="pb-14 sm:pb-16"
      aria-labelledby="features-title"
    >
      <h2
        id="features-title"
        class="text-xl leading-7 font-semibold tracking-tight text-highlighted"
      >
        {{ landing.featuresTitle }}
      </h2>
      <dl class="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div
          v-for="(feature, index) in landing.features"
          :key="feature.title"
          class="flex min-w-0 flex-col rounded-xl border border-border/60 bg-muted/20 p-5 sm:p-6"
          :class="index === 0 && 'sm:col-span-2'"
        >
          <dt class="text-[15px] font-semibold text-highlighted">{{ feature.title }}</dt>
          <dd class="mt-2 flex flex-1 flex-col">
            <p class="max-w-lg text-sm leading-6 text-muted-foreground">
              {{ feature.description }}
            </p>
            <pre
              v-if="feature.code"
              class="mt-5 flex flex-1 items-center overflow-x-auto rounded-lg bg-background p-4 text-left text-xs leading-6"
            ><code>{{ feature.code }}</code></pre>
          </dd>
        </div>
      </dl>
    </section>
    <section v-if="landing?.preview" aria-labelledby="preview-title">
      <h2 id="preview-title" class="text-2xl font-semibold tracking-tight">
        {{ landing.preview.title }}
      </h2>
      <p
        v-if="landing.preview.description"
        class="mt-3 max-w-2xl text-sm leading-6 text-muted-foreground"
      >
        {{ landing.preview.description }}
      </p>
      <LandingPreview :path="localPath(landing.preview.to)" class="mt-6" />
    </section>
  </div>
</template>
