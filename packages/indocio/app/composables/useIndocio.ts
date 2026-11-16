import { computed } from 'vue'

import { contentScope } from '../utils/indocio'

export function useIndocio() {
  const route = useRoute()
  const config = useRuntimeConfig().public.indocio
  const brand = useAppConfig().indocio
  const scope = computed(() => contentScope(route.path, config.locales))
  const home = computed(() => scope.value || '/')
  const localPath = (path: string) =>
    path.startsWith('/') && !path.startsWith('//') && !contentScope(path, config.locales)
      ? `${scope.value}${path === '/' ? '' : path}` || '/'
      : path
  return { config, brand, scope, home, localPath }
}
