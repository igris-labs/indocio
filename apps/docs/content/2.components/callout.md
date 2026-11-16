---
title: Callouts
description: 'Highlight a note, tip, or warning with a title and color.'
navigation:
  icon: tabler:info-circle
---

## Usage

::callout{title="Before you start" color="info"}
Create a Nuxt application before extending the Indocio layer.
::

```md
::callout{title="Before you start" color="info"}
Create a Nuxt application before extending the Indocio layer.
::
```

Choose a color with `callout`, or use `note`, `tip`, `warning`, or `caution` for a preset. Write Markdown inside the callout.

## Note

::note{title="Note"}
Keep your content in your app.
::

```md
::note{title="Note"}
Your content lives in the consuming application.
::
```

## Tip

::tip{title="Tip"}
Keep setup instructions close to the example they explain.
::

```md
::tip{title="Tip"}
Keep setup instructions close to the example they explain.
::
```

## Warning

::warning{title="Warning"}
Review your configuration before publishing the site.
::

```md
::warning{title="Warning"}
Review your configuration before publishing the site.
::
```

## Caution

::caution{title="Caution"}
Back up content before deleting files.
::

```md
::caution{title="Caution"}
Back up content before deleting files.
::
```

## Props

| Component | Color                                                       | Props                        |
| --------- | ----------------------------------------------------------- | ---------------------------- |
| `callout` | `info` by default; also `success`, `warning`, `destructive` | Optional `title` and `color` |
| `note`    | `info`                                                      | Optional `title`             |
| `tip`     | `success`                                                   | Optional `title`             |
| `warning` | `warning`                                                   | Optional `title`             |
| `caution` | `destructive`                                               | Optional `title`             |

Use a title to summarize the message. Keep supporting detail in the Markdown body.
