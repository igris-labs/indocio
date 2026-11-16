---
title: Callouts
description: 'Highlight supporting information with a title and semantic color.'
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

Use `callout` to choose a semantic color explicitly, or use one of the variants below for a fixed color. All callouts accept Markdown in their default slot.

## Note

::note{title="Note"}
Your content lives in the consuming application.
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
