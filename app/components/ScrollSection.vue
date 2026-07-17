<script setup lang="ts">
import type { Article, Category } from '~/data/site'

defineProps<{ category: Category; articles: Article[] }>()
</script>

<template>
  <section class="py-12">
    <div class="mx-auto flex max-w-6xl flex-wrap items-end justify-between gap-2 px-5">
      <div>
        <h2 class="font-serif text-2xl text-stone-100">{{ category.name }}</h2>
        <p class="mt-1 text-sm text-stone-400">{{ category.description }}</p>
      </div>
      <NuxtLink :to="`/${category.slug}`" class="text-sm text-amber-400 hover:underline">
        查看全部 →
      </NuxtLink>
    </div>

    <div class="mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 sm:mx-auto sm:max-w-6xl">
      <div
        v-for="article in articles"
        :key="article.id"
        class="w-64 shrink-0 snap-start sm:w-72"
      >
        <ArticleCard :article="article" />
      </div>
    </div>
  </section>
</template>
