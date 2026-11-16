import { computed } from 'vue'

import { activeSpace, documentationSpaces, scopeNavigation, spacePages } from '../utils/spaces'

export async function useDocsContext() {
  const route = useRoute()
  const { data: navigation } = await useDocsNavigation()
  const spaces = computed(() => documentationSpaces(navigation.value ?? []))
  const space = computed(() => activeSpace(spaces.value, route.path))
  const tree = computed(() => scopeNavigation(navigation.value ?? [], route.path, spaces.value))
  const pages = computed(() => spacePages(tree.value))
  return { navigation, spaces, space, tree, pages }
}
