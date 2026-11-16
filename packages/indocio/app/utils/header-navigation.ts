import type { NavigationMenuItem } from 'akaza-ui'

export interface HeaderLink {
  label: string
  to?: string
  description?: string
  icon?: string
  children?: HeaderLink[]
}

export function resolveHeaderLinks(
  links: HeaderLink[],
  routePath: string,
  localPath: (path: string) => string,
  linkComponent: NavigationMenuItem['as'],
  parent = 'header',
): NavigationMenuItem[] {
  return links.map((item, index) => {
    const value = `${parent}-${index}`
    const to = item.to ? localPath(item.to) : undefined
    const path = to?.split(/[?#]/)[0]
    const children = item.children?.length
      ? resolveHeaderLinks(item.children, routePath, localPath, linkComponent, value)
      : undefined
    const active = Boolean(
      children?.some((child) => child.active) ||
      (path?.startsWith('/') &&
        !path.startsWith('//') &&
        (routePath === path || (path !== '/' && routePath.startsWith(`${path}/`)))),
    )
    return {
      value,
      label: item.label,
      description: item.description,
      navigationIcon: item.icon,
      slot: children ? undefined : 'header-link',
      to,
      as: to ? linkComponent : undefined,
      active,
      children,
    }
  })
}

export function headerLeafLinks(items: NavigationMenuItem[]): NavigationMenuItem[] {
  return items.flatMap((item) => (item.children?.length ? headerLeafLinks(item.children) : [item]))
}
