import assert from 'node:assert/strict'
import { test } from 'node:test'

import { highlightCode } from '../app/utils/highlight.ts'

function text(html: string) {
  return html
    .replace(/<[^>]*>/g, '')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&amp;/g, '&')
}

test('Markdown highlighting recognizes headings, MDC components, slots, and YAML without changing source', async () => {
  const source =
    '## Example\n::callout{title="Before you start" color="info"}\nBody\n::\n#preview\n:badge{color="accent"}[New]\n---\nlabel: Project\nitems:\n  - name: app.vue\n---'
  const html = await highlightCode(source, 'markdown')
  assert.equal(text(html), source)
  assert.match(html, /shj-syn-kwd[^>]*>## Example/)
  assert.match(html, /shj-syn-kwd[^>]*>::callout/)
  assert.match(html, /shj-syn-var[^>]*>title/)
  assert.match(html, /shj-syn-func[^>]*>#preview/)
  assert.match(html, /shj-syn-str/)
  assert.equal(await highlightCode(source, 'mdc'), html)
})

test('Markdown code fences highlight embedded languages with filenames, aliases, and nested fences', async () => {
  for (const source of [
    '```typescript [example.ts]\nexport const count = 42\n```',
    '~~~ts\nexport const count = 42\n~~~',
    '```ts [example.ts]\r\nexport const count = 42\r\n```',
    '````md\n```ts [example.ts]\nexport const count = 42\n```\n````',
  ]) {
    const html = await highlightCode(source, 'md')
    assert.equal(text(html), source)
    assert.match(html, /shj-syn-control[^>]*>export/)
    assert.match(html, /shj-syn-num[^>]*>42/)
  }
})

test('Markdown source remains escaped HTML, including MDC attributes and embedded markup', async () => {
  const source = '::callout{title="<img src=x onerror=alert(1)>"}\n<script>alert(1)</script>\n::'
  const html = await highlightCode(source, 'md')
  assert.equal(text(html), source)
  assert.ok(!html.includes('<img'))
  assert.ok(!html.includes('<script>'))
})
