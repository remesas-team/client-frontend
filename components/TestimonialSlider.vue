<template>
  <section class="py-16 bg-white overflow-hidden md:bg-transparent lg:w-[50%] lg:pb-4"  >
    <div class="container mx-auto px-4">
      <h2 class="text-center text-2xl font-bold mb-3 font-rebond lg:hidden"> 
        Hecho por inmigrantes <span class="text-green-600">para inmigrantes</span>
      </h2>
      <p class="text-center text-gray-600 max-w-2xl mx-auto mb-12 lg:hidden">
        Sabemos lo que significa estar lejos de casa o tener que cuidar a familiares que se encuentran lejos. Estamos aquí para ayudartlos.
      </p>

      <div class="md:max-w-[400px] max-w-[300px] mx-auto">
        <swiper
          :modules="[Navigation, Pagination, EffectCoverflow]"
          :effect="'coverflow'"
          :grab-cursor="true"
          :centered-slides="true"
          :loop="true"
          :looped-slides="1"
          :slides-per-view="1"
          :space-between="10"
          :navigation="true"
          :pagination="{ clickable: true }"
          :coverflow-effect="{
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }"
          class="testimonial-slider"
        >
          <swiper-slide v-for="testimonial in testimonials" :key="testimonial.name">
            <div class="relative h-[500px] md:h-[600px] rounded-xl overflow-hidden">
              <!-- Background Image with Gradient Overlay -->
              <div class="absolute inset-0">
                <img 
                  :src="testimonial.image" 
                  :alt="testimonial.name"
                  class="w-full h-full object-cover"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
              </div>
              
              <!-- Content -->
              <div class="absolute bottom-0 left-0 right-0 p-8 text-white">
                <div class="text-yellow-400 text-xl mb-2">★★★★★</div>
                <h3 class="text-3xl font-semibold mb-4 font-rebond">{{ testimonial.name }}</h3>
                <p class="lg:text-lg max-w-2xl">
                  "{{ testimonial.text }}"
                </p>
              </div>
            </div>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import { Swiper, SwiperSlide } from 'swiper/vue';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';

const testimonials = [
  {
    name: 'Patricia M.',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=1200&auto=format&fit=crop',
    text: 'He utilizado varías veces el servicio desde hace mucho tiempo y siempre ha sido eficiente, dentro del tiempo indicado y en caso de dudas dispuestos a solucionarlos. Excelente app y atención.'
  },
  {
    name: 'Rossina D.',
    image: '/images/testimoniomeli.jpeg',
    text: 'Utilizo la plataforma hace un buen tiempo y es muy fácil de usar, buen soporte técnico. Cualquier duda puede ser resolvida a travez del WhatsApp'
  },
  {
    name: 'Cynthia M.',
    image: '/images/seño1.png',
    text: 'Excelente servicio! Súper confiable, me depositaron el mismo día, muy agradecida con el servicio, se contactaron conmigo para brindarme todas las informaciones! Recomiendo al 100%! Solo confió en ellos!'
  },
  {
    name: 'Marco L.',
    image: '/images/historia1.png',
    text: 'La mejor opción para enviar dinero. El proceso es simple y la plataforma es muy fácil de usar. Totalmente recomendado.'
  }
];
</script>
<style>
.testimonial-slider {
  padding-bottom: 3rem !important;
  overflow: visible !important;
}

.testimonial-slider .swiper-button-next,
.testimonial-slider .swiper-button-prev {
  width: 48px !important;
  height: 48px !important;
  background-color: rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  color: #333;
  transform: translateY(-50%);
}

.testimonial-slider .swiper-button-next {
	right: -30px;
}
.testimonial-slider .swiper-button-prev {
	left: -30px;
}

.testimonial-slider .swiper-button-next:hover,
.testimonial-slider .swiper-button-prev:hover {
  background-color: white;
}

.testimonial-slider .swiper-pagination-bullet {
  background: white;
  opacity: 0.5;
}

.testimonial-slider .swiper-pagination-bullet-active {
  opacity: 1;
  background: white;
}

.swiper-button-next::after,
.swiper-button-prev::after {
  font-size: 1.25rem !important;
}

.swiper-slide {
  opacity: 0.4;
  transform: scale(0.9);
  transition: all 0.3s ease;
}

.swiper-slide-active {
  opacity: 1;
  transform: scale(1);
}

.swiper-slide-prev,
.swiper-slide-next {
  opacity: 0.4;
  transform: scale(0.85);
}

/* Fix for loop transition */
.swiper-slide-duplicate {
  opacity: 0.4;
  transform: scale(0.85);
}

.swiper-slide-duplicate-active {
  opacity: 1;
  transform: scale(1);
}
</style>