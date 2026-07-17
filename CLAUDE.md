# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm install         # install dependencies
npm run dev          # dev server (default http://localhost:3000)
npm run build        # SSR/Node production build
npm run generate     # static site generate -> .output/public (used for Firebase Hosting)
npm run preview      # preview a build locally
```

There is no test suite and no lint script configured. `npx nuxi typecheck` is broken in this repo (the installed `typescript`/`vue-tsc` versions are mismatched — `vue-tsc` requires an older TS export path); don't try to fix that unless asked, rely on `npm run generate` succeeding as the correctness signal instead.

## Architecture

Nuxt 4 app using the `app/` source directory convention (routes, components, etc. live under `app/`, not the project root).

- **Content model**: all article/category content is centralized in `app/data/site.ts` as plain arrays (`categories`, `articles`) with helper functions `articlesByCategory(slug)` and `categoryBySlug(slug)`. There is no CMS or backend — adding a new article or category means editing this one file.
- **Routing**: `app/pages/index.vue` is the homepage and hand-picks featured articles from 4 categories via `CategorySection`. `app/pages/[slug].vue` is a single dynamic route that renders *any* category listing page (taiwan/japan/global/photography/food/stay/trips) by looking up `slug` against `categoryBySlug` — there are no separate files per category. `app/pages/about.vue` is the only fully static page.
- **Components**: `AppHeader`/`AppFooter` (global chrome, wired into `app/app.vue`), `ArticleCard` (single article tile), `CategorySection` (title + "view all" link + grid of `ArticleCard`s, used on the homepage).
- **Images**: article/hero images are not real assets — they're generated at render time from `https://picsum.photos/seed/<seed>/...` using each article's `seed` field, so there's no image pipeline to worry about.
- **Styling**: Tailwind via `@nuxtjs/tailwindcss` (zero-config module, no custom `assets/css` entry file). `tailwind.config.ts` at the project root only extends `fontFamily` (`sans` → Noto Sans TC, `serif` → Noto Serif TC, loaded via Google Fonts `<link>` tags in `nuxt.config.ts`'s `app.head`). Traditional Chinese (`zh-Hant`) is the primary content language throughout.
- **Rendering mode**: configured for static generation — `nitro.prerender` in `nuxt.config.ts` explicitly lists all known routes (plus `crawlLinks: true` to catch anything reachable by link). If a new top-level route is added outside of `[slug].vue`'s reach, add it to that `routes` list or it won't be prerendered.

## Deployment

Static output (`.output/public` from `npm run generate`) deploys to **Firebase Hosting** (project `daydreamingcouple-1707b`, configured by `firebase.json` and `.firebaserc`). Deployment is automated: `.github/workflows/firebase-hosting-merge.yml` runs `npm ci && npm run generate` and deploys on every push to `main`, authenticating with the `FIREBASE_SERVICE_ACCOUNT_DAYDREAMINGCOUPLE_1707B` repo secret. Manual deploy (`firebase deploy --only hosting`) requires a local `firebase login`, which has been unreliable in this environment — prefer letting CI deploy.
