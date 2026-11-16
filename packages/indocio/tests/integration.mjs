import assert from 'node:assert/strict'
import { spawn } from 'node:child_process'
import { once } from 'node:events'
import { fileURLToPath } from 'node:url'

const fixture = fileURLToPath(new URL('./fixtures/localized/', import.meta.url))
const nuxt = fileURLToPath(new URL('../node_modules/nuxt/bin/nuxt.mjs', import.meta.url))
const build = spawn(process.execPath, [nuxt, 'build', fixture], { stdio: 'inherit' })
const [code] = await once(build, 'exit')
assert.equal(code, 0, 'Localized consumer must build')
const server = spawn(process.execPath, [`${fixture}.output/server/index.mjs`], {
  env: { ...process.env, PORT: '0', HOST: '127.0.0.1' },
  stdio: ['ignore', 'pipe', 'pipe'],
})
let output = ''
server.stdout.on('data', (chunk) => {
  output += chunk
})
server.stderr.on('data', (chunk) => {
  output += chunk
})
try {
  const base = await new Promise((resolve, reject) => {
    const timeout = setTimeout(
      () => reject(new Error(`Consumer server did not start: ${output}`)),
      30000,
    )
    const check = () => {
      const url = output.match(/http:\/\/127\.0\.0\.1:\d+/)?.[0]
      if (url) {
        clearTimeout(timeout)
        resolve(url)
      }
    }
    server.stdout.on('data', check)
    server.once('error', (error) => {
      clearTimeout(timeout)
      reject(error)
    })
    server.once('exit', (code) => {
      clearTimeout(timeout)
      reject(new Error(`Consumer server exited ${code}: ${output}`))
    })
  })
  const redirect = await fetch(base, { redirect: 'manual' })
  assert.equal(redirect.headers.get('location'), '/en')
  async function html(path) {
    const response = await fetch(`${base}${path}`)
    assert.equal(response.status, 200, `${path}: ${output}`)
    return response.text()
  }
  assert.match(await html('/en'), /en fixture landing/)
  const platform = await html('/en/platform/introduction')
  assert.match(platform, /Consumer footer override/)
  const sizedControl = (platform.match(/<button\b[^>]*>/g) ?? []).find((tag) =>
    tag.includes('aria-label="Fixture control"'),
  )
  assert.ok(sizedControl?.includes('h-9'), 'Public UI defaults apply during consumer SSR')
  assert.equal(
    (platform.match(/href="\/en\/platform"/g) ?? []).length,
    1,
    'Index pages appear only once in the sidebar',
  )
  assert.match(platform, /href="\/en\/platform\/introduction"/)
  assert.match(platform, /--docs-sidebar-width:260px/)
  assert.match(platform, /--docs-content-width:48rem/)
  assert.match(platform, /data-toc-position="right"/)
  assert.match(platform, /https:\/\/example.com\/edit\/en\/platform\/introduction.md/)
  const guide = await html('/en/platform/guide')
  assert.match(guide, /href="\/fr\/platform\/introduction"/)
  assert.doesNotMatch(guide, /href="\/fr\/platform\/guide"/)
  assert.match(await html('/fr/cli/introduction'), /fr cli introduction/)
  const minimal = await html('/en/platform/minimal')
  // Inspect rendered HTML, excluding the hydration payload that contains configuration defaults.
  const rendered = minimal
    .slice(minimal.indexOf('<body'))
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, '')
  for (const text of [
    'Documentation navigation',
    'On this page',
    'Copy link',
    'Edit this page',
    'Consumer footer override',
    'Search documentation',
    'Guide pages',
  ])
    assert.ok(!rendered.includes(text), `Disabled feature leaked into page: ${text}`)
  assert.match(rendered, /--docs-content-width:60rem/)
  assert.equal((await fetch(`${base}/fr/platform/guide`)).status, 404)
  process.stdout.write(
    'PASS: localized consumer, overrides, space metadata, settings precedence, disabled features, edit paths, and locale fallback.\n',
  )
} finally {
  if (server.exitCode === null && server.signalCode === null) {
    const exited = once(server, 'exit')
    server.kill('SIGTERM')
    await exited
  }
}
