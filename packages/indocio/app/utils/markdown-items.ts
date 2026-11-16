import { isVNode } from 'vue'
import type { VNode } from 'vue'

export interface MarkdownItem {
  value: string
  title: string
  node: VNode
}
export function markdownItems(nodes: VNode[], component: string): MarkdownItem[] {
  const items: MarkdownItem[] = []
  function visit(node: VNode) {
    if (typeof node.props?.title === 'string') {
      const title = node.props.title.trim()
      const value = String(node.props.value ?? title)
      if (!title || !value || items.some((item) => item.value === value))
        throw new Error(`Indocio: ${component} items require non-empty titles and unique values`)
      items.push({ value, title, node })
    } else if (Array.isArray(node.children)) {
      for (const child of node.children) if (isVNode(child)) visit(child)
    }
  }
  for (const node of nodes) visit(node)
  return items
}
