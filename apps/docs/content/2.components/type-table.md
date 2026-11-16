---
title: Type Table
description: 'Present API properties, types, defaults, and descriptions in a table.'
navigation:
  icon: tabler:table
---

## Usage

::type-table
---

fields:

- name: enabled
  type: boolean
  description: Whether the table of contents is visible.
  default: 'true'
- name: position
  type: "'content' | 'right'"
  description: Where the desktop table of contents sits.
  default: content
  required: false

---

::

```md
::type-table
---

fields:

- name: enabled
  type: boolean
  description: Whether the feature is enabled.
  default: 'true'
  required: false

---

::
```

Each entry requires `name` and `type`. Optional properties are `description`, `required`, and `default`. The table scrolls horizontally and can receive keyboard focus.
