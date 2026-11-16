import type { ContentNavigationItem } from '@nuxt/content'

export function navigationPages(nodes: ContentNavigationItem[]): ContentNavigationItem[] {
  return nodes.flatMap((node) => [
    ...(node.page === false ? [] : [node]),
    ...navigationPages(node.children ?? []),
  ])
}
