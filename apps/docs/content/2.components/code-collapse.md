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

Use `title` to name the heading, or keep the default `Show code`. Readers can expand the example and copy its code.
