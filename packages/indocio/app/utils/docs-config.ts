import { z } from 'zod'

const width = z
  .string()
  .regex(
    /^(?:[1-9]\d*(?:\.\d+)?|0?\.\d+)(?:px|rem|em|ch|vw|%)$/,
    'Use a positive CSS length, such as 42rem or 800px',
  )
  .refine((value) => parseFloat(value) > 0, 'Width must be greater than zero')
export const docsSettingsSchema = z
  .object({
    content: z.object({ width: width.optional() }).strict().optional(),
    sidebar: z
      .object({
        enabled: z.boolean().optional(),
        width: z.number().min(180).max(480).optional(),
        collapsible: z.boolean().optional(),
      })
      .strict()
      .optional(),
    toc: z
      .object({
        enabled: z.boolean().optional(),
        position: z.enum(['content', 'right']).optional(),
        depth: z.number().int().min(2).max(6).optional(),
      })
      .strict()
      .optional(),
    breadcrumbs: z.boolean().optional(),
    footer: z.boolean().optional(),
    navigation: z.boolean().optional(),
    search: z.boolean().optional(),
    actions: z
      .object({
        copyLink: z.boolean().optional(),
        edit: z
          .union([
            z.literal(false),
            z.object({ url: z.string().url(), label: z.string().optional() }).strict(),
          ])
          .optional(),
      })
      .strict()
      .optional(),
  })
  .strict()
export type DocsSettings = z.infer<typeof docsSettingsSchema>
export interface DocsConfig {
  content: { width: string }
  sidebar: { enabled: boolean; width: number; collapsible: boolean }
  toc: { enabled: boolean; position: 'content' | 'right'; depth: number }
  breadcrumbs: boolean
  footer: boolean
  navigation: boolean
  search: boolean
  actions: { copyLink: boolean; edit?: false | { url: string; label?: string } }
}
export const defaultDocsConfig: DocsConfig = {
  content: { width: '42rem' },
  sidebar: { enabled: true, width: 240, collapsible: false },
  toc: { enabled: true, position: 'content', depth: 3 },
  breadcrumbs: true,
  footer: true,
  navigation: true,
  search: true,
  actions: { copyLink: true },
}
export function resolveDocsConfig(...sources: { value: unknown; file: string }[]): DocsConfig {
  let resolved = defaultDocsConfig
  for (const { value, file } of sources) {
    if (value == null) continue
    const result = docsSettingsSchema.safeParse(value)
    if (!result.success)
      throw new Error(
        `Indocio: ${file}: ${result.error.issues.map((issue) => `${issue.path.join('.') || 'docs'}: ${issue.message}`).join('; ')}`,
      )
    const settings = result.data
    resolved = {
      ...resolved,
      ...settings,
      content: { ...resolved.content, ...settings.content },
      sidebar: { ...resolved.sidebar, ...settings.sidebar },
      toc: { ...resolved.toc, ...settings.toc },
      actions: { ...resolved.actions, ...settings.actions },
    }
  }
  return resolved
}
