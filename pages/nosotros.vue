<template>
  <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-[#EEF5FF]">
    <!-- Hero and Features Section - Responsive -->
    <div class="flex flex-col md:flex-row justify-between items-start md:items-stretch">
      <!-- Left Content -->
      <div class="w-full md:w-1/2 md:pr-8 mb-8 md:mb-0">
        <h1 class="text-3xl md:text-5xl font-bold text-gray-800 leading-tight mb-6">
          Enviamos más que dinero, conectamos familias <span class="text-pink-500">💕</span>
        </h1>
        
        <div class="space-y-6 md:space-y-8 mt-8 md:mt-12">
          <div class="flex items-center gap-3 md:gap-4">
            <div class="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <img src="/public/images/nosotros/Frame.svg" alt="Remesas icon" class="w-full h-full object-contain" />
            </div>
            <p class="text-base md:text-lg font-medium text-gray-800">Recibimos remesas entre Brasil y Perú por el momento</p>
          </div>
          
          <div class="flex items-center gap-3 md:gap-4">
            <div class="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <img src="/public/images/nosotros/tasas.svg" alt="Tasas icon" class="w-full h-full object-contain" />
            </div>
            <p class="text-base md:text-lg font-medium text-gray-800">Las mejores tasas y sin costos ocultos</p>
          </div>
          
          <div class="flex items-center gap-3 md:gap-4">
            <div class="w-10 h-10 md:w-12 md:h-12 flex-shrink-0">
              <img src="/public/images/nosotros/Group 43702.png" alt="Transferencia icon" class="w-full h-full object-contain" />
            </div>
            <p class="text-base md:text-lg font-medium text-gray-800">Transferencias en minutos, sin estrés</p>
          </div>
        </div>
      </div>
      
      <!-- Right side would have the image -->
      <div class="w-full md:w-1/2 flex-col align-center justify-center">
         <div>
             <img src="/public/images/nosotros/enviar_dinero.png" alt="">
         </div>
      </div>
    </div>
  </div>
  <nosotrosNuestroCompromiso />
</template>


<script setup>
definePageMeta({
    auth: false,
})

useSeoMeta({
    title: 'Nosotros | Remesas.com',
    description: 'Enviamos más que dinero, conectamos familias. Conoce nuestro propósito y nuestro equipo.',
    ogTitle: 'Nosotros | Remesas.com',
    ogDescription: 'Enviamos más que dinero, conectamos familias. Conoce nuestro propósito y nuestro equipo.',
    ogImage: 'https://remesas.com/thumbnail.png',
})
</script>
