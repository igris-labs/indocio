import assert from 'node:assert/strict'
import { test } from 'node:test'

import { contentScope, defaultLocales, inContentScope } from '../app/utils/indocio.ts'

test('content scope matches complete locale segments', () => {
  assert.equal(contentScope('/en/guide', defaultLocales), '/en')
  assert.equal(contentScope('/en', defaultLocales), '/en')
  assert.equal(contentScope('/english/guide', defaultLocales), '')
  assert.equal(contentScope('/guide', []), '')
})

test('navigation cannot cross language boundaries', () => {
  assert.equal(inContentScope('/fr/guide', '/en', defaultLocales), false)
  assert.equal(inContentScope('/en/guide', '/en', defaultLocales), true)
  assert.equal(inContentScope('/enough/guide', '/en', defaultLocales), false)
  assert.equal(inContentScope('/guide', '', defaultLocales), true)
  assert.equal(inContentScope('/fr/guide', '', defaultLocales), false)
})
