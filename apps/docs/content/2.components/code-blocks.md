---
title: Code Blocks
description: 'Render syntax-highlighted source with a filename and copy action.'
navigation:
  icon: tabler:code
---

## Usage

Use a fenced code block with a language and optional filename. The Markdown renderer supplies `DocsCode` automatically.

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

Use `md`, `markdown`, or `mdc` for Markdown examples. Headings, emphasis, links, MDC component names and attributes, named slots, and YAML props receive syntax colors. Code fences inside the example keep their own language highlighting, including filenames and aliases such as `typescript`.

````md
## Example

::callout{title="Before you start" color="info"}
Write your documentation in Markdown.
::

```ts [example.ts]
export const project = 'Indocio'
```
````
