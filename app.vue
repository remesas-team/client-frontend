<template>
  <UApp>
    <NuxtLayout>
      <NuxtLoadingIndicator :height="1" />

      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
  import { trackPage } from '~/tracking/events/pagesEvents'
  import { trackIdentify } from '~/tracking/events/authEvents'
  import { trackExample } from "~/tracking/events/exampleEvents";

  const route = useRoute()

  useSeoMeta({
    title: 'Remesas.com',
    description: 'Envíos de dinero a todo Perú y Brasil',
    ogTitle: 'Remesas.com',
    ogDescription: 'Envíos de dinero a todo Perú y Brasil',
    ogImage: 'https://remesas.com/thumbnail.png',
  })

  useHead({
    htmlAttrs: {
      lang: 'en'
    },
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: 'https://remesas.com/favicon.png'
      }
    ]
  })

  onMounted(() => {
    trackIdentify()
    trackPage()
    trackExample()
  })

  watch(
      () => route.fullPath,
      () => {
        trackPage()
      },
  )
</script>
