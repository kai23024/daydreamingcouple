<script setup lang="ts">
import type { Article, Category } from '~/data/site'

const props = defineProps<{ category: Category; articles: Article[] }>()

const main = props.articles[0]
const rest = props.articles.slice(1)
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

    <div v-if="main" class="grid gap-6 lg:grid-cols-5">
      <NuxtLink
        :to="`/article/${main.id}`"
        class="group relative block overflow-hidden rounded-2xl lg:col-span-3"
      >
        <img
          :src="`https://picsum.photos/seed/${main.seed}/900/700`"
          :alt="main.title"
          loading="lazy"
          class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105 lg:aspect-auto lg:h-full"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-morandi-950 via-morandi-950/30 to-transparent" />
        <div class="absolute inset-x-0 bottom-0 p-6">
          <p class="text-xs text-morandi-200">
            <span v-if="main.location">{{ main.location }} ・ </span>{{ main.date }}
          </p>
          <h3 class="mt-1 font-serif text-2xl leading-snug text-morandi-50 group-hover:text-clay-200">
            {{ main.title }}
          </h3>
          <p class="mt-2 max-w-md text-sm leading-relaxed text-morandi-200">
            {{ main.excerpt }}
          </p>
        </div>
      </NuxtLink>

      <div class="flex flex-col gap-4 lg:col-span-2">
        <NuxtLink
          v-for="article in rest"
          :key="article.id"
          :to="`/article/${article.id}`"
          class="group flex gap-4 overflow-hidden rounded-xl bg-morandi-100 p-3 ring-1 ring-morandi-200 transition active:scale-[0.98]"
        >
          <img
            :src="`https://picsum.photos/seed/${article.seed}/200/200`"
            :alt="article.title"
            loading="lazy"
            class="h-20 w-20 shrink-0 rounded-lg object-cover"
          >
          <div class="min-w-0">
            <p class="text-xs text-morandi-400">
              <span v-if="article.location">{{ article.location }} ・ </span>{{ article.date }}
            </p>
            <h3 class="mt-1 truncate font-serif text-base text-morandi-900 group-hover:text-clay-600">
              {{ article.title }}
            </h3>
            <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-morandi-500">
              {{ article.excerpt }}
            </p>
          </div>
        </NuxtLink>
      </div>
    </div>
  </section>
</template>
