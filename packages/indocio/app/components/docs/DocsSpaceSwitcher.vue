<script setup lang="ts">
const { brand } = useIndocio()
const { enabled, preferences } = useCustomizer()
const switcher = computed(() =>
  enabled.value ? (preferences.value.switcher ?? brand.spaces.switcher) : brand.spaces.switcher,
)
const { spaces, space } = await useDocsContext()
const options = computed(() =>
  spaces.value.map((item) => ({
    value: item.to,
    label: item.title,
    description: item.description,
  })),
)
async function choose(to: unknown) {
  if (typeof to === 'string' && spaces.value.some((item) => item.to === to)) await navigateTo(to)
}
</script>
<template>
  <nav v-if="spaces.length > 1" class="mb-6" aria-label="Documentation spaces">
    <div
      v-if="switcher === 'tabs'"
      class="flex flex-wrap gap-1 rounded-lg border border-border p-1"
    >
      <NuxtLink
        v-for="item in spaces"
        :key="item.path"
        :to="item.to"
        :aria-current="space?.path === item.path ? 'page' : undefined"
        class="flex min-h-10 items-center gap-2 rounded-md px-2 text-xs hover:bg-muted focus-visible:outline-1 focus-visible:outline-ring"
        :class="space?.path === item.path && 'bg-accent/6 font-medium'"
        ><Icon v-if="item.icon" :name="item.icon" class="size-4" aria-hidden="true" />{{
          item.title
        }}</NuxtLink
      >
    </div>
    <div v-else class="text-xs text-muted-foreground">
      <span>Product</span>
      <UiSelect
        :options="options"
        :model-value="space?.to"
        placeholder="Choose documentation"
        aria-label="Product"
        class="mt-2 w-full"
        @update:model-value="choose"
      />
    </div>
    <p v-if="space?.description" class="mt-2 text-xs leading-5 text-muted-foreground">
      {{ space.description }}
    </p>
  </nav>
</template>
