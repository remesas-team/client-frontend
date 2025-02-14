<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold">Método de pago</h2>
    <div class="space-y-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-1">
          Número de tarjeta
        </label>
        <input
          v-model="form.cardNumber"
          type="text"
          class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
      </div>
      <div class="grid grid-cols-2 gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            Fecha de expiración
          </label>
          <input
            v-model="form.expiry"
            type="text"
            placeholder="MM/YY"
            class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">
            CVV
          </label>
          <input
            v-model="form.cvv"
            type="text"
            class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
      </div>
    </div>
    <button
      @click="$emit('next')"
      class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
    >
      Pagar y continuar
    </button>
  </div>
</template>

<script setup lang="ts">
const form = reactive({
  cardNumber: '',
  expiry: '',
  cvv: ''
});

defineEmits<{
  (e: 'next'): void;
}>();
</script>