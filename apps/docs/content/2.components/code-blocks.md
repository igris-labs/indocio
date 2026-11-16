---
title: Code Blocks
description: 'Show highlighted code with a filename and copy button.'
navigation:
  icon: tabler:code
---

## Usage

Write a fenced code block with a language and optional filename. Use the standard Markdown syntax below to show highlighted code with a copy button.

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['@igrislabs/indocio'],
})
```

````md
```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['@igrislabs/indocio'],
})
```
````

## Direct component usage

::docs-code{code="const project = 'Indocio'" language="ts" filename="example.ts"}
::

```md
::docs-code{code="const project = 'Indocio'" language="ts" filename="example.ts"}
::
```

| Prop       | Type      | Default                                     |
| ---------- | --------- | ------------------------------------------- |
| `code`     | `string`  | Required                                    |
| `filename` | `string`  | Unset                                       |
| `language` | `string`  | Inferred from the filename, otherwise `vue` |
| `header`   | `boolean` | `true`                                      |

Use [Code tabs](/components/code-tabs) to group examples, [Code Tree](/components/code-tree) to browse source files, and [Package Commands](/components/package-commands) for install commands.

## Markdown and MDC highlighting

Use `md`, `markdown`, or `mdc` for Markdown examples. Highlight headings, emphasis, links, component names, attributes, slots, and YAML props in your examples. Add code fences inside the example to highlight each code block in its own language. You can include filenames and language aliases such as `typescript`.

````md
## Example

::callout{title="Before you start" color="info"}
Write your documentation in Markdown.
::

```ts [example.ts]
export const project = 'Indocio'
```
````
