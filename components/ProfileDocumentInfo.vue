<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-xl font-semibold mb-4">Información de Documento</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Tipo de Documento</label>
        <select v-model="form.doc_type_id" class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors">
          <option value="1">DNI</option>
        </select>
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">Número de Documento</label>
        <input v-model="form.doc_value" type="text" class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore();
const form = reactive({
  doc_type_id: authStore.user?.doc_type_id || 1,
  doc_value: authStore.user?.doc_value || ''
});

defineExpose({ form });
</script>