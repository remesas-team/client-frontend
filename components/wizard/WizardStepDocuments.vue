<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold">Documentos requeridos</h2>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Documento de identidad
        </label>
        <input
          type="file"
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Comprobante de domicilio
        </label>
        <input
          type="file"
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
    </div>
    <button
      @click="$emit('next')"
      class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Continuar
    </button>
  </div>
</template>

<script setup lang="ts">
defineEmits<{
  (e: 'next'): void;
}>();
</script>