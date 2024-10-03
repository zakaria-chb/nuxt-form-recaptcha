// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2024-04-03',
  modules: ['@nuxtjs/tailwindcss', '@nuxt/icon'],

  runtimeConfig: {
    MAILHOST: process.env.MAILHOST,
    MAILPORT: process.env.MAILPORT,
    MAILUSER: process.env.MAILUSER,
    MAILPASSWORD: process.env.MAILPASSWORD,
    CONTACTMAIL: process.env.CONTACTMAIL,
    GOOGLESECRETKEY: process.env.GOOGLESECRETKEY,
    public: {
      GOOGLEKEYSITE: process.env.GOOGLEKEYSITE,
    },
  },

  app: {
    head: {
      script: [
        {
          src: "https://www.google.com/recaptcha/api.js",
          async: true,
          defer: true,
        },
      ]
    }
  }

})