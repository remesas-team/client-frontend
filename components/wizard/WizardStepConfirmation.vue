<template>
  <div class="space-y-8">
    <!-- Header -->
    <div class="text-center space-y-2 my-5 mb-10">
      <h2 class="text-3xl font-bold">Todo listo para realizar la transferencia</h2>
      <p class="text-gray-600">Revisa bien los datos de la transacción. Recuerda que tienes un tiempo limitado para
        mantener el mejor tipo de cambio garantizado.</p>
    </div>

    <!-- Exchange Rate Info -->
    <div class="space-y-4">
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Recibe en destino:</span>
        <span
            class="text-2xl font-bold">{{
            remittanceStore.form.destination_amount
          }} {{ remittanceStore.form.destination_currency_symbol }}</span>
      </div>
      <div class="flex justify-between items-center">
        <span class="text-gray-600">Tipo de cambio</span>
        <span class="text-xl font-bold">1 {{
            remittanceStore.form.source_currency_symbol
          }} = {{ remittanceStore.form.exchange_rate }} {{ remittanceStore.form.destination_currency_symbol }}</span>
      </div>
    </div>

    <!-- Transfer Details -->
    <div class="bg-gray-50 rounded-lg p-6 space-y-4">
      <h3 class="text-lg font-medium text-gray-700">Detalles del envío</h3>

      <div class="space-y-3">
        <div class="flex justify-between">
          <span class="text-gray-600">Total enviado</span>
          <span class="font-medium">{{ remittanceStore.form.source_amount }} {{ remittanceStore.form.source_currency_symbol }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Costo de envío (+igv)</span>
          <span class="font-medium">{{
              remittanceStore.form.send_cost + remittanceStore.form.send_tax
            }} {{ remittanceStore.form.source_currency_symbol }}</span>
        </div>
        <div class="flex justify-between">
          <span class="text-gray-600">Total a convertir</span>
          <span class="font-medium">{{
              remittanceStore.form.amount_to_send
            }} {{ remittanceStore.form.source_currency_symbol }}</span>
        </div>
      </div>
    </div>

    <UAlert
        v-if="errorGeneral"
        :description="errorGeneral"
        color="error"
        variant="soft"
    />

    <!-- Action Button -->
    <UButton
        type="submit"
        size="xl"
        color="primary"
        block
        class="w-full mt-2 text-lg font-medium h-14 bg-green-grass text-center hover:bg-green-grass cursor-pointer"
        :loading="loadingSubmit"
        @click="handleConfirm"

    >
      Realiza la transferencia
    </UButton>

    <!-- Delivery Time Notice -->
    <p class="text-center text-gray-600 flex flex-col direction-column items-center justify-center gap-2 text-[#2e7d6b]">
      <UIcon name="i-mdi:run-fast"></UIcon>
      <span> Tu dinero estará disponible el mismo día</span>
    </p>
  </div>
</template>

<script setup lang="ts">
import {useRemittanceStore} from '~/stores/remittance';

const emit = defineEmits<{
  (e: 'next'): void;
}>();

const remittanceStore = useRemittanceStore()

const TIME_LIMIT = 15 * 60; // 15 minutes in seconds
const timeRemaining = ref(TIME_LIMIT);
const loadingSubmit = ref(false)
const errorGeneral = ref('')

const handleConfirm = async () => {
  errorGeneral.value = ''
  loadingSubmit.value = true

  const response = await remittanceStore.createOperation()

  if (!response.success) {
    loadingSubmit.value = false
    errorGeneral.value = response.message
    return
  }

  console.log(response.data)
  remittanceStore.newOperation = ref(response.data);

  emit('next');
};

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
</script>
