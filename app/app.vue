<template>
  <div class="flex min-h-screen flex-col bg-stone-50 font-sans text-stone-800">
    <NuxtRouteAnnouncer />
    <AppHeader />
    <main class="flex-1">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>
