---
title: Accordion
description: 'Group expandable Markdown panels.'
navigation:
  icon: tabler:chevron-down
---

## Usage

::accordion

:::accordion-item{title="Can I override a component?" value="override"}
Yes. Add the identically named component in your app's `components/docs/` directory.
:::

:::accordion-item{title="Does Markdown need imports?" value="imports"}
No. Documentation authoring components are registered globally.
:::

::

```md
::accordion{type="single"}

:::accordion-item{title="Can I override a component?" value="override"}
Yes. Add the identically named component in your app.
:::

::
```

`type` is `single` by default. Use `multiple` to allow several open items. Each item requires a `title`; `value` defaults to its title and must be unique.

## Accordion Item

Each `accordion-item` belongs inside `accordion`. The default slot contains the expandable Markdown.

### Props

| Prop    | Type     | Default   |
| ------- | -------- | --------- |
| `title` | `string` | Required  |
| `value` | `string` | The title |

Values must be unique within the group. The default slot contains the expandable Markdown.
