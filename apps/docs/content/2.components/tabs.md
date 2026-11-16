---
title: Tabs
description: 'Group related Markdown with accessible, optionally synchronized tabs.'
navigation:
  icon: tabler:layout-navbar
---

## Usage

Use `tabs` and `tab-item` for explanations, commands, or mixed Markdown. Each item requires a title. Provide a stable `value` when synchronizing tabs; values must be unique within a group.

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

Groups without `sync` are independent. Package-manager code blocks automatically share their package-manager selection. Use [Code tabs](/components/code-tabs) for filename-labeled code fences.

## Tab Item

Each `tab-item` must be a direct child of `tabs`. The default slot contains the panel’s Markdown.

### Props

| Prop    | Type     | Default                |
| ------- | -------- | ---------------------- |
| `title` | `string` | Required               |
| `value` | `string` | Derived from the title |

The default slot holds the panel's Markdown. Values must be unique within the group. Supply stable values when using the parent's `sync` prop.
