import assert from 'node:assert/strict'
import { test } from 'node:test'

import { fitSelectPopup } from '../app/utils/select-popup.ts'

test('select menus flip into available scroll-container space and cap long lists', () => {
  const space = {
    above: 300,
    below: 80,
    preferred: 'bottom' as const,
    scrollHeight: 500,
    chrome: 10,
    maxHeight: 256,
  }
  assert.deepEqual(fitSelectPopup(space), { side: 'top', height: 256 })
  assert.deepEqual(fitSelectPopup({ ...space, above: 150 }), { side: 'top', height: 140 })
  assert.deepEqual(fitSelectPopup({ ...space, above: 45, below: 70 }), {
    side: 'bottom',
    height: 60,
  })
})
test('short lists preserve the requested side and tiny spaces never yield negative heights', () => {
  const space = {
    above: 300,
    below: 80,
    preferred: 'bottom' as const,
    scrollHeight: 30,
    chrome: 10,
    maxHeight: 256,
  }
  assert.deepEqual(fitSelectPopup(space), { side: 'bottom', height: 70 })
  assert.deepEqual(fitSelectPopup({ ...space, preferred: 'top' }), { side: 'top', height: 256 })
  assert.deepEqual(fitSelectPopup({ ...space, above: 0, below: 5 }), { side: 'bottom', height: 0 })
})
