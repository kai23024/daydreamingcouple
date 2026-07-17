# 白日夢情侶檔 (Daydreaming Couple)

A travel & food blog built with **Vue 3 + Nuxt 4**, inspired by [daydreamingcouple.com](https://daydreamingcouple.com/). Statically generated and deployed to **Firebase Hosting**.

- **GitHub repo**: https://github.com/kai23024/daydreamingcouple
- **Live site**: https://daydreamingcouple-1707b.web.app/
- **Firebase project**: `daydreamingcouple-1707b`

## Stack

- [Nuxt 4](https://nuxt.com/)
- [Tailwind CSS](https://tailwindcss.com/) via `@nuxtjs/tailwindcss`
- Static site generation (`nuxi generate`) for Firebase Hosting

## Setting up on a new device

These are the tools you need installed before working on this project from a new computer.

### 1. Install prerequisites

| Tool | Purpose | Install |
|---|---|---|
| [Node.js](https://nodejs.org/) (LTS) | runs the project, includes `npm` | download installer, or portable zip |
| [Git](https://git-scm.com/) | version control | download installer |
| [GitHub CLI](https://cli.github.com/) (`gh`) | push/pull without a separate credential setup | download installer, or `winget install GitHub.cli` |
| [Firebase CLI](https://firebase.google.com/docs/cli) (`firebase`) | only needed for **manual** deploys/local testing of hosting; CI/CD does not need it | `npm install -g firebase-tools` |

Verify each with `node --version`, `git --version`, `gh --version`, `firebase --version`.

### 2. Clone the repo

```bash
git clone https://github.com/kai23024/daydreamingcouple.git
cd daydreamingcouple
npm install
```

### 3. Connect GitHub (to push changes)

```bash
gh auth login --hostname github.com --git-protocol https --web
gh auth setup-git
```

This opens a browser for a one-time device login (login as `kai23024`) and configures `git` to use `gh`'s credentials automatically — no separate PAT/SSH key setup needed. After this, `git push` / `git pull` just work.

### 4. Connect Firebase (optional — only for manual deploys)

You normally **don't need this** — every push to `main` auto-deploys via GitHub Actions (see below). Only set this up if you want to preview/deploy from your local machine directly:

```bash
firebase login
firebase deploy --only hosting   # after npm run generate
```

`firebase login` opens a browser for a one-time Google account login. The project is already linked via `.firebaserc` (`daydreamingcouple-1707b`), so no `firebase use` step is needed.

## Development

```bash
npm run dev
```

## Deploy

Deployment is automated via GitHub Actions: every push to `main` runs [`.github/workflows/firebase-hosting-merge.yml`](.github/workflows/firebase-hosting-merge.yml), which builds the static site (`npm run generate`) and deploys `.output/public` to Firebase Hosting using the `FIREBASE_SERVICE_ACCOUNT_DAYDREAMINGCOUPLE_1707B` repo secret (already configured on GitHub — nothing to set up on a new device unless that key is ever rotated).

To deploy manually instead (see step 4 above for one-time Firebase login):

```bash
npm run generate       # outputs static site to .output/public
firebase deploy --only hosting
```

## Project structure

- `app/pages/` — routes: home (`index.vue`), category listing (`[slug]/index.vue`), article detail (`article/[id].vue`), about
- `app/components/` — header, footer, article card, and section layouts (`CategorySection`, `FeaturedSection`, `ScrollSection`, `BentoSection`)
- `app/data/site.ts` — categories & article content (including full article body text)
