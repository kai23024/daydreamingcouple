<script setup lang="ts">
import { articles, articlesByCategory, categoryBySlug } from '~/data/site'

const route = useRoute()
const articleId = route.params.id as string

const article = articles.find(a => a.id === articleId)
const category = article ? categoryBySlug(article.category) : undefined

if (!article || !category) {
  throw createError({ statusCode: 404, statusMessage: '找不到這篇文章' })
}

const more = articlesByCategory(article.category).filter(a => a.id !== article.id).slice(0, 3)

useHead({ title: `${article.title}｜白日夢情侶檔` })
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

    <div class="mx-auto max-w-3xl px-5 py-10">
      <NuxtLink :to="`/${category.slug}`" class="text-sm text-clay-600 hover:underline">
        ← {{ category.name }}
      </NuxtLink>

      <p class="mt-4 text-xs text-morandi-400">
        <span v-if="article.location">{{ article.location }} ・ </span>{{ article.date }}
      </p>
      <h1 class="mt-2 font-serif text-3xl leading-snug text-morandi-900 sm:text-4xl">
        {{ article.title }}
      </h1>

      <div class="mt-8 space-y-5 leading-relaxed text-morandi-700">
        <template v-for="(block, i) in article.body" :key="i">
          <p v-if="typeof block === 'string'">{{ block }}</p>
          <p
            v-else-if="'caption' in block"
            class="inline-block rounded bg-morandi-200 px-2 py-1 text-xs text-morandi-600"
          >
            {{ block.caption }}
          </p>
          <div
            v-else
            class="grid gap-3 overflow-hidden rounded-lg"
            :class="block.images.length > 1 ? 'grid-cols-2' : 'grid-cols-1'"
          >
            <img
              v-for="(src, j) in block.images"
              :key="j"
              :src="src"
              :alt="article.title"
              loading="lazy"
              class="h-full w-full rounded-lg object-cover"
            >
          </div>
        </template>
      </div>
    </div>

    <div v-if="more.length" class="border-t border-morandi-200 bg-morandi-100/40">
      <div class="mx-auto max-w-6xl px-5 py-12">
        <h2 class="mb-6 font-serif text-xl text-morandi-900">更多{{ category.name }}</h2>
        <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <ArticleCard v-for="a in more" :key="a.id" :article="a" />
        </div>
      </div>
    </div>
  </div>
</template>
