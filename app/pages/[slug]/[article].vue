<script setup lang="ts">
import { articleById, articlesByCategory, categoryBySlug } from '~/data/site'

const route = useRoute()
const categorySlug = route.params.slug as string
const articleId = route.params.article as string

const category = categoryBySlug(categorySlug)
const article = articleById(categorySlug, articleId)

if (!category || !article) {
  throw createError({ statusCode: 404, statusMessage: '找不到這篇文章' })
}

const more = articlesByCategory(categorySlug).filter(a => a.id !== article.id).slice(0, 3)

useHead({ title: `${article.title}｜白日夢情侶檔` })
</script>

<template>
  <div>
    <div class="aspect-[16/9] w-full overflow-hidden bg-stone-900 sm:aspect-[21/9]">
      <img
        :src="`https://picsum.photos/seed/${article.seed}/1600/800`"
        :alt="article.title"
        class="h-full w-full object-cover opacity-90"
      >
    </div>

    <div class="mx-auto max-w-3xl px-5 py-10">
      <NuxtLink :to="`/${category.slug}`" class="text-sm text-amber-400 hover:underline">
        ← {{ category.name }}
      </NuxtLink>

      <p class="mt-4 text-xs text-stone-500">
        <span v-if="article.location">{{ article.location }} ・ </span>{{ article.date }}
      </p>
      <h1 class="mt-2 font-serif text-3xl leading-snug text-stone-100 sm:text-4xl">
        {{ article.title }}
      </h1>

      <div class="mt-8 space-y-5 leading-relaxed text-stone-300">
        <p v-for="(paragraph, i) in article.body" :key="i">
          {{ paragraph }}
        </p>
      </div>
    </div>

    <div v-if="more.length" class="border-t border-stone-800 bg-stone-900/40">
      <div class="mx-auto max-w-6xl px-5 py-12">
        <h2 class="mb-6 font-serif text-xl text-stone-100">更多{{ category.name }}</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ArticleCard v-for="a in more" :key="a.id" :article="a" />
        </div>
      </div>
    </div>
  </div>
</template>
