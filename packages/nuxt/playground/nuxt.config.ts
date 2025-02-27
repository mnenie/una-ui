export default defineNuxtConfig({
  modules: [
    '../src/module',
  ],

  experimental: {
    componentIslands: true,
  },

  nitro: {
    routeRules: {
      '/': {
        redirect: '/dashboards/default',
      },
      '/dashboards': {
        redirect: '/dashboards/default',
      },
      '/components': {
        redirect: '/components/accordion',
      },
    },
  },

  compatibilityDate: '2024-07-17',
})
