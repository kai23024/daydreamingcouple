<script setup lang="ts">
onMounted(() => {
  const prevent = (e: Event) => e.preventDefault()
  // Only block the right-click menu on photos (deters "另存圖片"), not site-wide —
  // blocking it everywhere also blocked "在新分頁中開啟連結" on nav items and article cards.
  document.addEventListener('contextmenu', (e) => {
    if ((e.target as HTMLElement).tagName === 'IMG') e.preventDefault()
  })
  document.addEventListener('dragstart', prevent)
  document.addEventListener('copy', prevent)
  document.addEventListener('cut', prevent)
  document.addEventListener('selectstart', prevent)
})
</script>

<template>
  <div class="flex min-h-screen flex-col bg-morandi-50 font-sans text-morandi-800">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>
