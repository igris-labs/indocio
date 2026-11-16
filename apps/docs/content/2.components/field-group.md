---
title: Field Group
description: 'Group related API field descriptions in a bordered section.'
navigation:
  icon: tabler:list-details
---

## Usage

Place [Field](/components/field) components inside the default slot. This is an API documentation component; use `UiField` for an interactive form field.

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

The default slot contains API fields. `field-group` has no configuration props.
