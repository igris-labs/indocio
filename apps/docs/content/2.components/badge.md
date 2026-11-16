---
title: Badge
description: 'Display a short status label inline with Markdown.'
navigation:
  icon: tabler:badge
---

## Usage

:badge{color="accent"}[New] :badge{color="success"}[Stable]

```md
:badge{color="accent"}[New]
:badge{color="success"}[Stable]
```

## Props

| Prop    | Type                                      | Default   |
| ------- | ----------------------------------------- | --------- |
| `color` | `neutral`, `accent`, `success`, `warning` | `neutral` |

The default slot supplies the badge text.
