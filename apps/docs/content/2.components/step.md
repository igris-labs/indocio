---
title: Step
description: 'Add a step with a title to a numbered list.'
navigation:
  icon: tabler:circle-number-1
---

## Usage

Place each `step` inside [Steps](/components/steps). You do not need to number the steps.

::steps

:::step{title="Create content"}
Add your first Markdown file to `content/`.
:::

::

```md
::steps

:::step{title="Create content"}
Add your first Markdown file to `content/`.
:::

::
```

## Props

| Prop    | Type     | Default  |
| ------- | -------- | -------- |
| `title` | `string` | Required |

The default slot accepts Markdown instructions.
