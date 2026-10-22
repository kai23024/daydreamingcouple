<script setup lang="ts">
import { articles, articlesByCategory, articleMetaDescription, categoryBySlug } from '~/data/site'

const route = useRoute()
const articleId = route.params.id as string

const article = articles.find(a => a.id === articleId)
const category = article ? categoryBySlug(article.category) : undefined

if (!article || !category) {
  throw createError({ statusCode: 404, statusMessage: '找不到這篇文章' })
}

const more = articlesByCategory(article.category).filter(a => a.id !== article.id).slice(0, 3)

/** Table-of-contents entries derived from the article's own level-1 (大標) heading blocks only — no separate data to maintain. */
const headings = computed(() => {
  const result: { index: number; text: string }[] = []
  article!.body.forEach((block, index) => {
    if (typeof block !== 'string' && 'heading' in block && (block.level ?? 1) === 1) {
      result.push({ index, text: block.heading })
    }
  })
  return result
})

const tocOpen = ref(false)

/**
 * Highlights whichever TOC entry the reader is currently scrolled to. Rather than trusting
 * IntersectionObserver's own isIntersecting/entry-ordering (which can batch several headings
 * into one callback out of document order during a fast scroll), every callback just recomputes
 * from scratch: the active heading is the last one (in document order) whose top has scrolled
 * past a fixed line near the top of the viewport.
 */
const activeHeadingIndex = ref<number | null>(null)
let headingObserver: IntersectionObserver | null = null
const DETECTION_LINE_PX = 100

function recomputeActiveHeading() {
  let current: number | null = null
  for (const h of headings.value) {
    const el = document.getElementById(`heading-${h.index}`)
    if (el && el.getBoundingClientRect().top - DETECTION_LINE_PX <= 0) {
      current = h.index
    }
  }
  if (current !== null) activeHeadingIndex.value = current
}

onMounted(() => {
  if (!headings.value.length) return
  headingObserver = new IntersectionObserver(recomputeActiveHeading, {
    rootMargin: `-${DETECTION_LINE_PX}px 0px -50% 0px`,
    threshold: 0
  })
  for (const h of headings.value) {
    const el = document.getElementById(`heading-${h.index}`)
    if (el) headingObserver.observe(el)
  }
})

onUnmounted(() => {
  headingObserver?.disconnect()
})

function relatedArticle(id: string) {
  return articles.find(a => a.id === id)
}

/** Descriptive alt text for a body image block: nearest preceding heading (icon stripped) + location, falling back to the article title. */
function imageAlt(blockIndex: number): string {
  for (let i = blockIndex - 1; i >= 0; i--) {
    const b = article!.body[i]
    if (typeof b !== 'string' && 'heading' in b) {
      const clean = b.heading.replace(/^[📌💡]\s*/, '')
      return article!.location ? `${article!.location}・${clean}` : clean
    }
  }
  return article!.location ? `${article!.location}・${article!.title}` : article!.title
}

const siteUrl = 'https://daydreamingcouple.com'
const pageUrl = `${siteUrl}/article/${article.id}`
const description = articleMetaDescription(article)
const imageUrl = article.hero
  ? `${siteUrl}${article.hero}`
  : `https://picsum.photos/seed/${article.seed}/1600/800`

useSeoMeta({
  title: `${article.title}｜白日夢情侶檔`,
  description,
  ogTitle: article.title,
  ogDescription: description,
  ogImage: imageUrl,
  ogType: 'article',
  ogUrl: pageUrl,
  articlePublishedTime: article.date,
  articleSection: category.name,
  twitterCard: 'summary_large_image',
  twitterTitle: article.title,
  twitterDescription: description,
  twitterImage: imageUrl
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }],
  script: [{
    type: 'application/ld+json',
    innerHTML: JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'BlogPosting',
      headline: article.title,
      description,
      image: imageUrl,
      datePublished: article.date,
      author: { '@type': 'Organization', name: '白日夢情侶檔' },
      publisher: { '@type': 'Organization', name: '白日夢情侶檔' },
      mainEntityOfPage: pageUrl
    })
  }]
})
</script>

<template>
  <div>
    <div class="aspect-[16/9] w-full overflow-hidden bg-morandi-100 sm:aspect-[21/9]">
      <img
        :src="article.hero || `https://picsum.photos/seed/${article.seed}/1600/800`"
        :alt="article.title"
        class="h-full w-full object-cover"
      >
    </div>

    <div class="mx-auto max-w-3xl px-5 py-10 lg:max-w-6xl">
      <div class="lg:flex lg:justify-center lg:gap-12">
        <div class="lg:min-w-0 lg:max-w-3xl lg:flex-1">
          <NuxtLink :to="`/${category.slug}`" class="text-sm text-clay-600 hover:underline">
            ← {{ category.name }}
          </NuxtLink>

          <p class="mt-4 text-xs text-morandi-400">
            <span v-if="article.location">{{ article.location }} ・ </span>{{ article.date }}
          </p>
          <h1 class="mt-2 text-3xl leading-snug text-morandi-900 sm:text-4xl">
            {{ article.title }}
          </h1>

          <div class="mt-8 space-y-5 leading-relaxed text-morandi-700">
            <template v-for="(block, i) in article.body" :key="i">
              <p
                v-if="typeof block === 'string'"
                :class="block.startsWith('💡') ? 'font-bold text-morandi-900' : undefined"
                :style="i === article.body.length - 1 ? { marginTop: '2.5rem' } : undefined"
              >
                {{ block }}
              </p>
              <p
                v-else-if="'heading' in block"
                :id="`heading-${i}`"
                class="scroll-mt-24 font-bold text-morandi-900"
                :class="block.level === 2 ? 'mt-6 text-lg' : 'mt-8 text-xl sm:text-2xl'"
              >
                {{ block.heading }}
              </p>
          <p
            v-else-if="'caption' in block"
            class="text-xs text-morandi-400"
          >
            {{ block.caption }}
          </p>
          <component
            :is="block.ordered ? 'ol' : 'ul'"
            v-else-if="'items' in block"
            class="space-y-2 pl-5 marker:text-clay-600"
            :class="block.ordered ? 'list-decimal' : 'list-disc'"
          >
            <template v-for="(item, j) in block.items" :key="j">
              <li v-if="typeof item === 'string'">{{ item }}</li>
              <li v-else>
                {{ item.text }}
                <ul v-if="item.sub" class="mt-2 list-[circle] space-y-2 pl-5 marker:text-morandi-400">
                  <li v-for="(sub, k) in item.sub" :key="k">
                    <a
                      v-if="typeof sub !== 'string'"
                      :href="sub.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="mt-1 inline-flex items-center gap-1 rounded-full bg-clay-600 px-3 py-1 text-xs text-white transition hover:bg-clay-700 active:scale-[0.96]"
                    >
                      {{ sub.linkText }} ↗
                    </a>
                    <template v-else>{{ sub }}</template>
                  </li>
                </ul>
              </li>
            </template>
          </component>
          <ul
            v-else-if="'infoBox' in block"
            class="list-disc space-y-2 rounded-lg bg-morandi-100 p-6 pl-10 marker:text-clay-600"
          >
            <li v-for="(item, j) in block.infoBox" :key="j">
              <template v-if="typeof item === 'string'">{{ item }}</template>
              <template v-else>
                {{ item.text }}
                <ul v-if="item.sub" class="mt-2 list-[circle] space-y-2 pl-5 marker:text-morandi-400">
                  <li v-for="(sub, k) in item.sub" :key="k">
                    <a
                      v-if="typeof sub !== 'string'"
                      :href="sub.url"
                      target="_blank"
                      rel="noopener noreferrer"
                      class="mt-1 inline-flex items-center gap-1 rounded-full bg-clay-600 px-3 py-1 text-xs text-white transition hover:bg-clay-700 active:scale-[0.96]"
                    >
                      {{ sub.linkText }} ↗
                    </a>
                    <template v-else>{{ sub }}</template>
                  </li>
                </ul>
              </template>
            </li>
          </ul>
          <div
            v-else-if="'related' in block"
            class="mt-8 rounded-lg border border-morandi-200 bg-morandi-50 p-5"
          >
            <p class="text-xs font-semibold tracking-wide text-morandi-400">延伸閱讀</p>
            <ul class="mt-2 space-y-1.5">
              <template v-for="rid in block.related" :key="rid">
                <li v-if="relatedArticle(rid)">
                  <NuxtLink :to="`/article/${rid}`" class="text-clay-600 hover:underline">
                    {{ relatedArticle(rid)!.title }}
                  </NuxtLink>
                </li>
              </template>
            </ul>
          </div>
          <div
            v-else
            class="grid gap-3 overflow-hidden rounded-lg"
            :class="block.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'"
          >
            <img
              v-for="(src, j) in block.images"
              :key="j"
              :src="src"
              :alt="imageAlt(i)"
              loading="lazy"
              class="h-full w-full rounded-lg object-cover"
            >
          </div>
        </template>
          </div>
        </div>

        <aside v-if="headings.length" class="hidden shrink-0 lg:block lg:w-48">
          <nav class="sticky top-24">
            <p class="text-sm font-semibold text-morandi-900">目錄</p>
            <ul class="mt-3 space-y-2 text-sm">
              <li v-for="h in headings" :key="h.index">
                <a
                  :href="`#heading-${h.index}`"
                  class="block transition hover:text-clay-600"
                  :class="h.index === activeHeadingIndex ? 'font-semibold text-clay-600' : 'text-morandi-600'"
                >
                  {{ h.text }}
                </a>
              </li>
            </ul>
          </nav>
        </aside>
      </div>
    </div>

    <button
      v-if="headings.length"
      type="button"
      class="fixed bottom-6 right-6 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-clay-600 text-white shadow-lg transition active:scale-95 lg:hidden"
      aria-label="開啟目錄"
      @click="tocOpen = !tocOpen"
    >
      <span v-if="!tocOpen">☰</span>
      <span v-else>✕</span>
    </button>

    <div
      v-if="tocOpen"
      class="fixed inset-x-5 bottom-20 z-40 max-h-[60vh] overflow-y-auto rounded-lg border border-morandi-200 bg-morandi-50 p-5 shadow-lg lg:hidden"
    >
      <p class="text-sm font-semibold text-morandi-900">目錄</p>
      <ul class="mt-3 space-y-2 text-sm">
        <li v-for="h in headings" :key="h.index">
          <a
            :href="`#heading-${h.index}`"
            class="block"
            :class="h.index === activeHeadingIndex ? 'font-semibold text-clay-600' : 'text-morandi-600'"
            @click="tocOpen = false"
          >
            {{ h.text }}
          </a>
        </li>
      </ul>
    </div>

    <div v-if="more.length" class="border-t border-morandi-200 bg-morandi-100/40">
      <div class="mx-auto max-w-6xl px-5 py-12">
        <h2 class="mb-6 text-xl text-morandi-900">更多{{ category.name }}</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ArticleCard v-for="a in more" :key="a.id" :article="a" />
        </div>
      </div>
    </div>
  </div>
</template>
