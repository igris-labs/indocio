---
title: Code Preview
description: 'Show a working example beside its source code.'
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

Use `title` to name the example, or keep the default `Preview`. You can write the example in the `preview` slot or the default slot. Put the source code in the `code` slot.
