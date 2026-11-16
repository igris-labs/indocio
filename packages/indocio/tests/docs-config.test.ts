import assert from 'node:assert/strict'
import { test } from 'node:test'

import { defaultDocsConfig, resolveDocsConfig } from '../app/utils/docs-config.ts'

test('page settings override space and site settings without removing sibling defaults', () => {
  const value = resolveDocsConfig(
    {
      file: 'app.config.ts',
      value: {
        content: { width: '48rem' },
        sidebar: { width: 260 },
        toc: { position: 'right' },
        actions: { edit: { url: 'https://github.com/example/docs/edit/main/content/{path}' } },
      },
    },
    { file: 'platform/.navigation.yml', value: { content: { width: '46rem' }, toc: { depth: 4 } } },
    {
      file: 'platform/api.md',
      value: { content: { width: '60rem' }, actions: { copyLink: false } },
    },
  )
  assert.deepEqual(value.content, { width: '60rem' })
  assert.deepEqual(value.toc, { enabled: true, position: 'right', depth: 4 })
  assert.equal(value.sidebar.width, 260)
  assert.equal(value.actions.copyLink, false)
  assert.ok(value.actions.edit)
  assert.equal(defaultDocsConfig.content.width, '42rem')
  assert.deepEqual(resolveDocsConfig({ file: 'page.md', value: undefined }), defaultDocsConfig)
  assert.deepEqual(resolveDocsConfig({ file: 'page.md', value: null }), defaultDocsConfig)
})
test('invalid layout options identify their source and field', () => {
  for (const value of [
    { content: { width: '-20rem' } },
    { content: { width: '0rem' } },
    { content: { width: '0.0rem' } },
    { sidebar: { width: 40 } },
    { toc: { position: 'left' } },
    { toc: { depth: 7 } },
    { sidebaar: true },
  ]) {
    assert.throws(() => resolveDocsConfig({ file: 'content/api.md', value }), /content\/api.md:/)
  }
})

test('pages can disable inherited edit links', () => {
  const config = resolveDocsConfig(
    { file: 'app.config.ts', value: { actions: { edit: { url: 'https://example.com/{path}' } } } },
    { file: 'page.md', value: { actions: { edit: false } } },
  )
  assert.equal(config.actions.edit, false)
  assert.equal(config.actions.copyLink, true)
})
