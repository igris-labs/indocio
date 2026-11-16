---
title: Package Commands
description: 'Show install commands for pnpm, npm, yarn, and Bun.'
navigation:
  icon: tabler:package
---

## Usage

Write an install command in its own shell code block. Readers can choose their package manager with the tabs above the command.

```sh
pnpm add @igrislabs/indocio
```

````md
```sh
pnpm add @igrislabs/indocio
```
````

Choose pnpm, npm, yarn, or Bun. Keep that choice across command blocks as you move between pages. Use the copy button for the selected command.

## Direct component usage

To show custom commands, provide a command for each package manager:

::package-commands{:commands='{"pnpm":"pnpm add @igrislabs/indocio","npm":"npm install @igrislabs/indocio","yarn":"yarn add @igrislabs/indocio","bun":"bun add @igrislabs/indocio"}'}
::

```md
::package-commands{:commands='{"pnpm":"pnpm add @igrislabs/indocio","npm":"npm install @igrislabs/indocio","yarn":"yarn add @igrislabs/indocio","bun":"bun add @igrislabs/indocio"}'}
::
```

`commands` is required and maps `pnpm`, `npm`, `yarn`, and `bun` to command strings. Use [Code tabs](/components/code-tabs) for source files or alternate implementations.
