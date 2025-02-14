<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-lg font-medium mb-6">Información de Documento</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Tipo de Documento
        </label>
        <select
          v-model="form.documentType"
          required
          class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg appearance-none"
        >
          <option value="dni">DNI</option>
          <option value="passport">Pasaporte</option>
          <option value="ce">Carnet de Extranjería</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Número de Documento
        </label>
        <input
          v-model="form.documentNumber"
          type="text"
          required
          class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
          placeholder="12345678"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface DocumentInfo {
  documentType: string;
  documentNumber: string;
}

const form = reactive<DocumentInfo>({
  documentType: 'dni',
  documentNumber: '12345678'
});
</script>