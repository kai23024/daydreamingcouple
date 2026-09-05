declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
  }
}

function nextFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()))
}

export default defineNuxtPlugin(() => {
  const router = useRouter()
  router.afterEach(async (to) => {
    // document.title hasn't updated yet the instant router.afterEach fires —
    // useHead() applies it a frame or two later during the new page's render,
    // so a single Vue nextTick isn't enough to catch it.
    await nextFrame()
    await nextFrame()
    window.gtag?.('event', 'page_view', {
      page_path: to.fullPath,
      page_title: document.title,
      page_location: window.location.href
    })
  })
})
