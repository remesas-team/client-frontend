<template>
  <main class="container mx-auto px-4 py-12">
    <h1 class="text-4xl font-bold mb-8 text-center">Centro de Ayuda</h1>
    <div class="max-w-3xl mx-auto">
      <div class="bg-white rounded-lg shadow-lg p-8">
        <h2 class="text-2xl font-semibold mb-6">Preguntas frecuentes</h2>

        <div class="[&>*]:mb-6">
          <div>
            <h3 class="text-lg font-medium mb-2">¿Cuánto tiempo tarda una transferencia?</h3>
            <p class="text-gray-600">Las transferencias a Brasil se completan en 2-3 horas en días hábiles.</p>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-2">¿Qué documentos necesito?</h3>
            <p class="text-gray-600">Solo necesitas un documento de identidad válido y los datos bancarios del
              destinatario.</p>
          </div>

          <div>
            <h3 class="text-lg font-medium mb-2">¿Cómo puedo contactar al soporte?</h3>
            <p class="text-gray-600">Estamos disponibles 24/7 a través de chat, email o teléfono.</p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
definePageMeta({
  auth: false,
})
</script>
