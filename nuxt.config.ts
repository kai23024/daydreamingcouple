// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hant' },
      title: '白日夢情侶檔｜Daydreaming Couple',
      meta: [
        { name: 'description', content: '一對情侶的旅行與美食紀錄：台灣、日本與世界各地的風景與味道。' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+TC:wght@500;700&family=Noto+Sans+TC:wght@400;500&family=Yellowtail&display=swap'
        }
      ],
      script: [
        { src: 'https://www.googletagmanager.com/gtag/js?id=G-LXTYGENVG8', async: true },
        {
          innerHTML: `window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-LXTYGENVG8');`
        }
      ]
    }
  },
  nitro: {
    prerender: {
      routes: ['/', '/taiwan', '/japan', '/global', '/photography', '/food', '/stay', '/trips', '/about'],
      crawlLinks: true
    }
  }
})