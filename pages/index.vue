<template>
  <main class="container mx-auto py-6">
    <!-- Hero Section -->
    <div class="flex flex-col md:flex-row justify-between items-center gap-8 px-4 md:h-screen mt-8">
      <div class="w-full md:w-1/2 justify-center text-center items-center md:items-left md:text-left">
        <span class="bg-green-grass text-white rounded-2xl px-6 py-3 text-md mb-3">🎁 <strong>Regalo:</strong> Cupón 1er envío gratis <a href="#" class="text-[#93f8f4] font-bold ml-2" @click="applyCoupon">WELCOME</a></span>
        <h1 class="text-4xl md:text-5xl xl:text-7xl font-bold leading-tight mt-5">
          Envía dinero a cualquier parte del Perú y Brasil
        </h1>
        <p class="mt-4 text-gray-600 text-lg xl:text-2xl">
          Recibe el dinero en efectivo en el mismo día. 
        </p>
      </div>
      <div class="w-full md:w-1/2">
        <RemittanceCalculator :setCoupon="coupon" />
      </div>
    </div>
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
const coupon = ref(null);
const applyCoupon = () => {
  coupon.value = 'WELCOME';
}
</script>
