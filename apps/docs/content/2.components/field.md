---
title: Field
description: 'Document an API parameter, its type, and its default value.'
navigation:
  icon: tabler:forms
---

## Usage

Place `field` components inside `field-group` to document API parameters. Use `Ui*` form controls to build forms.

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

Set `name` for each field. Add `type` and `default-value` as needed. Add the Boolean `required` prop to mark a required parameter. Write the description in the default slot.

See [Field Group](/components/field-group) for grouping related API fields.
