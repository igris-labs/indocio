# Indocio

Build a documentation site with Nuxt and Nuxt Content. Indocio provides a landing page, searchable documentation, and Markdown components, with IPEX styling and accessible Akaza UI primitives.

- Sidebar navigation generated from your content.
- Syntax highlighting, code tabs, callouts, steps, cards, and API references.
- Configurable article width, sidebar, and table of contents.
- Light and dark themes with an optional accent color.
- Translations and separate documentation spaces for multiple products.
- A live customizer with copyable theme and layout settings.

## Get started

Requires Node.js 22.19 or newer and a Nuxt 4 application.

Install Indocio in your application:

```sh
pnpm add @igrislabs/indocio
```

Extend the layer in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['@igrislabs/indocio'],
})
```

Indocio includes the Nuxt modules needed for content, styling, search, and color mode.

### Add your content

Create a `content/` directory at your project root:

```text
content/
  index.yml
  1.getting-started/
    .navigation.yml
    1.introduction.md
```

Configure your landing page in `content/index.yml`:

```yaml
title: Your project, documented.
description: Guides and reference to help you get started.
links:
  - label: Get started
    to: /getting-started/introduction
```

Name the section in `content/1.getting-started/.navigation.yml`:

```yaml
title: Getting started
```

Write your first page in `content/1.getting-started/1.introduction.md`:

```md
---
title: Introduction
description: Get to know your project.
navigation:
  icon: tabler:book
---

## Welcome

Write your documentation in Markdown.

::tip
Add examples to help readers get started.
::
```

Sidebar navigation follows Nuxt Content's page order. Numeric prefixes set an explicit order and are removed from URLs. Without prefixes, pages are sorted alphabetically.

Start your Nuxt development server:

```sh
pnpm dev
```

If your application has a starter `app/app.vue`, remove it to use Indocio's app shell, which includes page routing and the optional customizer.

## Configure your site

Set your site name, description, header links, and documentation layout in `app/app.config.ts`:

```ts
export default defineAppConfig({
  indocio: {
    name: 'Your project',
    description: 'Guides and reference for your project.',
    header: {
      links: [
        { label: 'Documentation', to: '/getting-started/introduction' },
        { label: 'GitHub', to: 'https://github.com/your-org/your-project' },
      ],
    },
    docs: {
      content: { width: '42rem' },
      toc: { position: 'right' },
    },
  },
})
```

Header links appear on both the landing page and documentation pages. Use `children` on a header item to create a dropdown.

Set `docs.toc.position` to `content` or `right`; the article stays centered on the screen. Adjust `docs.content.width` to change the reading width.

Layout settings resolve from page `docs` frontmatter, then product-space settings, then site configuration. Nested settings merge by field. Import `DocsConfig` and `DocsSettings` from `@igrislabs/indocio/types` for typed configuration.

## Write with Markdown components

Use components directly in Markdown. No imports are needed.

Callouts include `::note`, `::tip`, `::warning`, and `::caution`. Other components include tabs, steps, cards, accordions, badges, file trees, code previews, and API reference fields.

Group related code examples with code tabs:

````md
::code-tabs{label="Configuration examples"}

```ts [nuxt.config.ts]
export default defineNuxtConfig({
  extends: ['@igrislabs/indocio'],
})
```

```ts [app/app.config.ts]
export default defineAppConfig({
  indocio: { name: 'Your project' },
})
```

::
````

Filenames become tab labels. Each example keeps its syntax highlighting and copy button.

## Customize the theme

Add your colors to `app/assets/main.css`:

```css
:root {
  --accent: #0f766e;
  --accent-foreground: white;
}

.dark {
  --accent: #5eead4;
  --accent-foreground: #0a0a0a;
}
```

Register your stylesheet in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['@igrislabs/indocio'],
  css: ['~/assets/main.css'],
})
```

Use `--primary` and `--primary-foreground` for primary actions. Accent falls back to primary when no separate accent is supplied.

For a visual preview, enable the customizer in `app/app.config.ts`:

```ts
export default defineAppConfig({
  indocio: {
    customizer: { enabled: true },
  },
})
```

Preview colors, fonts, radius, sizing, layout, and visible elements. Choose **Get code** to copy snippets for your stylesheet, app configuration, Nuxt configuration, and UI defaults. Merge the snippets into your application's files to make the changes permanent.

## Translate your documentation

Enable i18n and choose your languages in `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  extends: ['@igrislabs/indocio'],
  indocio: {
    i18n: {
      defaultLocale: 'en',
      locales: [
        { code: 'en', language: 'en-US', name: 'English' },
        { code: 'fr', language: 'fr-FR', name: 'Français' },
      ],
    },
  },
})
```

Place each language's content in its own directory:

```text
content/
  en/
    index.yml
    getting-started/introduction.md
  fr/
    index.yml
    getting-started/introduction.md
```

All language routes are prefixed, including the default language. Search and navigation stay within the selected language. Missing translations return a 404.

With i18n disabled, keep your pages directly in `content/`.

## Document multiple products

Add `space: true` to each product folder's `.navigation.yml`:

```yaml
title: Platform
description: Platform guides and API reference.
icon: tabler:box
space: true
```

Each space has its own sidebar and previous/next navigation. Set `indocio.spaces.switcher` to `dropdown` or `tabs` in `app/app.config.ts` to choose the product selector style.

## Extend components

Override individual documentation components by adding a matching file to `app/components/docs/`, such as `DocsFooter.vue`.

Extension points include `DocsHeaderActions`, `DocsSidebarTop`, `DocsSidebarBottom`, `DocsPageBefore`, `DocsPageAfter`, and `DocsTocBottom`.

IPEX UI components are available with the `Ui` prefix, such as `UiButton` and `UiTabs`. Replace `app/components/BrandLogo.vue` and `public/favicon.svg` to use your own branding.

If you define a custom `content.config.ts`, retain the `docs` and `landing` collections. Import the default configuration from `@igrislabs/indocio/content` as a starting point.
