export default defineAppConfig({
  indocio: {
    name: 'Indocio',
    customizer: { enabled: true },
    header: {
      links: [
        {
          label: 'Documentation',
          children: [
            {
              label: 'Introduction',
              to: '/getting-started/introduction',
              description: 'Meet Indocio and its documentation foundation.',
              icon: 'tabler:book',
            },
            {
              label: 'Configuration',
              to: '/getting-started/configuration',
              description: 'Configure content, identity, and translations.',
              icon: 'tabler:settings',
            },
            {
              label: 'Workspace',
              to: '/getting-started/workspace',
              description: 'Develop the documentation app and reusable layer.',
              icon: 'tabler:folders',
            },
          ],
        },
        {
          label: 'Markdown components',
          children: [
            {
              label: 'Callouts',
              to: '/components/callout',
              description: 'Notes, tips, warnings, and cautions in Markdown.',
              icon: 'tabler:info-circle',
            },
            {
              label: 'Code tabs',
              to: '/components/code-tabs',
              description: 'Group related files and code examples in Markdown.',
              icon: 'tabler:code',
            },
          ],
        },
        { label: 'Nuxt Content', to: 'https://content.nuxt.com' },
      ],
    },
    description: 'The documentation system for Nuxt, built on IPEX and Akaza UI.',
  },
})
