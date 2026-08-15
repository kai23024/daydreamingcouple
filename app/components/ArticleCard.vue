<script setup lang="ts">
import type { Article } from '~/data/site'

defineProps<{ article: Article }>()
</script>

<template>
  <NuxtLink
    :to="`/article/${article.id}`"
    class="group block overflow-hidden rounded-lg bg-morandi-100 shadow-sm ring-1 ring-morandi-200 transition active:scale-[0.98]"
  >
    <div class="aspect-[4/3] overflow-hidden bg-morandi-200">
      <img
        :src="article.hero || `https://picsum.photos/seed/${article.seed}/640/480`"
        :alt="article.title"
        loading="lazy"
        class="h-full w-full object-cover transition duration-500 group-hover:scale-105"
      >
    </div>
    <div class="p-4">
      <p class="text-xs text-morandi-400">
        <span v-if="article.location">{{ article.location }} ・ </span>{{ article.date }}
      </p>
      <h3 class="mt-1 font-serif text-lg leading-snug text-morandi-900 group-hover:text-clay-600">
        {{ article.title }}
      </h3>
      <p class="mt-2 text-sm leading-relaxed text-morandi-500">
        {{ article.excerpt }}
      </p>
    </div>
  </NuxtLink>
</template>
