<template>
  <main class="container mx-auto py-6">
    <!-- Hero Section -->
    <div class="text-center mb-8 mt-2 px-4">
      <h2 class="text-3xl md:text-4xl font-bold mb-4">Envios de dinero el mismo día a todo el Perú y Brasil</h2>
      <p class="text-gray-600 max-w-2xl mx-auto"></p>
    </div>
    <RemittanceCalculator/>
    <div class="px-5">
        <TestimonialSlider/>
        <FeaturesSection/>
        <TrustSection/>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
})
</script>
