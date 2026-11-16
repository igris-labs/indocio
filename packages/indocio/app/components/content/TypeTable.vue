<script setup lang="ts">
interface TypeField {
  name: string
  type: string
  description?: string
  required?: boolean
  default?: string
}
defineProps<{ fields: TypeField[] }>()
</script>
<template>
  <div
    class="my-6 overflow-x-auto rounded-lg border border-border"
    tabindex="0"
    role="region"
    aria-label="API reference"
  >
    <table class="w-full border-collapse text-left text-sm">
      <thead class="bg-muted/50">
        <tr>
          <th scope="col" class="px-4 py-3 font-medium">Name</th>
          <th scope="col" class="px-4 py-3 font-medium">Type</th>
          <th scope="col" class="px-4 py-3 font-medium">Default</th>
          <th scope="col" class="px-4 py-3 font-medium">Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="field in fields" :key="field.name" class="border-t border-border">
          <th scope="row" class="px-4 py-3 font-mono font-normal">
            {{ field.name
            }}<span v-if="field.required" class="ml-1 font-sans text-xs text-muted-foreground"
              >(required)</span
            >
          </th>
          <td class="px-4 py-3 font-mono text-xs">{{ field.type }}</td>
          <td class="px-4 py-3 font-mono text-xs">{{ field.default ?? '—' }}</td>
          <td class="px-4 py-3 text-muted-foreground">{{ field.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
