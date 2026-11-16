---
title: Code Tree
description: 'Choose a filename to read its source code.'
navigation:
  icon: tabler:files
---

## Usage

Wrap code blocks in `code-tree` to let readers choose which file to read. Add a filename to each block for its label.

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

Use the arrow keys to choose a file. You can use the same filename for more than one example.
