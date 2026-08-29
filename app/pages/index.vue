<script setup lang="ts">
import { articlesByCategory, categoryBySlug } from '~/data/site'

useHead({ title: '白日夢情侶檔｜Daydreaming Couple' })

const latestByCategory = (slug: string) =>
  articlesByCategory(slug).slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 3)

const taiwan = { category: categoryBySlug('taiwan')!, articles: latestByCategory('taiwan') }
const japan = { category: categoryBySlug('japan')!, articles: latestByCategory('japan') }
const global = { category: categoryBySlug('global')!, articles: latestByCategory('global') }
const food = { category: categoryBySlug('food')!, articles: latestByCategory('food') }
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
        <p class="font-hand text-lg leading-tight tracking-tight text-nowrap text-clay-200 sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">光影與味蕾的世界漫遊</p>
        <h1 class="font-hand mt-4 text-lg leading-tight tracking-tight text-nowrap sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          用鏡頭定格景色溫度，用舌尖收藏生活光芒
        </h1>
        <p class="mt-4 max-w-md text-morandi-200 lg:max-w-none lg:text-nowrap">
          我們是一對熱愛踏尋風景與巷弄美食的情侶，希望能為你的下一段旅程與餐桌尋味，提供最溫暖的靈感與浪漫。
        </p>
        <NuxtLink
          to="/taiwan"
          class="mt-8 inline-block rounded-full bg-clay-600 px-6 py-3 text-sm font-medium text-morandi-50 transition hover:bg-clay-700 active:scale-[0.98]"
        >
          立即探索 Explore Now
        </NuxtLink>
      </div>
    </section>

    <CategorySection :category="taiwan.category" :articles="taiwan.articles" />
    <CategorySection :category="japan.category" :articles="japan.articles" />
    <CategorySection :category="global.category" :articles="global.articles" />
    <CategorySection :category="food.category" :articles="food.articles" />
  </div>
</template>
