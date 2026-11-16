import { computed, toValue } from 'vue'
import type { MaybeRefOrGetter } from 'vue'

import { resolveDocsConfig } from '../utils/docs-config'

export async function useDocsSettings(
  page?: MaybeRefOrGetter<{ docs?: unknown; stem?: string } | null | undefined>,
) {
  const { brand } = useIndocio()
  const { enabled, preferences } = useCustomizer()
  const context = await useDocsContext()
  const settings = computed(() =>
    resolveDocsConfig(
      { value: brand.docs, file: 'app.config.ts > indocio.docs' },
      {
        value: context.space.value?.docs,
        file: `${context.space.value?.path}/.navigation.yml > docs`,
      },
      { value: toValue(page)?.docs, file: `content/${toValue(page)?.stem ?? 'page'}.md > docs` },
      { value: enabled.value ? preferences.value.docs : undefined, file: 'Customizer preferences' },
    ),
  )
  return { ...context, settings }
}
