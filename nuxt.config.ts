// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss', '@nuxtjs/sitemap'],
  tailwindcss: {
    cssPath: '~/assets/css/tailwind.css'
  },
  site: {
    url: 'https://daydreamingcouple.com',
    name: '白日夢情侶檔｜Daydreaming Couple',
    defaultLocale: 'zh-Hant'
  },
  app: {
    head: {
      htmlAttrs: { lang: 'zh-Hant' },
      title: '白日夢情侶檔｜Daydreaming Couple',
      meta: [
        { name: 'description', content: '一對情侶的旅行與美食紀錄：台灣、日本與世界各地的風景與味道。' },
        { property: 'og:site_name', content: '白日夢情侶檔｜Daydreaming Couple' },
        { property: 'og:locale', content: 'zh_TW' },
        { property: 'og:type', content: 'website' },
        { property: 'og:title', content: '白日夢情侶檔｜Daydreaming Couple' },
        { property: 'og:description', content: '一對情侶的旅行與美食紀錄：台灣、日本與世界各地的風景與味道。' },
        { property: 'og:image', content: 'https://daydreamingcouple.com/images/home/hero.jpg' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: '白日夢情侶檔｜Daydreaming Couple' },
        { name: 'twitter:description', content: '一對情侶的旅行與美食紀錄：台灣、日本與世界各地的風景與味道。' },
        { name: 'twitter:image', content: 'https://daydreamingcouple.com/images/home/hero.jpg' }
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