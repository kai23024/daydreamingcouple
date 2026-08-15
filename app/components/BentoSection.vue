<script setup lang="ts">
import type { Article, Category } from '~/data/site'

const props = defineProps<{ category: Category; articles: Article[] }>()

const big = props.articles[0]
const small = props.articles.slice(1, 3)
</script>

<template>
  <section class="mx-auto max-w-6xl px-5 py-12">
    <div class="mb-6 flex flex-wrap items-end justify-between gap-2">
      <div>
        <h2 class="font-serif text-2xl text-morandi-900">{{ category.name }}</h2>
        <p class="mt-1 text-sm text-morandi-500">{{ category.description }}</p>
      </div>
      <NuxtLink :to="`/${category.slug}`" class="text-sm text-clay-600 hover:underline">
        查看全部 →
      </NuxtLink>
    </div>

    <div class="grid gap-4 sm:grid-cols-5">
      <div v-if="big" class="sm:col-span-3">
        <NuxtLink
          :to="`/article/${big.id}`"
          class="group block overflow-hidden rounded-2xl bg-morandi-100 shadow-sm ring-1 ring-morandi-200 transition active:scale-[0.98]"
        >
          <div class="aspect-[16/10] overflow-hidden bg-morandi-200">
            <img
              :src="`https://picsum.photos/seed/${big.seed}/900/560`"
              :alt="big.title"
              loading="lazy"
              class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            >
          </div>
          <div class="p-5">
            <p class="text-xs text-morandi-400">
              <span v-if="big.location">{{ big.location }} ・ </span>{{ big.date }}
            </p>
            <h3 class="mt-1 font-serif text-xl leading-snug text-morandi-900 group-hover:text-clay-600">
              {{ big.title }}
            </h3>
            <p class="mt-2 text-sm leading-relaxed text-morandi-500">
              {{ big.excerpt }}
            </p>
          </div>
        </NuxtLink>
      </div>

      <div class="flex flex-col gap-4 sm:col-span-2">
        <ArticleCard v-for="article in small" :key="article.id" :article="article" />
      </div>
    </div>
  </section>
</template>
