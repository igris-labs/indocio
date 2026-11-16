import { defaultDocsConfig } from './utils/docs-config'
import type { HeaderLink } from './utils/header-navigation'

export default defineAppConfig({
  indocio: {
    name: 'Indocio',
    header: { links: [] as HeaderLink[] },
    docs: defaultDocsConfig,
    customizer: { enabled: false },
    spaces: { switcher: 'dropdown' as 'dropdown' | 'tabs' },
    description: 'Documentation built with Nuxt Content, IPEX, and Akaza UI.',
  },
})
