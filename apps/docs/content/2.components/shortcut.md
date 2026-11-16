---
title: Shortcut
description: 'Render keyboard shortcut keys in Markdown.'
navigation:
  icon: tabler:keyboard
---

## Usage

Use :shortcut{:keys='["⌘", "K"]'} to open documentation search on macOS.

```md
:shortcut{:keys='["⌘", "K"]'}
```

## Props

| Prop   | Type       | Default  |
| ------ | ---------- | -------- |
| `keys` | `string[]` | Required |

Pass key labels in display order. Standard Markdown `<kbd>` rendering also remains available.
