// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  compatibilityDate: '2024-04-03',
  devtools: { enabled: true },
  sourcemap: true,
  modules: ['@vueuse/nuxt', '@nuxt/ui', '@pinia/nuxt'],
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      baseUrl: process.env.BASE_URL,
      apiBase: process.env.API_BASE
    }
  },
  generate: {
    routes: [
      '/operacion/1',
      '/operacion/2',
      '/operacion/3',
      '/operacion/4',
      '/operacion/5',
      '/tracking/74112',
      '/transferencias',
      '/perfil'
    ]
  },
  routeRules: {
    '/perfil/**': { appMiddleware: ['auth'] },
    '/wizard/**': { appMiddleware: ['auth'] }
  },
  app: {
    head: {
      link: [
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;700&display=swap'
        }
      ]
    }
  },
  nitro: {
    preset: 'node'
  },
  ui: {
    colorMode: false
  }
})
