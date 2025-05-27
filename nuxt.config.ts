// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-security', '@nuxt/ui'],
  css: ['~/assets/css/main.css'],
  ssr: false,
  security: {
    enabled: true,
    basicAuth: {
      enabled: true,
      include: ['/api/telemetry'],
      name: process.env.BASIC_AUTH_USER || '',
      pass: process.env.BASIC_AUTH_PASSWORD || '',
      message: 'Authentication required!',
    }
  },
  ui: {
    colorMode: false
  },
  vite: {
    server: {
      allowedHosts: true,
    }
  }
})