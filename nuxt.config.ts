// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['nuxt-security'],
  security: {
    enabled: true,
    basicAuth: {
      enabled: true,
      include: ['/api/telemetry'],
      name: process.env.BASIC_AUTH_USER || '',
      pass: process.env.BASIC_AUTH_PASSWORD || '',
      message: 'Authentication required!',
    }
  }
})
