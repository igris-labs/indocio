---
title: Accordion
description: 'Group expandable Markdown panels.'
navigation:
  icon: tabler:chevron-down
---

## Usage

::accordion

:::accordion-item{title="Can I override a component?" value="override"}
Yes. Add a component with the same filename in your app's `app/components/docs/` directory.
:::

:::accordion-item{title="Does Markdown need imports?" value="imports"}
Use the Markdown components without imports.
:::

::

```md
::accordion{type="single"}

:::accordion-item{title="Can I override a component?" value="override"}
Yes. Add the identically named component in your app.
:::

::
```

Use the default `single` type to open one item at a time, or `multiple` to open several. Give each item a `title` and a unique `value`. Omit `value` to use the title.

## Accordion Item

Place `accordion-item` inside `accordion`. Write its Markdown between the opening and closing markers.

### Props

| Prop    | Type     | Default   |
| ------- | -------- | --------- |
| `title` | `string` | Required  |
| `value` | `string` | The title |

Choose a different `value` for each item. Write the panel content in the default slot.
