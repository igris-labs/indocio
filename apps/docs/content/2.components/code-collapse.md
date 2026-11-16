---
title: Code Collapse
description: 'Keep longer code examples behind an expandable heading.'
navigation:
  icon: tabler:code-minus
---

## Usage

::code-collapse{title="Show Nuxt configuration"}

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['@igrislabs/indocio'],
})
```

::

````md
::code-collapse{title="Show Nuxt configuration"}

```ts [nuxt.config.ts]
export default defineNuxtConfig({ extends: ['@igrislabs/indocio'] })
```

::
````

`title` defaults to `Show code`. The code remains copyable when expanded.
