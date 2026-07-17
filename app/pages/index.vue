<script setup lang="ts">
import { articlesByCategory, categoryBySlug } from '~/data/site'

useHead({ title: '白日夢情侶檔｜Daydreaming Couple' })

const featured = ['taiwan', 'japan', 'global', 'food']
  .map(slug => ({ category: categoryBySlug(slug)!, articles: articlesByCategory(slug).slice(0, 3) }))
</script>

<template>
  <div>
    <section class="relative overflow-hidden bg-stone-900 text-stone-50">
      <img
        src="https://picsum.photos/seed/dreamcouple-hero/1600/800"
        alt="旅行風景"
        class="absolute inset-0 h-full w-full object-cover opacity-50"
      >
      <div class="relative mx-auto flex max-w-6xl flex-col items-start px-5 py-28">
        <p class="text-xs uppercase tracking-[0.3em] text-amber-200">Daydreaming Couple</p>
        <h1 class="mt-4 max-w-xl font-serif text-4xl leading-tight sm:text-5xl">
          走過的路，拍下的光<br>都是生活裡最柔軟的收藏
        </h1>
        <p class="mt-4 max-w-md text-stone-200">
          一對喜歡旅行與美食的情侶，用文字與照片記錄台灣、日本與世界各地的日常冒險。
        </p>
        <NuxtLink
          to="/taiwan"
          class="mt-8 inline-block rounded-full bg-amber-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-amber-500"
        >
          立即探索 Explore Now
        </NuxtLink>
      </div>
    </section>

    <CategorySection
      v-for="item in featured"
      :key="item.category.slug"
      :category="item.category"
      :articles="item.articles"
    />
  </div>
</template>
