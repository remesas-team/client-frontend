<template>
  <main class="flex-1 container mx-auto px-4 py-8">
    <div class="max-w-2xl mx-auto">
      <!-- Transaction Header -->
      <div class="text-center mb-12">
        <h1 class="text-3xl font-bold mb-4">Operación N°{{ $route.params.id }}</h1>
        <p class="text-gray-600">
          Tu transacción se encuentra en fase de transferencia puedes darle seguimiento a tu dinero paso a paso o
          comunicarte con
          <button
              @click="openSupportChat"
              class="text-blue-600 hover:text-blue-700 underline font-medium"
          >
            soporte técnico
          </button>
        </p>
      </div>

      <!-- Timeline -->
      <div class="relative">
        <!-- Vertical Line -->
        <div class="absolute left-[43px] top-0 bottom-0 w-0.5 bg-gray-200"></div>

        <!-- Timeline Steps -->
        <div class="space-y-8">
          <div v-for="(step, index) in steps" :key="index" class="flex items-start gap-6">
            <!-- Circle -->
            <div
                class="relative z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center"
                :class="[
                  step.status === 'completed' ? 'bg-green-500' :
                  step.status === 'pending' ? 'bg-gray-300' : 'bg-gray-300'
                ]"
            >
              <span class="text-white font-medium">{{ index + 1 }}</span>
            </div>

            <!-- Content -->
            <div class="flex-1 pt-1">
              <h3 class="text-lg font-medium mb-1">{{ step.title }}</h3>
              <div class="flex items-center gap-2">
                  <span
                      :class="[
                      step.status === 'completed' ? 'text-green-600' :
                      step.status === 'pending' ? 'text-gray-500' : 'text-gray-500'
                    ]"
                  >
                    {{ step.status === 'completed' ? step.date : 'Pendiente' }}
                  </span>
                <svg
                    v-if="step.status === 'completed'"
                    class="w-5 h-5 text-green-500"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                  <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clip-rule="evenodd"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Support Button -->
      <div class="mt-12">
        <button
            @click="openSupportChat"
            class="w-full bg-gray-800 text-white py-4 rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium"
        >
          Contactar con soporte
        </button>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { useRemittanceStore } from '@/stores/remittance'
import { useRoute } from 'vue-router'

interface Step {
  title: string;
  status: 'completed' | 'pending';
  date?: string;
}

const route = useRoute()
const remittanceStore = useRemittanceStore()


const steps = ref<Step[]>([
  {
    title: 'Recolectado dinero en origen',
    status: 'completed',
    date: '13:40 12/02/2023'
  },
  {
    title: 'Transferido a Destino',
    status: 'completed',
    date: '13:40 12/02/2023'
  },
  {
    title: 'Depositado a destinatario',
    status: 'pending'
  },
  {
    title: 'Transacción terminada',
    status: 'pending'
  }
]);

const openSupportChat = () => {
  // Here you would implement the logic to open the support chat
  console.log('Opening support chat...');
};

onMounted(async () => {
  await remittanceStore.getOperationTracking(route.params.id)
})
</script>
