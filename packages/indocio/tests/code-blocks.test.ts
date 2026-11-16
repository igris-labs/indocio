import assert from 'node:assert/strict'
import { test } from 'node:test'

import { Fragment, h } from 'vue'

import { codeBlocks } from '../app/utils/code-blocks.ts'

test('code tabs preserve fence order, filenames, language, and exact copy text', () => {
  const blocks = codeBlocks([
    h(Fragment, [
      h('pre', { code: 'const answer = 42\n', language: 'ts', filename: 'answer.ts' }),
      h('div', [h('pre', { code: 'export default {}\n', language: 'js' })]),
    ]),
    h('p', 'Ignored prose'),
    h('pre', { code: '', language: 'text' }),
  ])
  assert.deepEqual(blocks, [
    {
      value: 'code-0',
      label: 'answer.ts',
      code: 'const answer = 42\n',
      language: 'ts',
      filename: 'answer.ts',
    },
    {
      value: 'code-1',
      label: 'JavaScript',
      code: 'export default {}\n',
      language: 'js',
      filename: undefined,
    },
    { value: 'code-2', label: 'text', code: '', language: 'text', filename: undefined },
  ])
})

test('duplicate filenames have unique tab values and missing metadata stays readable', () => {
  assert.deepEqual(
    codeBlocks([
      h('pre', { code: 'first', filename: 'index.ts' }),
      h('pre', { code: 'second', filename: 'index.ts' }),
    ]).map(({ value, label }) => ({ value, label })),
    [
      { value: 'code-0', label: 'index.ts' },
      { value: 'code-1', label: 'index.ts' },
    ],
  )
  assert.equal(codeBlocks([h('pre', { code: 'plain' })])[0]?.label, 'text')
  assert.deepEqual(codeBlocks([]), [])
})
