<script setup lang="ts">
import { articlesByCategory, categoryBySlug } from '~/data/site'

const route = useRoute()
const slug = route.params.slug as string

const category = categoryBySlug(slug)
if (!category) {
  throw createError({ statusCode: 404, statusMessage: '找不到這個分類' })
}

const items = articlesByCategory(slug)

useHead({ title: `${category.name}｜白日夢情侶檔` })
</script>

<template>
  <div class="mx-auto max-w-6xl px-5 py-12">
    <header class="mb-10 border-b border-stone-200 pb-6">
      <p class="text-xs uppercase tracking-[0.2em] text-amber-700">{{ category.nameEn }}</p>
      <h1 class="mt-2 font-serif text-3xl text-stone-800">{{ category.name }}</h1>
      <p class="mt-2 text-stone-500">{{ category.description }}</p>
    </header>

    <div v-if="items.length" class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ArticleCard v-for="article in items" :key="article.id" :article="article" />
    </div>
    <p v-else class="text-stone-400">這個分類還沒有文章，敬請期待。</p>
  </div>
</template>
