<template>
  <section class="my-16">
    <h2 class="text-2xl font-bold text-center mb-8">
      Porque tu familia lo merece
    </h2>
    <div class="grid md:grid-cols-3 gap-6">
      <div
        v-for="(testimonial, index) in testimonials"
        :key="index"
        class="bg-white p-6 rounded-xl shadow-lg"
      >
        <img
          :src="testimonial.image"
          :alt="`Testimonio de ${testimonial.author}`"
          class="w-full h-48 object-cover rounded-lg mb-4"
        />
        <p class="text-gray-600 italic mb-4">"{{ testimonial.text }}"</p>
        <p class="text-sm font-medium">{{ testimonial.author }}</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Testimonial {
  image: string;
  text: string;
  author: string;
}

const testimonials = ref<Testimonial[]>([
  {
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
    text: 'La forma más rápida y económica de enviar dinero a mi familia',
    author: 'Ana Martínez',
  },
  {
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    text: 'Excelente servicio y atención al cliente',
    author: 'Carlos Rodríguez',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    text: 'Proceso simple y transparente, muy recomendado',
    author: 'María González',
  },
  {
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80',
    text: 'Proceso simple y transparente, muy recomendado',
    author: 'María González',
  },
]);
</script>