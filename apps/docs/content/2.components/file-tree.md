---
title: File Tree
description: 'Explore project structure with file-type icons, collapsible folders, and keyboard navigation.'
navigation:
  icon: tabler:folders
---

## Usage

::file-tree
---

label: Your documentation app
items:

- name: app
  children:
  - name: app.config.ts
  - name: components
    children:
    - name: docs
      children:
      - name: DocsFooter.vue
- name: content
  children:
  - name: index.yml
  - name: introduction.md
- name: nuxt.config.ts

---

::

```md
::file-tree
---

label: Project structure
items:

- name: app
  children:
  - name: app.config.ts
- name: nuxt.config.ts

---

::
```

Each item requires a non-empty `name`. An item with `children` is an expandable folder. `label` defaults to `Project structure`. Trees support up to 20 folder levels.

## Interaction

Folders start expanded. Click a folder row or its chevron to collapse or expand it. Files and folders at the same depth share a label column; file icons reflect the filename extension.

The tree uses the IPEX Tree component and follows its control sizing, focus, hover, and touch-target recipes. Filename labels use monospace, and long names show their full text on hover.

| Key         | Action                                    |
| ----------- | ----------------------------------------- |
| Up / Down   | Move between visible entries              |
| Right       | Expand a folder or move into its children |
| Left        | Collapse a folder or move to its parent   |
| Home / End  | Move to the first or last visible entry   |
| Type a name | Focus a matching entry                    |

For selectable source files with code panels, use [Code Tree](/components/code-tree).
