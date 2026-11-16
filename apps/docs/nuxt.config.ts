export default defineNuxtConfig({
  extends: ['@igrislabs/indocio'],
  css: ['~/assets/main.css'],
  nitro: {
    prerender: {
      routes: ['/'],
      crawlLinks: true,
      failOnError: true,
    },
  },
})
