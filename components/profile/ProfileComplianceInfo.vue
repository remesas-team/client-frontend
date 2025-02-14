<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-lg font-medium mb-6">Información de Cumplimiento</h2>
    
    <!-- PEP Declaration -->
    <div class="space-y-6">
      <div class="bg-gray-50 p-4 rounded-lg">
        <label class="block text-sm font-medium text-gray-700 mb-3">
          ¿Eres una Persona Expuesta Políticamente (PEP)?
        </label>
        <div class="space-y-2">
          <label class="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <input
              v-model="form.isPep"
              type="radio"
              :value="true"
              name="pep"
              class="w-4 h-4 text-blue-600"
            />
            <span class="ml-2 text-sm text-gray-700">Sí</span>
          </label>
          <label class="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <input
              v-model="form.isPep"
              type="radio"
              :value="false"
              name="pep"
              class="w-4 h-4 text-blue-600"
            />
            <span class="ml-2 text-sm text-gray-700">No</span>
          </label>
        </div>
      </div>

      <!-- PEP Related -->
      <div class="bg-gray-50 p-4 rounded-lg">
        <label class="block text-sm font-medium text-gray-700 mb-3">
          ¿Tienes familiares que son Personas Expuestas Políticamente?
        </label>
        <div class="space-y-2">
          <label class="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <input
              v-model="form.hasPepRelatives"
              type="radio"
              :value="true"
              name="pep-relatives"
              class="w-4 h-4 text-blue-600"
            />
            <span class="ml-2 text-sm text-gray-700">Sí</span>
          </label>
          <label class="flex items-center p-2 rounded-lg hover:bg-gray-100 cursor-pointer">
            <input
              v-model="form.hasPepRelatives"
              type="radio"
              :value="false"
              name="pep-relatives"
              class="w-4 h-4 text-blue-600"
            />
            <span class="ml-2 text-sm text-gray-700">No</span>
          </label>
        </div>
      </div>

      <!-- PEP Details (Conditional) -->
      <div v-if="form.isPep || form.hasPepRelatives" class="space-y-4">
        <div v-if="form.isPep">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Cargo o Función Pública
          </label>
          <input
            v-model="form.pepRole"
            type="text"
            class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
            placeholder="Ej: Congresista, Alcalde, etc."
          />
        </div>

        <div v-if="form.hasPepRelatives">
          <label class="block text-sm font-medium text-gray-700 mb-2">
            Relación con la Persona Expuesta Políticamente
          </label>
          <input
            v-model="form.pepRelationship"
            type="text"
            class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
            placeholder="Ej: Padre, Hermano, etc."
          />
        </div>
      </div>

      <!-- Source of Funds -->
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Origen de los Fondos
        </label>
        <select
          v-model="form.fundsSource"
          required
          class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg appearance-none"
        >
          <option value="salary">Salario</option>
          <option value="business">Negocio Propio</option>
          <option value="investments">Inversiones</option>
          <option value="inheritance">Herencia</option>
          <option value="other">Otro</option>
        </select>
      </div>

      <!-- Other Source of Funds (Conditional) -->
      <div v-if="form.fundsSource === 'other'">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Especifique el origen de los fondos
        </label>
        <input
          v-model="form.otherFundsSource"
          type="text"
          required
          class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface ComplianceInfo {
  isPep: boolean;
  hasPepRelatives: boolean;
  pepRole: string;
  pepRelationship: string;
  fundsSource: string;
  otherFundsSource: string;
}

const form = reactive<ComplianceInfo>({
  isPep: false,
  hasPepRelatives: false,
  pepRole: '',
  pepRelationship: '',
  fundsSource: 'salary',
  otherFundsSource: ''
});
</script>