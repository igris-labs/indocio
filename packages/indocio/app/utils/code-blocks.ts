import { isVNode } from 'vue'
import type { VNode } from 'vue'

export interface CodeBlock {
  value: string
  label: string
  code: string
  language: string
  filename?: string
}

const languages: Record<string, string> = {
  ts: 'TypeScript',
  js: 'JavaScript',
  vue: 'Vue',
  json: 'JSON',
  yaml: 'YAML',
  yml: 'YAML',
  css: 'CSS',
  html: 'HTML',
  sh: 'Terminal',
  bash: 'Terminal',
  shell: 'Terminal',
}

export function codeBlocks(nodes: VNode[]): CodeBlock[] {
  const blocks: CodeBlock[] = []
  function visit(node: VNode) {
    if (typeof node.props?.code === 'string') {
      const language = typeof node.props.language === 'string' ? node.props.language : 'text'
      const filename = typeof node.props.filename === 'string' ? node.props.filename : undefined
      blocks.push({
        value: `code-${blocks.length}`,
        label: filename || languages[language] || language,
        code: node.props.code,
        language,
        filename,
      })
    } else if (Array.isArray(node.children)) {
      for (const child of node.children) if (isVNode(child)) visit(child)
    }
  }
  for (const node of nodes) visit(node)
  return blocks
}
