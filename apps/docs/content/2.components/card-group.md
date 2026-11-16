---
title: Card Group
description: 'Arrange cards in a grid that fits the screen.'
navigation:
  icon: tabler:layout-grid
---

## Usage

Use a `card-group` around [Card](/components/card) components.

::card-group{:columns="2"}

:::card{title="Layout" to="/getting-started/layout" description="Adjust the reading area and navigation."}
:::

:::card{title="Configuration" to="/getting-started/configuration" description="Configure the consuming application."}
:::

::

```md
::card-group{:columns="2"}

:::card{title="Layout" to="/getting-started/layout"}
Adjust the reading area and navigation.
:::

:::card{title="Configuration" to="/getting-started/configuration"}
Configure the consuming application.
:::

::
```

## Props

| Prop      | Type             | Default |
| --------- | ---------------- | ------- |
| `columns` | `1`, `2`, or `3` | `2`     |

Pass the column count as a number, such as `:columns="3"`. Readers see fewer columns on smaller screens. Place the cards in the default slot.
