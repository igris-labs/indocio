<script setup lang="ts">
withDefaults(defineProps<{ compact?: boolean }>(), { compact: true })
const { enabled, open } = useCustomizer()
</script>
<template>
  <UiButton
    v-if="enabled"
    variant="ghost"
    color="secondary"
    :size="compact ? 'md' : 'sm'"
    :shape="compact ? 'icon' : undefined"
    :class="compact ? '' : 'w-full justify-start text-xs text-muted-foreground'"
    aria-label="Customize this layout"
    aria-haspopup="dialog"
    :aria-expanded="open"
    title="Customize this layout"
    @click="open = true"
  >
    <Icon mode="svg" name="tabler:adjustments-horizontal" class="size-4" aria-hidden="true" /><span
      v-if="!compact"
      >Customize this layout</span
    >
  </UiButton>
</template>
