import assert from 'node:assert/strict'
import { test } from 'node:test'

import {
  customizationCss,
  customizationExports,
  readCustomization,
  themePalettes,
  paletteForeground,
  interfaceFonts,
  codeFonts,
} from '../app/utils/customizer.ts'

test('customizer restores supported preferences and rejects content, invalid colors, and dimensions', () => {
  const value = {
    theme: {
      light: { accent: 'violet', secondary: 'white' },
      dark: { primary: 'black' },
      radius: 0,
      font: 'roboto',
      size: 'lg',
    },
    docs: { content: { width: '48rem' }, toc: { position: 'right' } },
    switcher: 'tabs',
  }
  assert.deepEqual(readCustomization(value), value)
  for (const invalid of [
    null,
    [],
    { title: 'Changed title' },
    { docs: { actions: { edit: { url: 'https://example.com' } } } },
    { theme: { light: { primary: 'invalid' } } },
    { theme: { radius: -1 } },
    { theme: { textSize: 500 } },
    { theme: { size: 'xxl' } },
    { docs: { content: { width: '10px; color:red' } } },
  ])
    assert.deepEqual(readCustomization(invalid), {})
})
test('old browser palettes migrate to separate schemes without discarding other settings', () => {
  const value = {
    theme: { primary: 'blue', accent: 'primary', light: { primary: 'white' }, radius: 0.5 },
    docs: { sidebar: { width: 280 } },
  }
  assert.deepEqual(readCustomization(value), {
    theme: {
      light: { primary: 'white', accent: 'primary' },
      dark: { primary: 'blue', accent: 'primary' },
      radius: 0.5,
    },
    docs: value.docs,
  })
  assert.equal(value.theme.primary, 'blue', 'Migration does not mutate input')
})
test('scheme-specific tokens and foregrounds remain independent, including black and white', () => {
  assert.equal(customizationCss({}), '')
  assert.equal(customizationCss({ theme: {} }), '')
  for (const palette of themePalettes) {
    const css = customizationCss({ theme: { light: { accent: palette.id } } })
    assert.ok(css.includes(`--accent:${palette.light}`))
    assert.ok(!css.includes('--primary:'))
    assert.ok(!css.includes(':root:root.dark'))
  }
  const css = customizationCss({
    theme: {
      light: { primary: 'white', primaryForeground: 'black', secondary: 'blue', accent: 'primary' },
      dark: {
        primary: 'black',
        primaryForeground: 'white',
        secondary: 'white',
        secondaryForeground: 'black',
        accent: 'rose',
      },
    },
  })
  assert.ok(css.includes(':root:root:not(.dark){--primary:#ffffff'))
  assert.ok(css.includes(':root:root.dark{--primary:#000000'))
  assert.ok(css.includes('--accent:var(--primary)'))
  assert.ok(css.includes('--accent:#fb7185'))
  assert.equal(paletteForeground('#ffffff'), '#000000')
  assert.equal(paletteForeground('#000000'), '#ffffff')
})
test('font and size choices generate real font stacks and targeted reading styles', () => {
  for (const font of interfaceFonts)
    assert.ok(customizationCss({ theme: { font: font.id } }).includes(`--font-sans:${font.stack}`))
  for (const font of codeFonts)
    assert.ok(customizationCss({ theme: { mono: font.id } }).includes(`--font-mono:${font.stack}`))
  const css = customizationCss({
    theme: {
      radius: 0,
      textSize: 18,
      headingSize: 40,
      codeSize: 16,
      headerHeight: 64,
      tocWidth: 240,
      tocGap: 32,
    },
  })
  for (const text of [
    '--radius:0rem',
    'font-size:18px',
    'font-size:40px',
    'font-size:16px',
    '--docs-header-height:64px',
    '--docs-toc-width:240px',
    '--docs-toc-gap:32px',
  ])
    assert.ok(css.includes(text))
})

test('file exports produce runnable configuration snippets and isolate their settings', () => {
  const value = {
    theme: { light: { accent: 'blue' as const }, size: 'lg' as const },
    docs: { content: { width: '48rem' } },
    switcher: 'tabs' as const,
  }
  const files = customizationExports(value, 'dark')
  assert.ok(files.appConfig.startsWith('export default defineAppConfig('))
  assert.ok(files.nuxtConfig.startsWith('export default defineNuxtConfig('))
  const appConfig = JSON.parse(
    files.appConfig.trim().slice('export default defineAppConfig('.length, -1),
  )
  const nuxtConfig = JSON.parse(
    files.nuxtConfig.trim().slice('export default defineNuxtConfig('.length, -1),
  )
  assert.deepEqual(appConfig, { indocio: { docs: value.docs, spaces: { switcher: 'tabs' } } })
  assert.deepEqual(nuxtConfig, { colorMode: { preference: 'dark' } })
  assert.ok(files.mainCss.includes('--accent:#2563eb;\n'))
  assert.ok(files.uiPlugin?.includes("size: 'lg'"))
  assert.ok(files.uiPlugin?.includes("from '@igrislabs/indocio/ui-config'"))
  assert.ok(!files.appConfig.includes('colorMode'))
  assert.ok(!files.nuxtConfig.includes('indocio'))
  const snapshot = JSON.parse(files.json)
  assert.equal(snapshot.css, customizationCss(value))
  assert.equal(snapshot.uiConfig.defaults.size, 'lg')
  const empty = customizationExports({}, 'system')
  assert.equal(empty.uiPlugin, undefined)
  assert.ok(empty.mainCss.startsWith('/* No theme overrides.'))
})

test('site size scales page typography and rem dimensions while keeping explicit text sizes', () => {
  const compact = customizationCss({ theme: { size: 'xs' } })
  const spacious = customizationCss({ theme: { size: 'xl' } })
  assert.ok(compact.includes(':root:root{font-size:14px}'))
  assert.ok(spacious.includes(':root:root{font-size:18px}'))
  assert.ok(compact.includes('font-size:13.125px'))
  assert.ok(spacious.includes('font-size:16.875px'))
  assert.ok(spacious.includes('font-size:36px'))
  assert.ok(spacious.includes('@media(pointer:coarse)'))
  assert.ok(compact.includes('.akaza-toggle-group-item,.akaza-number-field{min-height:44px}'))
  assert.ok(compact.includes('.akaza-number-field-decrement{min-height:44px;min-width:44px}'))
  const explicit = customizationCss({ theme: { size: 'xl', textSize: 18, headingSize: 40 } })
  assert.ok(explicit.includes('font-size:18px'))
  assert.ok(explicit.includes('font-size:40px'))
  assert.ok(!explicit.includes('font-size:16.875px'))
  const exported = customizationExports({ theme: { size: 'xl' } }, 'system').mainCss
  assert.equal(exported.replace(/\s/g, ''), spacious.replace(/\s/g, ''))
})
