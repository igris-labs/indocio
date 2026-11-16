---
title: File Tree
description: 'Show files and folders that readers can expand with a mouse or keyboard.'
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

Give each item a `name`. Add `children` to create a folder. Use `label` to name the tree, or keep the default `Project structure`. You can nest folders up to 20 levels deep.

## Interaction

Folders start expanded. Click a folder row or its chevron to collapse or expand it. Scan names at the same folder level in one column. Check the icons for each file type.

Read filenames in a monospace font. Hover over a long name to read it in full. Use the mouse or the keyboard controls below to move through the tree.

| Key         | Action                                    |
| ----------- | ----------------------------------------- |
| Up / Down   | Move between visible entries              |
| Right       | Expand a folder or move into its children |
| Left        | Collapse a folder or move to its parent   |
| Home / End  | Move to the first or last visible entry   |
| Type a name | Focus a matching entry                    |

For selectable source files with code panels, use [Code Tree](/components/code-tree).
