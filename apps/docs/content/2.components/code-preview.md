---
title: Code Preview
description: 'Pair a rendered example with its source code.'
navigation:
  icon: tabler:eye
---

## Usage

Use the `preview` slot for the rendered example and `code` for its source.

::code-preview{title="Button example"}
#preview
:ui-button{color="primary"}[Get started]
#code

```vue
<UiButton color="primary">Get started</UiButton>
```

::

````md
::code-preview{title="Button example"}
#preview
:ui-button{color="primary"}[Get started]
#code

```vue
<UiButton color="primary">Get started</UiButton>
```

::
````

`title` defaults to `Preview`. The default slot can also supply the preview. This displays authored content; it does not execute code strings.
