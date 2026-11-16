import { fileURLToPath } from 'node:url'

export default defineNuxtConfig({
  extends: [fileURLToPath(new URL('../../..', import.meta.url))],
  indocio: {
    i18n: {
      defaultLocale: 'en',
      locales: [
        { code: 'en', language: 'en-US', name: 'English' },
        { code: 'fr', language: 'fr-FR', name: 'Français' },
      ],
    },
  },
  devtools: { enabled: false },
  site: { url: 'https://fixture.example.com' },
})
