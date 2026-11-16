---
title: Code tabs
description: Group related code examples with accessible tabs, syntax highlighting, and a copy button for each example.
navigation:
  icon: tabler:file-code
---

## Multiple files

Wrap fenced code blocks in `::code-tabs`. Filenames become tab labels. Each tab keeps its own code and copy button.

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

Focus a tab and use the left or right arrow keys to switch examples. Only the active code panel is exposed to assistive technology. Tab to its copy button to copy the original code, without formatting markup.

## Package commands

Standalone install-command fences already provide package-manager tabs. Use code tabs for related files or alternate implementations.

```sh
pnpm add @igrislabs/indocio
```

See [Package Commands](/components/package-commands) for installation commands and [Tabs](/components/tabs) for mixed Markdown panels.
