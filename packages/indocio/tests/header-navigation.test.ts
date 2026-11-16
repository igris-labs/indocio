import assert from 'node:assert/strict'
import { test } from 'node:test'

import { headerLeafLinks, resolveHeaderLinks } from '../app/utils/header-navigation.ts'

test('configured links localize internal destinations and preserve external destinations', () => {
  const items = resolveHeaderLinks(
    [
      {
        label: 'Documentation',
        children: [
          { label: 'Guide', to: '/guide', description: 'Read the guide', icon: 'tabler:book' },
        ],
      },
      { label: 'Reference', to: 'https://content.nuxt.com' },
    ],
    '/fr/guide',
    (path) => (path.startsWith('/') ? `/fr${path}` : path),
    'a',
  )
  assert.equal(items[0]?.active, true)
  assert.equal(items[0]?.children?.[0]?.to, '/fr/guide')
  assert.equal(items[0]?.children?.[0]?.navigationIcon, 'tabler:book')
  assert.equal(items[0]?.children?.[0]?.description, 'Read the guide')
  assert.equal(items[1]?.to, 'https://content.nuxt.com')
  assert.equal(items[1]?.active, false)
  assert.deepEqual(
    headerLeafLinks(items).map((item) => item.label),
    ['Guide', 'Reference'],
  )
})

test('active matching respects path segments and IDs do not depend on repeated labels', () => {
  const links = [
    { label: 'Guide', to: '/guide' },
    { label: 'Guide', to: '/guides' },
    { label: 'Home', to: '/' },
  ]
  const items = resolveHeaderLinks(links, '/guide/setup', (path) => path, 'a')
  assert.deepEqual(
    items.map((item) => item.active),
    [true, false, false],
  )
  assert.equal(new Set(items.map((item) => item.value)).size, 3)
  assert.deepEqual(
    resolveHeaderLinks([], '/', (path) => path, 'a'),
    [],
  )
  assert.deepEqual(headerLeafLinks([]), [])
})

test('query strings and fragments do not prevent active route matching', () => {
  const items = resolveHeaderLinks(
    [
      { label: 'Guide', to: '/guide?version=2#install' },
      { label: 'External', to: '//example.com/guide' },
    ],
    '/guide',
    (path) => path,
    'a',
  )
  assert.equal(items[0]?.active, true)
  assert.equal(items[0]?.to, '/guide?version=2#install')
  assert.equal(items[1]?.active, false)
})
