<script setup lang="ts">
onMounted(() => {
  const prevent = (e: Event) => e.preventDefault()
  document.addEventListener('contextmenu', prevent)
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
