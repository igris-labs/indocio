---
title: Card Group
description: 'Arrange documentation cards in a responsive grid.'
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

| Prop      | Type | Default |
| --------- | ---- | ------- |
| `columns` | `1   | 2       | 3`  | `2` |

Use a bound numeric value such as `:columns="3"`. Smaller screens reduce the column count automatically. The default slot contains the cards.
