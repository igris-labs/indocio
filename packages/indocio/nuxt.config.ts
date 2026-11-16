import { fileURLToPath } from 'node:url'

import tailwindcss from '@tailwindcss/vite'

import { interfaceFonts, codeFonts } from './app/utils/customizer'

const resolve = (path: string) => fileURLToPath(new URL(path, import.meta.url))

export default defineNuxtConfig({
  $meta: { name: 'indocio' },
  modules: [
    '@nuxt/content',
    '@nuxt/fonts',
    '@nuxt/hints',
    '@nuxt/icon',
    '@nuxt/image',
    '@nuxtjs/color-mode',
    '@nuxtjs/seo',
    '@vueuse/nuxt',
    'akaza-ui/nuxt',
    resolve('./modules/indocio.ts'),
  ],
  components: [
    {
      path: resolve('./app/components/ui'),
      prefix: 'Ui',
      extensions: ['vue'],
      pathPrefix: false,
      global: true,
    },
    { path: resolve('./app/components/prose'), pathPrefix: false, global: true },
    { path: resolve('./app/components/content'), pathPrefix: false, global: true },
    { path: resolve('./app/components/docs'), pathPrefix: false, global: true },
    {
      extensions: ['vue'],
      path: resolve('./app/components'),
      ignore: ['ui/**', 'prose/**', 'content/**', 'docs/**'],
    },
  ],
  css: [resolve('./app/assets/main.css')],
  content: {
    renderer: { alias: { kbd: 'ProseKbd' } },
    build: { markdown: { highlight: false } },
  },
  fonts: {
    families: [...interfaceFonts, ...codeFonts]
      .filter((font) => font.id !== 'system')
      .map((font) => ({
        name: font.label,
        global: true,
        preload: false,
        weights: [400, 500, 600],
        styles: ['normal'],
      })),
  },
  colorMode: { classSuffix: '', preference: 'system', fallback: 'light' },
  icon: {
    serverBundle: { collections: ['tabler', 'lucide'] },
    clientBundle: {
      icons: [
        'tabler:adjustments-horizontal',
        'tabler:chevron-left',
        'tabler:chevron-right',
        'tabler:x',
        'tabler:device-desktop',
        'tabler:sun',
        'tabler:moon',
        'tabler:paint',
        'tabler:palette',
        'tabler:typography',
        'tabler:resize',
        'tabler:border-radius',
        'tabler:letter-case',
        'tabler:layout-sidebar',
        'tabler:eye',
        'tabler:copy',
        'tabler:code',
      ],
    },
  },
  app: { head: { link: [{ rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }] } },
  vite: { plugins: [tailwindcss()] },
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
})
