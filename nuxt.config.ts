// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: false },
  devServer: {
    port: 3003,
    host: 'localhost'
  },
  modules: ['@nuxtjs/tailwindcss', 'lucide-nuxt', '@vueuse/nuxt', '@nuxt/icon', '@nuxtjs/i18n'],
  i18n: {
    locales: [
      { code: 'en', iso: 'en-US', name: 'English' },
      { code: 'fr', iso: 'fr-FR', name: 'Français' },
      { code: 'es', iso: 'es-ES', name: 'Español' },
      { code: 'pt', iso: 'pt-PT', name: 'Português' }
    ],
    defaultLocale: 'en',
    strategy: 'no_prefix',
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',
    }
  },
  css: ['~/assets/font/stylesheet.css', '~/assets/css/main.css'],
  tailwindcss: {
    viewer: true,
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.VITE_BASE_URL || 'https://spsn-backend.onrender.com/api',
    }
  },
  app: {
    head: {
      title: 'SCPSN Member Portal',
      meta: [
        { name: 'description', content: 'Official member portal for Society for Cellular Pathology Scientists of Nigeria.' }
      ]
    }
  },
  ssr: false,
})
