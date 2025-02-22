<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center space-y-2">
      <h2 class="text-3xl font-bold">Confirma tu transferencia</h2>
      <p class="text-gray-600">Move your money where it matters</p>
    </div>

    <!-- Timer Section -->
    <div class="text-center space-y-2">
      <p class="text-gray-600">Tipo de cambio garantizado durante:</p>
      <div class="flex items-center justify-center gap-2">
        <svg class="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-4xl font-bold">{{ formattedTimeRemaining }}</span>
      </div>
    </div>

    <!-- Exchange Rate Info -->
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Recibe en destino:</span>
        <span class="text-3xl font-bold">{{remittanceStore.form.destination_amount}} {{remittanceStore.form.destination_currency_symbol}}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Tipo de cambio</span>
        <span class="text-xl font-bold">1 {{ remittanceStore.form.source_currency_symbol }} = {{ remittanceStore.form.exchange_rate }} {{ remittanceStore.form.destination_currency_symbol }}</span>
      </div>
    </div>

    <!-- Transfer Details -->
    <div class="bg-gray-50 rounded-lg p-6 space-y-4">
      <h3 class="text-lg font-medium text-gray-700">Detalles del envío</h3>
      
      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-600">Costo de envío (+igv)</span>
          <span class="font-medium">{{ remittanceStore.form.send_cost + remittanceStore.form.send_tax }} {{ remittanceStore.form.source_currency_symbol }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Total a enviar</span>
          <span class="font-medium">{{ remittanceStore.form.amount_to_send }} {{ remittanceStore.form.source_currency_symbol }}</span>
        </div>
      </div>
    </div>

    <!-- Delivery Time Notice -->
    <p class="text-center text-gray-600">
      Tu dinero estará disponible en máximo 6h
    </p>

    <!-- Action Button -->
    <button
      @click="handleConfirm"
      class="w-full bg-gray-800 text-white py-4 rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium"
    >
      Realiza la tranferencia
    </button>
  </div>
</template>

<script setup lang="ts">
import {useRemittanceStore} from '~/stores/remittance';

const remittanceStore = useRemittanceStore()
const TIME_LIMIT = 15 * 60; // 15 minutes in seconds
const timeRemaining = ref(TIME_LIMIT);

// Format remaining time as MM:SS
const formattedTimeRemaining = computed(() => {
  const minutes = Math.floor(timeRemaining.value / 60);
  const seconds = timeRemaining.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// Timer countdown
onMounted(() => {
  const timer = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--;
    } else {
      clearInterval(timer);
      // Handle timeout - maybe show a message or redirect
    }
  }, 1000);

  // Clean up timer on component unmount
  onUnmounted(() => {
    clearInterval(timer);
  });
});

const emit = defineEmits<{
  (e: 'next'): void;
}>();

const handleConfirm = async () => {
  const responseOperation = await remittanceStore.createOperation()  
  remittanceStore.currentOperation = responseOperation.data

  emit('next');
};
</script>