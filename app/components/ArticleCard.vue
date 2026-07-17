<script setup lang="ts">
import type { Article } from '~/data/site'

defineProps<{ article: Article }>()
</script>

<template>
  <article class="group overflow-hidden rounded-lg bg-stone-900 shadow-sm ring-1 ring-stone-800 transition active:scale-[0.98]">
    <div class="aspect-[4/3] overflow-hidden bg-stone-800">
      <img
        :src="`https://picsum.photos/seed/${article.seed}/640/480`"
        :alt="article.title"
        loading="lazy"
        class="h-full w-full object-cover opacity-90 transition duration-500 group-hover:scale-105 group-hover:opacity-100"
      >
    </div>
    <div class="p-4">
      <p class="text-xs text-stone-500">
        <span v-if="article.location">{{ article.location }} ・ </span>{{ article.date }}
      </p>
      <h3 class="mt-1 font-serif text-lg leading-snug text-stone-100 group-hover:text-amber-400">
        {{ article.title }}
      </h3>
      <p class="mt-2 text-sm leading-relaxed text-stone-400">
        {{ article.excerpt }}
      </p>
    </div>
  </article>
</template>
