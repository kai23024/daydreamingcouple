<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-stone-800 bg-stone-900">
    <div class="mx-auto max-w-6xl px-5 py-10 text-sm text-stone-400">
      <div class="grid gap-8 sm:grid-cols-3">
        <div>
          <p class="font-serif text-lg text-stone-100">白日夢情侶檔</p>
          <p class="mt-2 leading-relaxed">
            走過的路、拍下的畫面，都是我們生活裡最珍貴的紀錄。
          </p>
        </div>
        <div>
          <p class="mb-2 font-medium text-stone-200">聯絡我們</p>
          <p>Email：hello@daydreamingcouple.example</p>
          <p>Instagram：@daydreaming.couple</p>
        </div>
        <div>
          <p class="mb-2 font-medium text-stone-200">關於這個網站</p>
          <p>以 Vue 3 + Nuxt 打造，部署於 Firebase Hosting。</p>
        </div>
      </div>
      <div class="mt-8 border-t border-stone-800 pt-4 text-xs text-stone-500">
        © {{ year }} Daydreaming Couple. All rights reserved.
      </div>
    </div>
  </footer>
</template>
