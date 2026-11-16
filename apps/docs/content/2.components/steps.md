---
title: Steps
description: 'Guide readers through numbered steps.'
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

Give each step a `title`. You do not need to number the steps.

See [Step](/components/step) for individual step props.
