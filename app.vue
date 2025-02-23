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
</script>
