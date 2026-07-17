<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

useHead({ title: '找不到頁面｜白日夢情侶檔' })
</script>

<template>
  <div class="flex min-h-screen flex-col bg-stone-950 font-sans text-stone-200">
    <AppHeader />
    <main class="flex flex-1 items-center justify-center px-5 py-24">
      <div class="text-center">
        <p class="font-serif text-6xl text-stone-700">{{ error.statusCode }}</p>
        <h1 class="mt-4 font-serif text-2xl text-stone-100">
          這個頁面像迷路的旅人一樣，不見了
        </h1>
        <p class="mt-2 text-stone-400">
          可能是連結有誤，或這篇故事還在路上。
        </p>
        <NuxtLink
          to="/"
          class="mt-8 inline-block rounded-full bg-amber-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-amber-500 active:scale-[0.98]"
        >
          回到首頁
        </NuxtLink>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
