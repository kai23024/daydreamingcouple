<script setup lang="ts">
import { categories } from '~/data/site'

const open = ref(false)

const navLinks = [
  ...categories.map(c => ({ to: `/${c.slug}`, label: c.name })),
  { to: '/about', label: '關於．我們US' },
]
</script>

<template>
  <header class="sticky top-0 z-50 border-b border-morandi-200 bg-morandi-50/90 backdrop-blur">
    <div class="mx-auto flex max-w-6xl items-center justify-between px-5 py-4">
      <NuxtLink to="/" class="flex items-center gap-2" @click="open = false">
        <span class="text-xl font-serif tracking-wide text-morandi-900">白日夢情侶檔</span>
        <span class="hidden text-xs uppercase tracking-[0.2em] text-morandi-400 sm:inline">Daydreaming Couple</span>
      </NuxtLink>

      <nav class="hidden gap-6 lg:flex">
        <NuxtLink
          v-for="link in navLinks"
          :key="link.to"
          :to="link.to"
          class="text-sm text-morandi-500 transition hover:text-clay-600"
          active-class="text-clay-600 font-medium"
        >
          {{ link.label }}
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
