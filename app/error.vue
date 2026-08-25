<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

useHead({ title: '找不到頁面｜白日夢情侶檔' })
</script>

<template>
  <div class="flex min-h-screen flex-col bg-morandi-50 font-sans text-morandi-800">
    <AppHeader />
    <main class="flex flex-1 items-center justify-center px-5 py-24">
      <div class="text-center">
        <p class="text-6xl text-morandi-300">{{ error.statusCode }}</p>
        <h1 class="mt-4 text-2xl text-morandi-900">
          這個頁面像迷路的旅人一樣，不見了
        </h1>
        <p class="mt-2 text-morandi-500">
          可能是連結有誤，或這篇故事還在路上。
        </p>
        <NuxtLink
          to="/"
          class="mt-8 inline-block rounded-full bg-clay-600 px-6 py-3 text-sm font-medium text-morandi-50 transition hover:bg-clay-700 active:scale-[0.98]"
        >
          回到首頁
        </NuxtLink>
      </div>
    </main>
    <AppFooter />
  </div>
</template>
