<template>
  <UApp>
    <NuxtLayout>
      <NuxtLoadingIndicator :height="1" />

      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
  useSeoMeta({
    title: 'Remesas.com',
    description: '[description]',
    ogTitle: '[og:title]',
    ogDescription: '[og:description]',
    ogImage: '/thumbnail.png',
  })

  useHead({
    htmlAttrs: {
      lang: 'en'
    },
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: '/favicon.png'
      }
    ]
  })
</script>
