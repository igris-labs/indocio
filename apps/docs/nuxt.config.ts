export default defineNuxtConfig({
  extends: ['@igrislabs/indocio'],
  modules: ['nuxt-gtag'],
  css: ['~/assets/main.css'],
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      failOnError: true,
    },
  },
})
