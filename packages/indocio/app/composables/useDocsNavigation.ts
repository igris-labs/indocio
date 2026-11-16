import type { ContentNavigationItem } from '@nuxt/content'

import { inContentScope } from '../utils/indocio'

export function useDocsNavigation() {
  const { scope, config } = useIndocio()
  return useAsyncData(
    () => `docs-navigation:${scope.value}`,
    async () => {
      const navigation = await queryCollectionNavigation('docs', [
        'navigation',
        'description',
        'space',
        'icon',
        'docs',
        'redirect',
      ])
      function filter(nodes: ContentNavigationItem[]): ContentNavigationItem[] {
        return nodes.flatMap((node) => {
          if (scope.value && node.path === scope.value) return filter(node.children ?? [])
          if (!inContentScope(node.path, scope.value, config.locales)) return []
          return [{ ...node, children: node.children ? filter(node.children) : undefined }]
        })
      }
      return filter(navigation)
    },
  )
}
