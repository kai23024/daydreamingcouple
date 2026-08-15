<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-morandi-200 bg-morandi-100">
    <div class="mx-auto max-w-6xl px-5 py-10 text-sm text-morandi-500">
      <div class="grid gap-8 sm:grid-cols-3">
        <div>
          <p class="font-serif text-lg text-morandi-900">白日夢情侶檔</p>
          <p class="mt-2 leading-relaxed">
            走過的路、拍下的畫面，都是我們生活裡最珍貴的紀錄。
          </p>
        </div>
        <div>
          <p class="mb-2 font-medium text-morandi-800">聯絡我們</p>
          <p>Email：hello@daydreamingcouple.example</p>
          <p>Instagram：@daydreaming.couple</p>
        </div>
        <div>
          <p class="mb-2 font-medium text-morandi-800">關於這個網站</p>
          <p>以 Vue 3 + Nuxt 打造，部署於 Firebase Hosting。</p>
        </div>
      </div>
      <div class="mt-8 border-t border-morandi-200 pt-4 text-xs text-morandi-400">
        © {{ year }} Daydreaming Couple. All rights reserved.
      </div>
    </div>
  </footer>
</template>
