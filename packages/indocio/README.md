# Indocio

Build your documentation site with Nuxt and Nuxt Content. Use a landing page, search, and Markdown components styled with IPEX. Akaza UI provides keyboard controls and accessibility support.

- Organize the sidebar with your content folders and filenames.
- Syntax highlighting, code tabs, callouts, steps, cards, and API references.
- Choose your article width, sidebar settings, and table of contents position.
- Light and dark themes with an optional accent color.
- Translations and separate documentation spaces for multiple products.
- Preview theme and layout changes, then copy the settings into your app.

## Get started

Use Node.js 22.19 or newer with a Nuxt 4 app.

Install Indocio in your application:

```sh
pnpm add @igrislabs/indocio
```

Add Indocio to `extends` in `nuxt.config.ts`:

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

Use folders and filenames to organize your sidebar. Add numeric prefixes such as `1.introduction.md` to set the reading order. Nuxt Content leaves these numbers out of URLs. Use unnumbered filenames for alphabetical order.

Start your Nuxt development server:

```sh
pnpm dev
```

Remove the starter `app/app.vue` to use Indocio's page layout and optional customizer.

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

Set `docs` in a page's frontmatter to change its layout. Page settings take priority over product settings, which take priority over site settings. Change one field without replacing the rest. Import `DocsConfig` and `DocsSettings` from `@igrislabs/indocio/types` for TypeScript types.

## Write with Markdown components

Use Markdown components without importing them.

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

Add a filename to use it as the tab label. Readers can copy each highlighted example.

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

Use `--primary` and `--primary-foreground` for primary actions. Leave accent unset to use your primary color for accents too.

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

Open translated pages through language-prefixed URLs, such as `/en/getting-started/introduction`. The default language uses a prefix too. Readers search and browse within their selected language.

Keep your pages in `content/` if you do not enable i18n.

## Document multiple products

Add `space: true` to each product folder's `.navigation.yml`:

```yaml
title: Platform
description: Platform guides and API reference.
icon: tabler:box
space: true
```

Create a documentation space for each product to give it a separate sidebar and previous/next links. Set `indocio.spaces.switcher` to `dropdown` or `tabs` in `app/app.config.ts` to choose the product selector style.

Add `index.md` inside each product folder for its home page: `content/inrux/index.md` opens at `/inrux`, and `content/instruo/index.md` opens at `/instruo`. Write a product introduction and add cards linking to its guides. Readers keep the product sidebar on these pages.

## Extend components

Override individual documentation components by adding a matching file to `app/components/docs/`, such as `DocsFooter.vue`.

Extension points include `DocsHeaderActions`, `DocsSidebarTop`, `DocsSidebarBottom`, `DocsPageBefore`, `DocsPageAfter`, and `DocsTocBottom`.

IPEX UI components are available with the `Ui` prefix, such as `UiButton` and `UiTabs`. Replace `app/components/BrandLogo.vue` and `public/favicon.svg` to use your own branding.

Keep the `docs` and `landing` collections when you add your own `content.config.ts`. Import `@igrislabs/indocio/content` to start with the default configuration.
