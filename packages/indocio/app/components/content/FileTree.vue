<script setup lang="ts">
import { computed } from 'vue'

import { fileTreeNodes } from '../../utils/file-tree'
import type { FileTreeItem } from '../../utils/file-tree'

const props = withDefaults(defineProps<{ items: FileTreeItem[]; label?: string }>(), {
  label: 'Project structure',
})
const tree = computed(() => fileTreeNodes(props.items))
</script>
<template>
  <figure class="my-6 min-w-0 overflow-hidden rounded-lg border border-border bg-background">
    <figcaption
      class="flex items-center gap-2 border-b border-border bg-muted/30 px-4 py-3 text-xs font-medium text-muted-foreground"
    >
      <Icon name="tabler:folders" class="size-4 shrink-0" aria-hidden="true" />
      {{ label }}
    </figcaption>
    <UiTree
      :items="tree"
      item-key="id"
      label-key="name"
      children-key="children"
      :has-children="(item) => item.children !== undefined"
      selection-mode="none"
      :aria-label="label"
      class="p-2"
    >
      <template #icon="{ item, node }">
        <Icon
          v-if="item.children !== undefined"
          :name="node.isExpanded ? 'tabler:folder-open' : 'tabler:folder'"
          aria-hidden="true"
        />
        <CodeFileIcon v-else :filename="item.name" />
      </template>
      <template #label="{ item }">
        <span class="block truncate font-mono" :title="item.name">{{ item.name }}</span>
      </template>
    </UiTree>
  </figure>
</template>
