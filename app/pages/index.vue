<script setup lang="ts">
import { articlesByCategory, categoryBySlug } from '~/data/site'

useHead({ title: '白日夢情侶檔｜Daydreaming Couple' })

const taiwan = { category: categoryBySlug('taiwan')!, articles: articlesByCategory('taiwan').slice(0, 3) }
const japan = { category: categoryBySlug('japan')!, articles: articlesByCategory('japan').slice(0, 3) }
const global = { category: categoryBySlug('global')!, articles: articlesByCategory('global').slice(0, 3) }
const food = { category: categoryBySlug('food')!, articles: articlesByCategory('food').slice(0, 3) }
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-morandi-950 text-morandi-50">
      <img
        src="https://picsum.photos/seed/dreamcouple-hero/1600/800"
        alt="旅行風景"
        class="absolute inset-0 h-full w-full object-cover opacity-40"
      >
      <div class="absolute inset-0 bg-gradient-to-t from-morandi-950 via-morandi-950/40 to-morandi-950/10" />
      <div class="relative mx-auto flex max-w-6xl flex-col items-start px-5 py-28">
        <p class="text-xs uppercase tracking-[0.3em] text-clay-200">Daydreaming Couple</p>
        <h1 class="mt-4 max-w-xl font-serif text-4xl leading-tight tracking-tight sm:text-5xl">
          走過的路，拍下的光<br>都是生活裡最柔軟的收藏
        </h1>
        <p class="mt-4 max-w-md text-morandi-200">
          一對喜歡旅行與美食的情侶，用文字與照片記錄台灣、日本與世界各地的日常冒險。
        </p>
        <NuxtLink
          to="/taiwan"
          class="mt-8 inline-block rounded-full bg-clay-600 px-6 py-3 text-sm font-medium text-morandi-50 transition hover:bg-clay-700 active:scale-[0.98]"
        >
          立即探索 Explore Now
        </NuxtLink>
      </div>
    </section>

    <FeaturedSection :category="taiwan.category" :articles="taiwan.articles" />
    <CategorySection :category="japan.category" :articles="japan.articles" />
    <ScrollSection :category="global.category" :articles="global.articles" />
    <BentoSection :category="food.category" :articles="food.articles" />
  </div>
</template>
