---
title: Shortcut
description: 'Show keyboard shortcuts in Markdown.'
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

Pass key labels in the order you want readers to see them. You can also use `<kbd>` in Markdown.
