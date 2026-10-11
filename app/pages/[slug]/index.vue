<script setup lang="ts">
import { articlesByCategory, categoryBySlug, splitCategoryName } from '~/data/site'

const route = useRoute()
const slug = route.params.slug as string

const category = categoryBySlug(slug)
if (!category) {
  throw createError({ statusCode: 404, statusMessage: '找不到這個分類' })
}

const items = articlesByCategory(slug)
const label = splitCategoryName(category.name)

// Country filter — only shown when this category's articles actually span more than one country (e.g. global, food).
const countries = [...new Set(items.map(a => a.country).filter((c): c is string => !!c))]
const selectedCountry = ref<string | null>(null)
const filteredItems = computed(() =>
  selectedCountry.value ? items.filter(a => a.country === selectedCountry.value) : items
)

const siteUrl = 'https://daydreamingcouple.com'
const pageUrl = `${siteUrl}/${category.slug}`

useSeoMeta({
  title: `${category.name}｜白日夢情侶檔`,
  description: category.description,
  ogTitle: category.name,
  ogDescription: category.description,
  ogUrl: pageUrl,
  twitterCard: 'summary_large_image',
  twitterTitle: category.name,
  twitterDescription: category.description
})

useHead({
  link: [{ rel: 'canonical', href: pageUrl }]
})
</script>

<template>
  <div class="mx-auto max-w-6xl px-5 py-12">
    <header class="mb-10 border-b border-morandi-200 pb-6">
      <h1 class="font-hand text-4xl text-morandi-900">{{ label.zh }}</h1>
      <p class="font-hand mt-2 text-3xl text-morandi-500">{{ category.description }}</p>
    </header>

    <div v-if="countries.length > 1" class="mb-8 flex gap-3">
      <button
        type="button"
        class="font-hand flex-1 rounded-full py-3 text-xl transition active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-600"
        :class="selectedCountry === null ? 'bg-clay-600 text-white' : 'bg-morandi-100 text-morandi-700 hover:bg-morandi-200'"
        @click="selectedCountry = null"
      >
        全部
      </button>
      <button
        v-for="c in countries"
        :key="c"
        type="button"
        class="font-hand flex-1 rounded-full py-3 text-xl transition active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-600"
        :class="selectedCountry === c ? 'bg-clay-600 text-white' : 'bg-morandi-100 text-morandi-700 hover:bg-morandi-200'"
        @click="selectedCountry = c"
      >
        {{ c }}
      </button>
    </div>

    <div v-if="filteredItems.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ArticleCard v-for="article in filteredItems" :key="article.id" :article="article" />
    </div>
    <p v-else class="text-morandi-400">這個分類還沒有文章，敬請期待。</p>
  </div>
</template>
