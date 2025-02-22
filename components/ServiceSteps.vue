<template>
  <div class="mt-16">
    <h3 class="text-4xl text-center font-bold mb-8">Envía dinero a casa en 
      <span class="text-blue w-full text-green-wather">3 simples pasos</span>
    </h3>
    <div class="grid md:grid-cols-2 gap-8">
      <div
        v-for="(step, index) in steps"
        :key="index"
        class="bg-white rounded-lg shadow-lg overflow-hidden"
      >
        <img 
          :src="step.image"
          :alt="step.alt"
          class="w-full h-40 object-cover"
        />
        <div class="p-6">
          <h4 class="text-lg mb-2 font-bold">{{ step.title }}</h4>
          <p class="text-gray-600 text-sm">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const steps = [
  {
    image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3',
    alt: 'Persona usando una calculadora',
    title: '1. Registra tus datos',
    description: 'Para cumplir con las normativas y leyes de cada país te vamos a pedir información para que puedas enviar dineros de forma segura'
  },
  {
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c',
    alt: 'Persona llenando formulario',
    title: '2. Rellena los datos del Envío',
    description: 'Ingresa la información del destinatario'
  },
  {
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3',
    alt: 'Pago seguro con transferencia bancaria',
    title: '3. Realiza la transferencia',
    description: 'Múltiples métodos de pago disponibles'
  },
  {
    image: 'https://images.unsplash.com/photo-1579621970588-a35d0e7ab9b6',
    alt: 'Transferencia completada',
    title: '¡Listo! Tu dinero llegará en pocas horas',
    description: 'Tu dinero llega en 2-3 horas'
  }
];
</script>