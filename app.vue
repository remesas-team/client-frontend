<template>
  <UApp>
    <NuxtLayout>
      <NuxtLoadingIndicator :height="1" />

      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { useSystemConfigStore } from '~/stores/systemConfig';

const systemConfig = useSystemConfigStore();

// Initialize system configuration when app starts
onMounted(async () => {
  await systemConfig.initializeConfig();
});
</script>
