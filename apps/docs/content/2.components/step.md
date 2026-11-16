---
title: Step
description: 'Add a titled item to a numbered Steps sequence.'
navigation:
  icon: tabler:circle-number-1
---

## Usage

Place each `step` inside [Steps](/components/steps). The parent supplies automatic numbering.

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
