---
title: Field
description: 'Describe an API parameter, its type, default, and required state.'
navigation:
  icon: tabler:forms
---

## Usage

`field-group` contains `field` components describing an API. These are documentation fields, separate from `Ui*` form controls.

::field-group

:::field{name="name" type="string" required}
The documentation site's public name.
:::

:::field{name="width" type="string" default-value="42rem"}
The article's maximum width.
:::

::

```md
::field-group

:::field{name="name" type="string" required}
The documentation site's public name.
:::

:::field{name="width" type="string" default-value="42rem"}
The article's maximum width.
:::

::
```

`field.name` is required. Optional props are `type`, Boolean `required`, and `default-value`; the default slot holds the description.

See [Field Group](/components/field-group) for grouping related API fields.
