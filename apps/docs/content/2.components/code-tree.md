---
title: Code Tree
description: 'Switch between source files using filename-labeled tabs.'
navigation:
  icon: tabler:files
---

## Usage

`code-tree` provides a source-file selector using filenames from code fences. Unlike `file-tree`, it displays each file's source.

::code-tree

```ts [nuxt.config.ts]
export default defineNuxtConfig({ extends: ['@igrislabs/indocio'] })
```

```ts [app/app.config.ts]
export default defineAppConfig({ indocio: { name: 'Your project' } })
```

::

````md
::code-tree

```ts [nuxt.config.ts]
export default defineNuxtConfig({ extends: ['@igrislabs/indocio'] })
```

```ts [app/app.config.ts]
export default defineAppConfig({ indocio: { name: 'Your project' } })
```

::
````

The selector supports keyboard navigation through IPEX Tabs. Filenames are labels, so duplicate filenames still receive independent internal values.
