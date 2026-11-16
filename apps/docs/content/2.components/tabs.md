---
title: Tabs
description: 'Group Markdown in tabs and share the selection between tab groups.'
navigation:
  icon: tabler:layout-navbar
---

## Usage

Use `tabs` and `tab-item` for explanations, commands, or mixed Markdown. Give each item a title and a unique `value`. Use matching values across groups to keep their selections in sync.

::tabs{label="Framework instructions" sync="framework"}

:::tab-item{title="Nuxt" value="nuxt"}
Add Indocio to your Nuxt app through `extends`.
:::

:::tab-item{title="Vue" value="vue"}
Use the IPEX `Ui*` components in your Vue examples.
:::

::

```md
::tabs{label="Framework instructions" sync="framework"}

:::tab-item{title="Nuxt" value="nuxt"}
Add Indocio to your Nuxt app through `extends`.
:::

:::tab-item{title="Vue" value="vue"}
Use the IPEX `Ui*` components in your Vue examples.
:::

::
```

These two groups share the `framework` key. Change either group to update both.

::tabs{label="Framework details" sync="framework"}

:::tab-item{title="Nuxt" value="nuxt"}
Nuxt supplies routing, server rendering, and component registration.
:::

:::tab-item{title="Vue" value="vue"}
Vue supplies the component model used by IPEX and Akaza UI.
:::

::

| Prop            | Default    | Purpose                                                               |
| --------------- | ---------- | --------------------------------------------------------------------- |
| `label`         | `Examples` | Accessible tab-group label                                            |
| `default-value` | First item | Initial item value                                                    |
| `sync`          | Unset      | Share the selected value with groups using this key during navigation |

Omit `sync` to keep a tab group separate. For package-manager commands, readers keep their selection across code blocks. Use [Code tabs](/components/code-tabs) to label code examples with filenames.

## Tab Item

Each `tab-item` must be a direct child of `tabs`. The default slot contains the panel’s Markdown.

### Props

| Prop    | Type     | Default                |
| ------- | -------- | ---------------------- |
| `title` | `string` | Required               |
| `value` | `string` | Derived from the title |

Write the panel's Markdown in the default slot. Choose a unique `value` for each item. Use matching values across groups that share a `sync` key.
