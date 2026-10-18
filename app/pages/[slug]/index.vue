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

// Season filter — only shown when at least one article in this category is season-limited (e.g. japan).
const seasons = [...new Set(items.map(a => a.season).filter((s): s is string => !!s))]
const selectedSeason = ref<string | null>(null)

// Region (縣市) filter — only shown when this category's articles span more than one region (e.g. japan).
const regions = [...new Set(items.map(a => a.region).filter((r): r is string => !!r))]
const selectedRegion = ref<string | null>(null)

// Country filter — only shown when this category's articles actually span more than one country (e.g. global, food).
const countries = [...new Set(items.map(a => a.country).filter((c): c is string => !!c))]
const selectedCountry = ref<string | null>(null)

const filteredItems = computed(() =>
  items.filter(a =>
    (!selectedSeason.value || a.season === selectedSeason.value) &&
    (!selectedRegion.value || a.region === selectedRegion.value) &&
    (!selectedCountry.value || a.country === selectedCountry.value)
  )
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

    <div v-if="seasons.length || regions.length > 1" class="mb-8 flex flex-wrap gap-3">
      <button
        type="button"
        class="font-hand rounded-full px-6 py-3 text-xl transition active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-600"
        :class="selectedSeason === null && selectedRegion === null ? 'bg-clay-600 text-white' : 'bg-morandi-100 text-morandi-700 hover:bg-morandi-200'"
        @click="selectedSeason = null; selectedRegion = null"
      >
        全部
      </button>
      <button
        v-for="s in seasons"
        :key="s"
        type="button"
        class="font-hand rounded-full px-6 py-3 text-xl transition active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-600"
        :class="selectedSeason === s ? 'bg-clay-600 text-white' : 'bg-morandi-100 text-morandi-700 hover:bg-morandi-200'"
        @click="selectedSeason = selectedSeason === s ? null : s"
      >
        {{ s }}
      </button>
      <button
        v-for="r in regions"
        :key="r"
        type="button"
        class="font-hand rounded-full px-6 py-3 text-xl transition active:scale-[0.96] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay-600"
        :class="selectedRegion === r ? 'bg-clay-600 text-white' : 'bg-morandi-100 text-morandi-700 hover:bg-morandi-200'"
        @click="selectedRegion = selectedRegion === r ? null : r"
      >
        {{ r }}
      </button>
    </div>

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
