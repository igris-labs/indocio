import type { ContentNavigationItem } from '@nuxt/content'

export interface DocsSpace {
  path: string
  title: string
  description?: string
  icon?: string
  to: string
  docs?: unknown
  node: ContentNavigationItem
}
export function withinPath(path: string, root: string) {
  return path === root || path.startsWith(`${root}/`)
}
export function firstPage(nodes: ContentNavigationItem[]): string | undefined {
  for (const node of nodes) {
    if (node.page !== false) return node.path
    const child = firstPage(node.children ?? [])
    if (child) return child
  }
}
export function documentationSpaces(nodes: ContentNavigationItem[]): DocsSpace[] {
  return nodes.flatMap((node) => {
    if (node.space !== true) return documentationSpaces(node.children ?? [])
    const entry = firstPage([node])
    if (!entry) return []
    const to =
      typeof node.redirect === 'string'
        ? node.redirect.startsWith('/')
          ? node.redirect
          : `${node.path}/${node.redirect}`
        : entry
    if (!withinPath(to, node.path) || to.split('/').some((part) => part === '..' || part === '.'))
      throw new Error(`Indocio: ${node.path}/.navigation.yml: redirect must stay inside this space`)
    if (!spacePages([node]).some((page) => page.path === to))
      throw new Error(
        `Indocio: ${node.path}/.navigation.yml: redirect must reference a visible page in this space`,
      )
    return [
      {
        path: node.path,
        title: node.title,
        description: typeof node.description === 'string' ? node.description : undefined,
        icon: typeof node.icon === 'string' ? node.icon : undefined,
        to,
        docs: node.docs,
        node,
      },
    ]
  })
}
export function activeSpace(spaces: DocsSpace[], path: string) {
  return spaces.find((space) => withinPath(path, space.path))
}
export function spacePages(nodes: ContentNavigationItem[]): ContentNavigationItem[] {
  const seen = new Set<string>()
  function visit(items: ContentNavigationItem[]): ContentNavigationItem[] {
    return items.flatMap((node) => {
      const page = node.page !== false && !seen.has(node.path)
      if (page) seen.add(node.path)
      return [...(page ? [node] : []), ...visit(node.children ?? [])]
    })
  }
  return visit(nodes)
}
export function scopeNavigation(nodes: ContentNavigationItem[], path: string, spaces: DocsSpace[]) {
  const space = activeSpace(spaces, path)
  if (space) return space.node.page === false ? (space.node.children ?? []) : [space.node]
  function prune(items: ContentNavigationItem[]): ContentNavigationItem[] {
    return items.flatMap((node) => {
      if (spaces.some((space) => space.path === node.path)) return []
      const children = node.children ? prune(node.children) : undefined
      if (node.page === false && !children?.length) return []
      return [{ ...node, children }]
    })
  }
  return prune(nodes)
}
