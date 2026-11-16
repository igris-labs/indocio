import { z } from 'zod'

import { docsSettingsSchema } from './docs-config.ts'

export const themePalettes = [
  { id: 'black', label: 'Black', light: '#000000', dark: '#000000' },
  { id: 'white', label: 'White', light: '#ffffff', dark: '#ffffff' },
  { id: 'neutral', label: 'Neutral', light: '#262626', dark: '#f5f5f5' },
  { id: 'teal', label: 'Teal', light: '#0f766e', dark: '#2dd4bf' },
  { id: 'blue', label: 'Blue', light: '#2563eb', dark: '#60a5fa' },
  { id: 'violet', label: 'Violet', light: '#7c3aed', dark: '#c4b5fd' },
  { id: 'rose', label: 'Rose', light: '#be123c', dark: '#fb7185' },
  { id: 'amber', label: 'Amber', light: '#b45309', dark: '#fbbf24' },
  { id: 'orange', label: 'Orange', light: '#c2410c', dark: '#fb923c' },
  { id: 'green', label: 'Green', light: '#15803d', dark: '#4ade80' },
] as const
export const interfaceFonts = [
  { id: 'inter', label: 'Inter', stack: 'Inter, system-ui, sans-serif' },
  { id: 'roboto', label: 'Roboto', stack: 'Roboto, system-ui, sans-serif' },
  { id: 'open-sans', label: 'Open Sans', stack: '"Open Sans", system-ui, sans-serif' },
  { id: 'lato', label: 'Lato', stack: 'Lato, system-ui, sans-serif' },
  { id: 'dm-sans', label: 'DM Sans', stack: '"DM Sans", system-ui, sans-serif' },
  { id: 'source-sans-3', label: 'Source Sans 3', stack: '"Source Sans 3", system-ui, sans-serif' },
  { id: 'system', label: 'System sans', stack: 'system-ui, sans-serif' },
] as const
export const codeFonts = [
  { id: 'jetbrains', label: 'JetBrains Mono', stack: '"JetBrains Mono", ui-monospace, monospace' },
  { id: 'fira-code', label: 'Fira Code', stack: '"Fira Code", ui-monospace, monospace' },
  {
    id: 'ibm-plex-mono',
    label: 'IBM Plex Mono',
    stack: '"IBM Plex Mono", ui-monospace, monospace',
  },
  {
    id: 'source-code-pro',
    label: 'Source Code Pro',
    stack: '"Source Code Pro", ui-monospace, monospace',
  },
  { id: 'system', label: 'System mono', stack: 'ui-monospace, monospace' },
] as const
export const siteSizes = [
  { id: 'xs', label: 'XS · Compact', scale: 0.875 },
  { id: 'sm', label: 'S · Small', scale: 0.9375 },
  { id: 'md', label: 'M · Default', scale: 1 },
  { id: 'lg', label: 'L · Comfortable', scale: 1.0625 },
  { id: 'xl', label: 'XL · Spacious', scale: 1.125 },
] as const
const palette = z.enum([
  'black',
  'white',
  'neutral',
  'teal',
  'blue',
  'violet',
  'rose',
  'amber',
  'orange',
  'green',
])
const colors = z
  .object({
    primary: palette.optional(),
    secondary: palette.optional(),
    accent: z.union([palette, z.literal('primary')]).optional(),
    primaryForeground: palette.optional(),
    secondaryForeground: palette.optional(),
    accentForeground: palette.optional(),
  })
  .strict()
export type ThemeColors = z.infer<typeof colors>
export type ThemeMode = 'light' | 'dark'
export function paletteForeground(hex: string) {
  const channels = hex
    .slice(1)
    .match(/../g)!
    .map((value) => {
      const channel = parseInt(value, 16) / 255
      return channel <= 0.04045 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4
    })
  return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722 > 0.179
    ? '#000000'
    : '#ffffff'
}
export const customizationSchema = z
  .object({
    theme: z
      .object({
        light: colors.optional(),
        dark: colors.optional(),
        secondary: palette.optional(),
        size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
        textSize: z.number().min(12).max(22).optional(),
        headingSize: z.number().min(24).max(48).optional(),
        codeSize: z.number().min(11).max(20).optional(),
        primary: palette.optional(),
        accent: z.union([palette, z.literal('primary')]).optional(),
        radius: z.number().min(0).max(1.5).optional(),
        font: z
          .enum(['inter', 'roboto', 'open-sans', 'lato', 'dm-sans', 'source-sans-3', 'system'])
          .optional(),
        mono: z
          .enum(['jetbrains', 'fira-code', 'ibm-plex-mono', 'source-code-pro', 'system'])
          .optional(),
        headerHeight: z.number().min(48).max(88).optional(),
        tocWidth: z.number().min(160).max(320).optional(),
        tocGap: z.number().min(16).max(128).optional(),
      })
      .strict()
      .optional(),
    docs: docsSettingsSchema
      .extend({ actions: z.object({ copyLink: z.boolean().optional() }).strict().optional() })
      .optional(),
    switcher: z.enum(['dropdown', 'tabs']).optional(),
  })
  .strict()
export type Customization = z.infer<typeof customizationSchema>
export const customizationStorageKey = 'indocio:customizer:v1'
export function readCustomization(value: unknown): Customization {
  const result = customizationSchema.safeParse(value)
  if (!result.success) return {}
  const preferences = result.data
  const theme = preferences.theme
  if (theme && (theme.primary || theme.secondary || theme.accent)) {
    const legacy = {
      ...(theme.primary ? { primary: theme.primary } : {}),
      ...(theme.secondary ? { secondary: theme.secondary } : {}),
      ...(theme.accent ? { accent: theme.accent } : {}),
    }
    theme.light = { ...legacy, ...theme.light }
    theme.dark = { ...legacy, ...theme.dark }
    delete theme.primary
    delete theme.secondary
    delete theme.accent
  }
  return preferences
}
export function customizationCss(value: Customization): string {
  const theme = value.theme
  if (!theme) return ''
  const light: string[] = []
  const dark: string[] = []
  const layout: string[] = []
  for (const mode of ['light', 'dark'] as const) {
    const rules = mode === 'light' ? light : dark
    const values = {
      primary: theme.primary,
      secondary: theme.secondary,
      accent: theme.accent,
      ...theme[mode],
    }
    for (const token of ['primary', 'secondary', 'accent'] as const) {
      const color = values[token]
      if (color === 'primary')
        rules.push('--accent:var(--primary)', '--accent-foreground:var(--primary-foreground)')
      else if (color) {
        const choice = themePalettes.find((item) => item.id === color)!
        rules.push(
          `--${token}:${choice[mode]}`,
          `--${token}-foreground:${paletteForeground(choice[mode])}`,
        )
      }
      const foreground = theme[mode]?.[`${token}Foreground`]
      if (foreground)
        rules.push(
          `--${token}-foreground:${themePalettes.find((item) => item.id === foreground)![mode]}`,
        )
    }
  }
  const common: string[] = []
  const scale = siteSizes.find((size) => size.id === theme.size)?.scale ?? 1
  if (theme.size) common.push(`font-size:${16 * scale}px`)
  if (theme.radius !== undefined) common.push(`--radius:${theme.radius}rem`)
  if (theme.font)
    common.push(`--font-sans:${interfaceFonts.find((font) => font.id === theme.font)!.stack}`)
  if (theme.mono)
    common.push(`--font-mono:${codeFonts.find((font) => font.id === theme.mono)!.stack}`)
  const typography: string[] = []
  if (theme.textSize !== undefined || theme.size)
    typography.push(
      `html:root [data-testid="docs-prose"],html:root .docs-article>header>p{font-size:${theme.textSize ?? 15 * scale}px}`,
    )
  if (theme.headingSize !== undefined || theme.size)
    typography.push(
      `html:root .docs-article>header h1{font-size:${theme.headingSize ?? 32 * scale}px;line-height:1.25}`,
    )
  if (theme.codeSize !== undefined || theme.size)
    typography.push(`html:root .syntax-highlight pre{font-size:${theme.codeSize ?? 13 * scale}px}`)
  if (theme.size)
    typography.push(
      'html:root .akaza-sidebar-root .akaza-navigation-menu-link,html:root .akaza-sidebar-root .akaza-navigation-menu-trigger{font-size:0.8125rem}',
      '@media(pointer:coarse){.akaza-button,.akaza-select-trigger,.akaza-navigation-menu-link,.akaza-navigation-menu-trigger,.akaza-toggle-group-item,.akaza-number-field{min-height:44px}.akaza-button[aria-label],.akaza-toggle-group-item,.akaza-number-field-increment,.akaza-number-field-decrement{min-height:44px;min-width:44px}}',
    )
  for (const [key, token] of [
    ['headerHeight', 'header-height'],
    ['tocWidth', 'toc-width'],
    ['tocGap', 'toc-gap'],
  ] as const) {
    if (theme[key] !== undefined) layout.push(`--docs-${token}:${theme[key]}px`)
  }
  return [
    common.length ? `:root:root{${common.join(';')}}` : '',
    light.length ? `:root:root:not(.dark){${light.join(';')}}` : '',
    dark.length ? `:root:root.dark{${dark.join(';')}}` : '',
    ...typography,
    layout.length ? `html:root .docs-layout{${layout.join(';')}}` : '',
  ].join('')
}

function readableCss(css: string) {
  let depth = 0
  return `${css
    .replace(/([{};])/g, (token) => {
      if (token === '{') {
        depth++
        return ` {\n${'  '.repeat(depth)}`
      }
      if (token === '}') {
        depth--
        return `\n${'  '.repeat(depth)}}\n${'  '.repeat(depth)}`
      }
      return `;\n${'  '.repeat(depth)}`
    })
    .trimEnd()}\n`
}

export function customizationExports(value: Customization, colorMode: string) {
  const indocio = {
    docs: value.docs ?? {},
    ...(value.switcher ? { spaces: { switcher: value.switcher } } : {}),
  }
  const css = customizationCss(value)
  const size = value.theme?.size
  return {
    mainCss: css ? readableCss(css) : '/* No theme overrides. Keep your existing site styles. */\n',
    appConfig: `export default defineAppConfig(${JSON.stringify({ indocio }, null, 2)})\n`,
    nuxtConfig: `export default defineNuxtConfig(${JSON.stringify({ colorMode: { preference: colorMode } }, null, 2)})\n`,
    uiPlugin: size
      ? `import uiConfig from '@igrislabs/indocio/ui-config'\n\nuiConfig.defaults = { ...uiConfig.defaults, size: '${size}' }\n\nexport default defineNuxtPlugin(() => {})\n`
      : undefined,
    json: JSON.stringify(
      {
        appConfig: { indocio },
        css,
        colorMode,
        ...(size ? { uiConfig: { defaults: { size } } } : {}),
      },
      null,
      2,
    ),
  }
}
