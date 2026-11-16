---
title: Type Table
description: 'List API properties, types, defaults, and descriptions in a table.'
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

Set `name` and `type` for each entry. Add `description`, `required`, and `default` as needed. On smaller screens, readers can focus the table and scroll sideways.
