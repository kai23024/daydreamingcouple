<script setup lang="ts">
import type { Article, Category } from '~/data/site'

defineProps<{ category: Category; articles: Article[] }>()
</script>

<template>
  <section class="mx-auto max-w-6xl px-5 py-12">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 class="text-2xl text-morandi-900">{{ category.name }}</h2>
        <p class="mt-1 text-sm text-morandi-500">{{ category.description }}</p>
      </div>
      <NuxtLink :to="`/${category.slug}`" class="text-sm text-clay-600 hover:underline">
        查看全部 →
      </NuxtLink>
    </div>
    <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      <ArticleCard v-for="article in articles" :key="article.id" :article="article" />
    </div>
  </section>
</template>
