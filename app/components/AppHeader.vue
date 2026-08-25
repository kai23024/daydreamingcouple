<script setup lang="ts">
import { categories } from '~/data/site'

const open = ref(false)

const logoChars = '白日夢情侶檔'.split('')

// 分類名稱格式為「中文．中文ENGLISH」，取尾端連續大寫字母當作英文行，其餘當中文行
function splitLabel(label: string) {
  const match = label.match(/^(.*?)([A-Z]+)$/)
  if (!match) return { zh: label, en: '' }
  const en = match[2]
  return { zh: match[1], en: en.charAt(0) + en.slice(1).toLowerCase() }
}

const navLinks = [
  ...categories.map(c => ({ to: `/${c.slug}`, label: c.name, ...splitLabel(c.name) })),
  { to: '/about', label: '關於．我們US', ...splitLabel('關於．我們US') },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-morandi-200 bg-morandi-50/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-2 px-5 py-4">
      <NuxtLink to="/" class="flex shrink-0 flex-col items-stretch whitespace-nowrap" @click="open = false">
        <span class="font-hand flex justify-between text-2xl text-morandi-900">
          <span v-for="(ch, i) in logoChars" :key="i">{{ ch }}</span>
        </span>
        <span class="font-script text-lg text-morandi-400">Daydreaming Couple</span>
      </NuxtLink>

      <nav class="hidden flex-nowrap items-start gap-x-4 lg:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="flex shrink-0 flex-col items-center whitespace-nowrap text-morandi-500 transition hover:text-clay-600"
          active-class="text-clay-600 font-medium"
        >
          <span class="font-hand text-lg">{{ link.zh }}</span>
          <span class="font-script text-base text-morandi-400">{{ link.en }}</span>
        </NuxtLink>
      </nav>

      <button
        class="flex h-9 w-9 items-center justify-center rounded-full border border-morandi-300 text-morandi-700 transition active:scale-[0.98] lg:hidden"
        aria-label="開啟選單"
        @click="open = !open"
      >
        <span v-if="!open">☰</span>
        <span v-else>✕</span>
      </button>
    </div>

    <nav v-if="open" class="flex flex-col gap-1 border-t border-morandi-200 bg-morandi-50 px-5 py-3 lg:hidden">
      <NuxtLink
        v-for="link in navLinks"
        :key="link.to"
        :to="link.to"
        class="rounded px-2 py-2 text-sm text-morandi-500 hover:bg-morandi-100"
        active-class="text-clay-600 font-medium"
        @click="open = false"
      >
        {{ link.label }}
      </NuxtLink>
    </nav>
  </header>
</template>
