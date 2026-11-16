---
title: Code tabs
description: Group related code examples with accessible tabs, syntax highlighting, and a copy button for each example.
navigation:
  icon: tabler:file-code
---

## Multiple files

Wrap fenced code blocks in `::code-tabs`. Add filenames to use them as tab labels. Readers can copy the code from each tab.

::code-tabs{label="Layer configuration files"}

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['@igrislabs/indocio'],
})
```

```ts [app.config.ts]
export default defineAppConfig({
  indocio: {
    name: 'My documentation',
  },
})
```

```yaml [content/index.yml]
title: Documentation for your project
description: Everything you need to get started.
links:
  - label: Introduction
    to: /getting-started/introduction
```

::

## Markdown syntax

````md
::code-tabs{label="Layer configuration files"}

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['@igrislabs/indocio'],
})
```

```ts [app.config.ts]
export default defineAppConfig({
  indocio: { name: 'My documentation' },
})
```

::
````

## Language labels

Omit filenames to use language names as labels. Set `label` to describe the group for screen readers. Keep fenced blocks as direct children of the component.

::code-tabs{label="JavaScript and TypeScript examples"}

```ts
const project: string = 'Indocio'
```

```js
const project = 'Indocio'
```

::

## Keyboard navigation

Focus a tab and use the left or right arrow keys to switch examples. Screen reader users read the active panel. Press Tab to reach its copy button and copy the original code.

## Package commands

Write an install command in its own shell code block to show package-manager tabs. Use code tabs for related files or different approaches.

```sh
pnpm add @igrislabs/indocio
```

See [Package Commands](/components/package-commands) for installation commands and [Tabs](/components/tabs) for mixed Markdown panels.
