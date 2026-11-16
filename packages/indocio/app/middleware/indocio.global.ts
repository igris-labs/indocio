export default defineNuxtRouteMiddleware((to) => {
  const config = useRuntimeConfig().public.indocio
  if (config.i18n && to.path === '/') {
    return navigateTo(
      { path: `/${config.defaultLocale}`, query: to.query, hash: to.hash },
      { redirectCode: 302 },
    )
  }
})
