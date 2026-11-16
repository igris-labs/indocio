import assert from 'node:assert/strict'
import { test } from 'node:test'

import { navigationPages } from '../app/utils/navigation.ts'

test('landing navigation skips section labels and retains nested pages in order', () => {
  const pages = navigationPages([
    {
      title: 'Getting started',
      path: '/getting-started',
      page: false,
      children: [
        { title: 'Introduction', path: '/getting-started/introduction' },
        {
          title: 'Guides',
          path: '/getting-started/guides',
          page: false,
          children: [{ title: 'Workspace', path: '/getting-started/guides/workspace' }],
        },
      ],
    },
    { title: 'Reference', path: '/reference' },
  ])
  assert.deepEqual(
    pages.map((page) => page.path),
    ['/getting-started/introduction', '/getting-started/guides/workspace', '/reference'],
  )
  assert.deepEqual(navigationPages([]), [])
})
