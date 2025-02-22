<template>
  <div class="mb-8 px-4">
    <!-- Progress Steps -->
    <div class="flex w-full items-center">
      <template v-for="(step, index) in steps" :key="step.number">
        <div class="flex items-center flex-1 last:flex-none">
          <!-- Circle -->
          <button
            @click="handleStepClick(step.number)"
            class="shrink-0 w-8 h-8 sm:w-12 sm:h-12 rounded-full flex items-center justify-center text-sm sm:text-base font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-green-grass focus:ring-offset-2"
            :class="[
              currentStep >= step.number
                ? 'bg-green-grass text-white hover:bg-green-wather'
                : 'bg-gray-200 text-gray-600'
            ]"
          >
            {{ step.number }}
          </button>

          <!-- Connecting Line -->
          <div
            v-if="index < steps.length - 1"
            class="h-0.5 flex-1 mx-2 sm:mx-3"
            :class="[
              currentStep > step.number
                ? 'bg-green-grass'
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
  { number: 3, label: 'Valida los datos' },
  { number: 4, label: 'Confirma transacción' }
];

const props = defineProps<{
  currentStep: number;
}>();

const handleStepClick = (stepNumber: number) => {
  router.push(`/operacion/${stepNumber}`);
};
</script>