// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  devServer: {
    port: 3003
  },
  modules: ['@nuxtjs/tailwindcss', 'lucide-nuxt', '@vueuse/nuxt', '@nuxt/icon'],
  css: ['~/assets/font/stylesheet.css', '~/assets/css/main.css'],
  tailwindcss: {
    viewer: true,
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.VITE_BASE_URL || 'http://localhost:3000/api',
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
})
