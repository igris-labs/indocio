---
title: Field Group
description: 'Group related API field descriptions in a bordered section.'
navigation:
  icon: tabler:list-details
---

## Usage

Place [Field](/components/field) components inside the default slot to describe API options. Use `UiField` to build a form.

::field-group

:::field{name="enabled" type="boolean" default-value="true"}
Whether the feature is enabled.
:::

:::field{name="width" type="string" default-value="42rem"}
The maximum reading width.
:::

::

```md
::field-group

:::field{name="enabled" type="boolean" default-value="true"}
Whether the feature is enabled.
:::

:::field{name="width" type="string" default-value="42rem"}
The maximum reading width.
:::

::
```

## Slots

Place API fields in the default slot. You do not need to pass any props to `field-group`.
