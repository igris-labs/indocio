import { computed } from 'vue'

import type { Customization } from '../utils/customizer'

export function useCustomizer() {
  const preferences = useState<Customization>('indocio-customizer', () => ({}))
  const open = useState('indocio-customizer-open', () => false)
  const config = useAppConfig()
  const enabled = computed(() => config.indocio.customizer.enabled)
  return {
    preferences,
    open,
    enabled,
    reset: () => {
      preferences.value = {}
    },
  }
}
