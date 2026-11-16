---
title: Card
description: 'Link to a guide or put related Markdown in a card.'
navigation:
  icon: tabler:rectangle
---

## Usage

::card-group

:::card{title="Configure your docs" to="/getting-started/layout" icon="tabler:settings" description="Adjust article width, TOC placement, and page actions."}
:::

:::card{title="Multiple products" to="/getting-started/spaces" icon="tabler:box" description="Give each product its own documentation navigation."}
:::

::

```md
::card-group

:::card{title="Configure your docs" to="/getting-started/layout" icon="tabler:settings" description="Adjust your documentation layout."}
:::

:::card{title="Multiple products" to="/getting-started/spaces"}
Give each product its own navigation.
:::

::
```

Give each `card` a `title`. Add `description`, `icon`, or `to` as needed, and write Markdown in the default slot. Use internal links for the selected language. Omit `to` to display a card without a link. Keep links and buttons outside a linked card.

Use `card-group` to arrange cards in 1–3 columns. The default is 2 columns; readers see fewer on smaller screens.

See [Card Group](/components/card-group) to set the number of columns.
