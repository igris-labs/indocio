---
title: Steps
description: 'Present an ordered sequence of documentation steps.'
navigation:
  icon: tabler:list-numbers
---

## Usage

::steps

:::step{title="Create your app"}
Start with a Nuxt application.
:::

:::step{title="Extend the layer"}
Add `@igrislabs/indocio` to the app's `extends` array.
:::

:::step{title="Write content"}
Create Markdown files inside `content/`.
:::

::

```md
::steps

:::step{title="Create your app"}
Start with a Nuxt application.
:::

:::step{title="Extend the layer"}
Add `@igrislabs/indocio` to the app's `extends` array.
:::

::
```

`step.title` is required. Steps use an ordered list and automatic numbering.

See [Step](/components/step) for individual step props.
