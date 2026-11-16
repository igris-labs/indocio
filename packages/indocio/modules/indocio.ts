import { resolve } from 'node:path'

import { defineNuxtModule, installModule } from '@nuxt/kit'

import { defaultLocales } from '../app/utils/indocio'
import type { IndocioOptions } from '../app/utils/indocio'

export default defineNuxtModule<IndocioOptions>({
  meta: { name: 'indocio', configKey: 'indocio' },
  defaults: { i18n: false },
  async setup(options, nuxt) {
    const enabled = options.i18n !== false
    const localeOptions = typeof options.i18n === 'object' ? options.i18n : undefined
    const locales = enabled ? (localeOptions?.locales ?? defaultLocales) : []
    const defaultLocale = localeOptions?.defaultLocale ?? locales[0]?.code ?? 'en'
    if (enabled && (!locales.length || !locales.some((locale) => locale.code === defaultLocale))) {
      throw new Error(
        'Indocio: i18n requires locales and a defaultLocale matching one of their codes.',
      )
    }
    if (
      locales.some((locale) => !/^[a-zA-Z][a-zA-Z0-9-]*$/.test(locale.code)) ||
      new Set(locales.map((locale) => locale.code)).size !== locales.length
    ) {
      throw new Error('Indocio: locale codes must be unique folder names such as en, cn, or fr.')
    }
    nuxt.options.runtimeConfig.public.indocio = { i18n: enabled, locales, defaultLocale }
    if (enabled) {
      // Nuxt i18n collects module-provided locales through this hook.
      nuxt.hook('i18n:registerModule', (register) => {
        register({
          langDir: resolve(nuxt.options.rootDir, 'i18n/locales'),
          locales: locales.map((locale) => ({ ...locale })),
        })
      })
      await installModule('@nuxtjs/i18n', {
        locales,
        defaultLocale,
        strategy: 'prefix',
        detectBrowserLanguage: false,
      })
    }
  },
})
