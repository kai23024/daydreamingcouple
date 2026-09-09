<script setup lang="ts">
import type { Article, Category } from '~/data/site'
import { splitCategoryName } from '~/data/site'

const props = defineProps<{ category: Category; articles: Article[] }>()
const label = computed(() => splitCategoryName(props.category.name))
</script>

<template>
  <section class="mx-auto max-w-6xl px-5">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 class="font-hand text-3xl text-morandi-900">{{ label.zh }}</h2>
        <p class="font-hand mt-1 text-base text-morandi-500">{{ category.description }}</p>
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
