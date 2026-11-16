---
title: Card
description: 'Link to another guide or group supporting Markdown in a card.'
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

`card` accepts `title` (required), `description`, `icon`, `to`, and a default Markdown slot. Internal destinations follow the current locale. Omit `to` for a non-interactive card. Avoid links or buttons inside a linked card. `card-group` accepts numeric `columns` from 1–3, defaulting to 2; smaller screens reduce columns automatically.

See [Card Group](/components/card-group) for responsive grid configuration.
