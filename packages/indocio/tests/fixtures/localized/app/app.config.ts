export default defineAppConfig({
  indocio: {
    name: 'Consumer fixture',
    docs: {
      content: { width: '48rem' },
      sidebar: { width: 260, collapsible: true },
      actions: { edit: { url: 'https://example.com/edit/{path}' } },
    },
    spaces: { switcher: 'tabs' },
    header: { links: [{ label: 'Consumer guide', to: '/platform/introduction' }] },
  },
})
