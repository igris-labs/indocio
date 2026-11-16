export interface IndocioLocale {
  code: string
  language: string
  name: string
}

export interface IndocioOptions {
  i18n:
    | boolean
    | {
        defaultLocale?: string
        locales?: IndocioLocale[]
      }
}

export const defaultLocales: IndocioLocale[] = [
  { code: 'en', language: 'en-US', name: 'English' },
  { code: 'cn', language: 'zh-CN', name: '中文' },
  { code: 'fr', language: 'fr-FR', name: 'Français' },
]

export function contentScope(path: string, locales: IndocioLocale[]) {
  const code = path.split('/')[1]
  return locales.some((locale) => locale.code === code) ? `/${code}` : ''
}

export function inContentScope(path: string, scope: string, locales: IndocioLocale[]) {
  return scope ? path.startsWith(`${scope}/`) : !contentScope(path, locales)
}
