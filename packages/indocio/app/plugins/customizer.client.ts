import { watch } from 'vue'

import uiConfig from '../components/ui/ui.config'
import type { PrimitiveSize } from '../components/ui/ui.types'
import { customizationCss, customizationStorageKey, readCustomization } from '../utils/customizer'

export default defineNuxtPlugin((nuxtApp) => {
  const { preferences, enabled } = useCustomizer()
  let originalSize: PrimitiveSize | null | undefined
  let sizeApplied = false
  watch(
    () => (enabled.value ? preferences.value.theme?.size : undefined),
    (size) => {
      if (size) {
        if (!sizeApplied) originalSize = uiConfig.defaults?.size
        uiConfig.defaults = { ...uiConfig.defaults, size }
        sizeApplied = true
      } else if (sizeApplied) {
        uiConfig.defaults = { ...uiConfig.defaults, size: originalSize }
        sizeApplied = false
      }
    },
  )
  useHead(() => ({
    style:
      enabled.value && preferences.value.theme
        ? [{ key: 'indocio-customizer', textContent: customizationCss(preferences.value) }]
        : [],
  }))
  nuxtApp.hook('app:mounted', () => {
    if (!enabled.value) return
    try {
      preferences.value = readCustomization(
        JSON.parse(localStorage.getItem(customizationStorageKey) ?? '{}'),
      )
    } catch {
      preferences.value = {}
    }
    watch(
      preferences,
      (value) => {
        try {
          if (Object.keys(value).length)
            localStorage.setItem(customizationStorageKey, JSON.stringify(value))
          else localStorage.removeItem(customizationStorageKey)
        } catch {
          /* Browser storage may be unavailable; live preview still works. */
        }
      },
      { deep: true },
    )
  })
})
