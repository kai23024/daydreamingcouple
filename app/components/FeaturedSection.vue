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
        <h2 class="font-serif text-2xl text-stone-100">{{ category.name }}</h2>
        <p class="mt-1 text-sm text-stone-400">{{ category.description }}</p>
      </div>
      <NuxtLink :to="`/${category.slug}`" class="text-sm text-amber-400 hover:underline">
        查看全部 →
      </NuxtLink>
    </div>

    <div v-if="main" class="grid gap-6 lg:grid-cols-5">
      <article class="group relative overflow-hidden rounded-2xl lg:col-span-3">
        <img
          :src="`https://picsum.photos/seed/${main.seed}/900/700`"
          :alt="main.title"
          loading="lazy"
          class="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105 lg:aspect-auto lg:h-full"
        >
        <div class="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent" />
        <div class="absolute inset-x-0 bottom-0 p-6">
          <p class="text-xs text-stone-300">
            <span v-if="main.location">{{ main.location }} ・ </span>{{ main.date }}
          </p>
          <h3 class="mt-1 font-serif text-2xl leading-snug text-stone-50 group-hover:text-amber-400">
            {{ main.title }}
          </h3>
          <p class="mt-2 max-w-md text-sm leading-relaxed text-stone-300">
            {{ main.excerpt }}
          </p>
        </div>
      </article>

      <div class="flex flex-col gap-4 lg:col-span-2">
        <article
          v-for="article in rest"
          :key="article.id"
          class="group flex gap-4 overflow-hidden rounded-xl bg-stone-900 p-3 ring-1 ring-stone-800 transition active:scale-[0.98]"
        >
          <img
            :src="`https://picsum.photos/seed/${article.seed}/200/200`"
            :alt="article.title"
            loading="lazy"
            class="h-20 w-20 shrink-0 rounded-lg object-cover"
          >
          <div class="min-w-0">
            <p class="text-xs text-stone-500">
              <span v-if="article.location">{{ article.location }} ・ </span>{{ article.date }}
            </p>
            <h3 class="mt-1 truncate font-serif text-base text-stone-100 group-hover:text-amber-400">
              {{ article.title }}
            </h3>
            <p class="mt-1 line-clamp-2 text-xs leading-relaxed text-stone-400">
              {{ article.excerpt }}
            </p>
          </div>
        </article>
      </div>
    </div>
  </section>
</template>
