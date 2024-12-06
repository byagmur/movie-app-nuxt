// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      src: 'https://code.iconify.design/3/3.0.0/iconify.min.js'
    },
  },

  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  modules: ['@pinia/nuxt', '@nuxt/ui'],


  imports: {
    dirs: [
      'core/*.ts',
      'components/*.vue',
      'stores/**/*.ts', // stores klasöründeki tüm dosyaları dahil etmek için bu şekilde yapılandırıyoruz
    ],
  },

  runtimeConfig: {
    public: {
      tmdbApiKey: process.env.NUXT_TMDB_API_KEY, // .env dosyasından API anahtarını okur
      NUXT_TMDB_TOKEN: process.env.NUXT_TMDB_TOKEN,
      baseUrl: process.env.NUXT_TMDB_BASE_URL
    },
  },

})
