import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  activeSpace,
  firstPage,
  documentationSpaces,
  scopeNavigation,
  spacePages,
} from '../app/utils/spaces.ts'
const tree = [
  { title: 'Guide', path: '/en/guide' },
  {
    title: 'Products',
    path: '/en/products',
    page: false,
    children: [
      {
        title: 'Platform',
        path: '/en/products/platform',
        space: true,
        page: false,
        redirect: 'start',
        children: [
          { title: 'Start', path: '/en/products/platform/start' },
          { title: 'API', path: '/en/products/platform/api' },
        ],
      },
      {
        title: 'CLI',
        path: '/en/products/cli',
        space: true,
        page: false,
        children: [{ title: 'Install', path: '/en/products/cli/install' }],
      },
    ],
  },
]
test('spaces use folder metadata and preserve locale-prefixed destinations', () => {
  const spaces = documentationSpaces(tree)
  assert.deepEqual(
    spaces.map((space) => space.to),
    ['/en/products/platform/start', '/en/products/cli/install'],
  )
  assert.equal(activeSpace(spaces, '/en/products/platform/api')?.title, 'Platform')
  assert.equal(activeSpace(spaces, '/en/products/platform-extra/api'), undefined)
  assert.equal(activeSpace(spaces, '/fr/products/platform/api'), undefined)
  assert.deepEqual(
    spacePages(scopeNavigation(tree, '/en/products/platform/api', spaces)).map((page) => page.path),
    ['/en/products/platform/start', '/en/products/platform/api'],
  )
  assert.deepEqual(
    spacePages(scopeNavigation(tree, '/en/guide', spaces)).map((page) => page.path),
    ['/en/guide'],
  )
})
test('space destinations cannot escape their root; duplicate index entries appear once', () => {
  for (const redirect of ['/another-product/start', '../cli/install'])
    assert.throws(
      () => documentationSpaces([{ title: 'Platform', path: '/platform', space: true, redirect }]),
      /redirect must stay inside/,
    )
  assert.deepEqual(
    spacePages([
      { title: 'Index', path: '/platform', children: [{ title: 'Index', path: '/platform' }] },
    ]).map((page) => page.path),
    ['/platform'],
  )
  assert.deepEqual(documentationSpaces([]), [])
})

test('scoping and page traversal preserve Nuxt Content navigation order', () => {
  const navigation = [
    { title: 'Zulu', path: '/zulu' },
    {
      title: 'Guides',
      path: '/guides',
      page: false,
      children: [
        { title: 'Second', path: '/guides/second' },
        { title: 'First', path: '/guides/first' },
      ],
    },
    { title: 'Alpha', path: '/alpha' },
    {
      title: 'SDK',
      path: '/sdk',
      page: false,
      space: true,
      children: [
        { title: 'Zulu', path: '/sdk/zulu' },
        { title: 'Alpha', path: '/sdk/alpha' },
      ],
    },
  ]
  const spaces = documentationSpaces(navigation)
  assert.deepEqual(
    spacePages(scopeNavigation(navigation, '/zulu', spaces)).map((page) => page.path),
    ['/zulu', '/guides/second', '/guides/first', '/alpha'],
  )
  assert.deepEqual(
    spacePages(scopeNavigation(navigation, '/sdk/alpha', spaces)).map((page) => page.path),
    ['/sdk/zulu', '/sdk/alpha'],
  )
  assert.equal(firstPage(navigation), '/zulu')
  assert.equal(spaces[0]?.to, '/sdk/zulu')
})
