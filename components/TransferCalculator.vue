<template>
  <div class="md:col-span-2">
    <div class="bg-white p-6 rounded-xl shadow-lg">
      <h1 class="text-2xl font-bold text-gray-800 mb-6">
        Envía dinero a Brasil
      </h1>

      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Tú envías</label>
        <div class="relative">
          <input
            type="number"
            v-model="amount"
            class="w-full p-3 border rounded-lg pr-16 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="200.00"
          />
          <span class="absolute right-3 top-3 text-gray-500">USD</span>
        </div>
      </div>

      <div class="bg-blue-50 p-4 rounded-lg mb-6">
        <div class="flex justify-between text-sm mb-2">
          <span class="text-gray-600">Tipo de cambio</span>
          <span class="font-medium">1 USD = {{ exchangeRate }} BRL</span>
        </div>
        <div class="flex justify-between font-medium">
          <span class="text-gray-700">Total a recibir:</span>
          <span class="text-blue-600">{{ totalAmount }} BRL</span>
        </div>
      </div>

      <div class="space-y-3 mb-8">
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">Costo de envío</span>
          <span>$20.00 USD</span>
        </div>
        <div class="flex justify-between text-sm">
          <span class="text-gray-600">Tasa de conversión</span>
          <span>0.42%</span>
        </div>
      </div>

      <button
        class="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors"
      >
        INICIAR OPERACIÓN
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const amount = ref<number>(200);
const exchangeRate = 5.67;

const totalAmount = computed(() => {
  return (amount.value * exchangeRate).toFixed(2);
});
</script>