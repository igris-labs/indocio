---
title: Package Commands
description: 'Render synchronized package-manager tabs for installation commands.'
navigation:
  icon: tabler:package
---

## Usage

Write a standalone shell fence containing a supported install command. Indocio renders the package-manager selector automatically.

```sh
pnpm add @igrislabs/indocio
```

````md
```sh
pnpm add @igrislabs/indocio
```
````

The selector offers pnpm, npm, yarn, and Bun. Package-manager selections are shared across command blocks during navigation. Each panel includes a copy button.

## Direct component usage

When authoring custom commands, provide every package manager explicitly:

::package-commands{:commands='{"pnpm":"pnpm add @igrislabs/indocio","npm":"npm install @igrislabs/indocio","yarn":"yarn add @igrislabs/indocio","bun":"bun add @igrislabs/indocio"}'}
::

```md
::package-commands{:commands='{"pnpm":"pnpm add @igrislabs/indocio","npm":"npm install @igrislabs/indocio","yarn":"yarn add @igrislabs/indocio","bun":"bun add @igrislabs/indocio"}'}
::
```

`commands` is required and maps `pnpm`, `npm`, `yarn`, and `bun` to command strings. Use [Code tabs](/components/code-tabs) for source files or alternate implementations.
