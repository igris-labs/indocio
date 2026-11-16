import assert from 'node:assert/strict'
import { test } from 'node:test'

import { Fragment, h } from 'vue'

import { fileTreeNodes, validateFileTree } from '../app/utils/file-tree.ts'
import { markdownItems } from '../app/utils/markdown-items.ts'

test('Markdown groups retain nested panel nodes and require distinct values', () => {
  const first = h('div', { title: 'Nuxt', value: 'nuxt' }, 'Nested Markdown')
  const second = h('div', { title: 'Vue', value: 'vue' })
  const items = markdownItems([h(Fragment, [first, second])], 'Tabs')
  assert.deepEqual(
    items.map((item) => item.value),
    ['nuxt', 'vue'],
  )
  assert.equal(items[0]?.node, first)
  assert.throws(() => markdownItems([first, first], 'Tabs'), /unique values/)
  assert.throws(() => markdownItems([h('div', { title: ' ' })], 'Accordion'), /non-empty/)
})
test('file trees validate nested folders and reject malformed or excessive nesting', () => {
  validateFileTree([{ name: 'app', children: [{ name: 'app.vue' }] }])
  assert.throws(() => validateFileTree([{ name: '' }]), /non-empty name/)
  let children = [{ name: 'file' }]
  for (let i = 0; i < 22; i++) children = [{ name: 'folder', children }] as typeof children
  assert.throws(() => validateFileTree(children), /20 nested folders/)
})

test('file-tree view nodes keep ordering, unique keys, empty folders, and initial expansion', () => {
  const items = [
    { name: 'app', children: [{ name: 'index.md' }] },
    { name: 'content', children: [{ name: 'index.md' }] },
    { name: 'empty', children: [] },
  ]
  const original = structuredClone(items)
  const nodes = fileTreeNodes(items)
  assert.deepEqual(
    nodes.map((node) => node.name),
    ['app', 'content', 'empty'],
  )
  assert.notEqual(nodes[0]?.children?.[0]?.id, nodes[1]?.children?.[0]?.id)
  assert.equal(nodes[0]?.defaultExpanded, true)
  assert.equal(nodes[0]?.children?.[0]?.defaultExpanded, false)
  assert.deepEqual(nodes[2]?.children, [])
  assert.equal(nodes[2]?.defaultExpanded, true)
  assert.deepEqual(items, original)
  assert.throws(() => fileTreeNodes([{ name: '' }]), /non-empty name/)
})
