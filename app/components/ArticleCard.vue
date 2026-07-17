<script setup lang="ts">
import type { Article } from '~/data/site'

defineProps<{ article: Article }>()
</script>

<template>
  <article class="group overflow-hidden rounded-lg bg-white shadow-sm ring-1 ring-stone-200 transition hover:shadow-md">
    <div class="aspect-[4/3] overflow-hidden bg-stone-200">
      <img
        :src="`https://picsum.photos/seed/${article.seed}/640/480`"
        :alt="article.title"
        loading="lazy"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      >
    </div>
    <div class="p-4">
      <p class="text-xs text-stone-400">
        <span v-if="article.location">{{ article.location }} ・ </span>{{ article.date }}
      </p>
      <h3 class="mt-1 font-serif text-lg leading-snug text-stone-800 group-hover:text-amber-700">
        {{ article.title }}
      </h3>
      <p class="mt-2 text-sm leading-relaxed text-stone-500">
        {{ article.excerpt }}
      </p>
    </div>
  </article>
</template>
