<template>
  <div class="mb-8 px-4">
    <!-- Progress Steps -->
    <div class="flex w-full items-center justify-between">
      <template v-for="(step, index) in steps" :key="step.number">
        <div class="flex items-center">
          <!-- Circle -->
          <button
            @click="handleStepClick(step.number)"
            class="w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            :class="[
              currentStep >= step.number
                ? 'bg-blue-600 text-white hover:bg-blue-700'
                : 'bg-gray-200 text-gray-600'
            ]"
          >
            {{ step.number }}
          </button>

          <!-- Connecting Line -->
          <div
            v-if="index < steps.length - 1"
            class="h-0.5 w-full min-w-[2rem] sm:min-w-[4rem] mx-2 sm:mx-3"
            :class="[
              currentStep > step.number
                ? 'bg-blue-600'
                : 'bg-gray-200'
            ]"
          ></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
const router = useRouter();

interface Step {
  number: number;
  label: string;
}

const steps: Step[] = [
  { number: 1, label: 'Destinatario' },
  { number: 2, label: 'Cuenta de origen' },
  { number: 3, label: 'Confirma transacción' },
  { number: 4, label: 'Selecciona banco' },
  { number: 5, label: 'Sube comprobante' }
];

const props = defineProps<{
  currentStep: number;
}>();

const handleStepClick = (stepNumber: number) => {
  router.push(`/wizard/${stepNumber}`);
};
</script>