<template>
  <div class="space-y-6">
    <div class="bg-white p-6 rounded-xl shadow-lg">
      <h2 class="text-lg font-semibold mb-4">Por qué elegirnos</h2>
      <ul class="space-y-4">
        <li class="flex items-center">
          <svg
            class="w-5 h-5 text-blue-600 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm">Transferencias instantáneas</span>
        </li>
        <li class="flex items-center">
          <svg
            class="w-5 h-5 text-blue-600 mr-2"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fill-rule="evenodd"
              d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a1 1 0 110 2H5a1 1 0 110-2h12V4H4zm3 2a1 1 0 011-1h4a1 1 0 110 2H8a1 1 0 01-1-1z"
              clip-rule="evenodd"
            />
          </svg>
          <span class="text-sm">Tarifas bajas y transparentes</span>
        </li>
      </ul>
    </div>

    <ProcessSteps :steps="steps" />
  </div>
</template>

<script setup lang="ts">
interface Step {
  title: string;
  description: string;
}

const steps = ref<Step[]>([
  {
    title: 'Cotiza tu transferencia',
    description: 'Regístrate y realiza tu operación',
  },
  {
    title: 'Especifica los datos de tu envío',
    description: 'Ingresa los datos del destinatario',
  },
  {
    title: '¡Listo! Tu dinero será enviado',
    description: 'Confirmación instantánea',
  },
]);
</script>