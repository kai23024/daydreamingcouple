# 白日夢情侶檔 (Daydreaming Couple)

A travel & food blog built with **Vue 3 + Nuxt 4**, inspired by [daydreamingcouple.com](https://daydreamingcouple.com/). Statically generated and deployed to **Firebase Hosting**.

## Stack

- [Nuxt 4](https://nuxt.com/)
- [Tailwind CSS](https://tailwindcss.com/) via `@nuxtjs/tailwindcss`
- Static site generation (`nuxi generate`) for Firebase Hosting

## Development

```bash
npm install
npm run dev
```

## Build & Deploy

```bash
npm run generate       # outputs static site to .output/public
firebase deploy --only hosting
```

## Project structure

- `app/pages/` — routes (home, category listing pages, about)
- `app/components/` — header, footer, article card, category section
- `app/data/site.ts` — categories & article content
