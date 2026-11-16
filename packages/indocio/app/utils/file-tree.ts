export interface FileTreeItem {
  name: string
  children?: FileTreeItem[]
}
export function validateFileTree(items: FileTreeItem[], depth = 0): void {
  if (depth > 20) throw new Error('Indocio: FileTree supports at most 20 nested folders')
  if (!Array.isArray(items)) throw new TypeError('Indocio: FileTree items must be an array')
  for (const item of items) {
    if (!item || typeof item.name !== 'string' || !item.name.trim())
      throw new Error('Indocio: FileTree items require a non-empty name')
    if (item.children !== undefined) validateFileTree(item.children, depth + 1)
  }
}

export interface FileTreeNode extends Omit<FileTreeItem, 'children'> {
  id: string
  defaultExpanded: boolean
  children?: FileTreeNode[]
}

export function fileTreeNodes(items: FileTreeItem[]): FileTreeNode[] {
  validateFileTree(items)
  function nodes(items: FileTreeItem[], parent: string): FileTreeNode[] {
    return items.map((item, index) => {
      const id = `${parent}/${index}`
      return {
        id,
        name: item.name,
        defaultExpanded: item.children !== undefined,
        ...(item.children !== undefined ? { children: nodes(item.children, id) } : {}),
      }
    })
  }
  return nodes(items, '')
}
