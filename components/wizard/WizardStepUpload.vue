<template>
  <div class="space-y-8">
    <!-- Timer Section -->
    <div class="text-center space-y-2">
      <h2 class="text-gray-600">Tipo de cambio garantizado durante:</h2>
      <div class="flex items-center justify-center gap-2">
        <svg class="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <span class="text-5xl font-bold">{{ formattedTimeRemaining }}</span>
      </div>
    </div>

    <!-- Transfer Method Selection
    <div class="bg-white rounded-lg border p-4">
      <div class="flex items-center gap-3">
        <svg class="w-6 h-6 text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5m4 0v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
        <span class="text-lg font-medium">Transferencia Bancaria</span>
        <svg class="w-5 h-5 text-gray-400 ml-auto" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
        </svg>
      </div>
    </div>
    -->

    <!-- Transfer Details -->
    <div class="space-y-4">
      <h3 class="text-lg font-medium">Datos para la transferencia</h3>
      <div class="space-y-4">
        <div class="flex justify-between items-center">
          <span class="text-gray-600">Cuenta bancaria BCP</span>
          <div class="flex items-center gap-2">
            <span class="font-medium">204010203010111</span>
            <button
              class="text-blue-600 hover:text-blue-700"
              @click="copyToClipboard('204010203010111')"
              title="Copiar número de cuenta"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-gray-600">Destinatario</span>
          <div class="flex items-center gap-2">
            <span class="font-medium">Remesas.com S.A.C</span>
            <button
              class="text-blue-600 hover:text-blue-700"
              @click="copyToClipboard('Remesas.com S.A.C')"
              title="Copiar nombre del destinatario"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
        </div>

        <div class="flex justify-between items-center">
          <span class="text-gray-600">Total a Transferir</span>
          <div class="flex items-center gap-2">
            <span class="font-medium">240 PEN</span>
            <button
              class="text-blue-600 hover:text-blue-700"
              @click="copyToClipboard('240')"
              title="Copiar monto"
            >
              <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload Section -->
    <div class="space-y-4">
      <h3 v-if="!selectedFile" class="text-xl font-bold text-center">Para confirmar tu transacción<br>sube el comprobante del depósito</h3>

      <div
        class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center space-y-4"
        :class="{ 'border-blue-500 bg-blue-50': isDragging }"
        @dragover.prevent="isDragging = true"
        @dragleave.prevent="isDragging = false"
        @drop.prevent="handleDrop"
        v-if="!selectedFile"
      >
        <div class="space-y-2">
          <p class="text-gray-600">Sube la Screenshot de tu transacción</p>
          <p class="text-gray-600">o</p>
          <p class="text-gray-600">Foto del voucher de depósito</p>
        </div>

        <input
          type="file"
          ref="fileInput"
          class="hidden"
          accept="image/*"
          @change="handleFileSelect"
        />

        <button
          @click="$refs.fileInput.click()"
          class="px-6 py-3 bg-green-wather text-white rounded-lg hover:bg-green-grass transition-colors"
        >
          Seleccionar archivo
        </button>
      </div>

      <!-- Selected File Preview -->
      <div v-if="selectedFile" class="bg-green-50 p-4 rounded-lg flex items-center justify-between">
        <div class="flex items-center gap-2">
          <svg class="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
          </svg>
          <span class="text-green-700">{{ selectedFile.name }}</span>
        </div>
        <button @click="selectedFile = null" class="text-gray-500 hover:text-gray-700">
          <svg class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>
    </div>

    <!-- Action Buttons -->
    <div class="space-y-4">
      <button
        @click="confirmTransaction"
        class="w-full bg-green-dark text-white py-4 rounded-lg hover:bg-green-grass transition-colors text-lg font-medium"
        :disabled="!selectedFile"
      >
        Confirmar transacción
      </button>

      <p class="text-center text-gray-600">
        Tu dinero estará disponible en máximo 6h
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import {operationsRepository} from "~/repositories/v1/platform/operationsRepository";
import {useRemittanceStore} from "~/stores/remittance";

const router = useRouter();
const requestOperations = operationsRepository();
const remittanceStore = useRemittanceStore();

const timer = ref();
const TIME_LIMIT = 15 * 60; // 15 minutes in seconds
const timeRemaining = ref(TIME_LIMIT);
const isDragging = ref(false);
const selectedFile = ref<File | null>(null);
const fileInput = ref<HTMLInputElement | null>(null);

// Format remaining time as MM:SS
const formattedTimeRemaining = computed(() => {
  const minutes = Math.floor(timeRemaining.value / 60);
  const seconds = timeRemaining.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

// Copy to clipboard function with feedback
const copyToClipboard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    // You could add a toast notification here
  } catch (err) {
    console.error('Failed to copy text: ', err);
  }
};

// File handling functions
const handleFileSelect = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    selectedFile.value = input.files[0];
  }
};

const handleDrop = (event: DragEvent) => {
  isDragging.value = false;
  if (event.dataTransfer?.files.length) {
    selectedFile.value = event.dataTransfer.files[0];
  }
};

const confirmTransaction = async () => {
  const operation_id = remittanceStore.currentOperation.operation_id

  const formData = new FormData();
  formData.append('user_voucher_file', selectedFile.value);
  formData.append('operation_id', operation_id.toString());

  const response = await requestOperations.postUploadVoucher(formData);

  if (!response.success) {
    return;
  }

  router.push('/operacion/success');
};

// Timer countdown
onMounted(() => {
  timer.value = setInterval(() => {
    if (timeRemaining.value > 0) {
      timeRemaining.value--;
    } else {
      clearInterval(timer.value);
    }
  }, 1000);
});

onUnmounted(() => {
  clearInterval(timer.value);
});
</script>
