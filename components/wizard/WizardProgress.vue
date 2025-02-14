<template>
  <div class="mb-12">
    <!-- Progress Steps -->
    <div class="flex justify-between">
      <template v-for="(step, index) in steps" :key="step.number">
        <div class="flex flex-col items-center relative">
          <!-- Circle and Line -->
          <div class="flex items-center">
            <!-- Clickable Circle -->
            <div 
              role="button"
              tabindex="0"
              @click="handleStepClick(step.number)"
              @keyup.enter="handleStepClick(step.number)"
              class="w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors"
              :class="[
                currentStep >= step.number 
                  ? 'bg-blue-600 text-white hover:bg-blue-700 cursor-pointer' 
                  : 'bg-gray-200 text-gray-600'
              ]"
            >
              {{ step.number }}
            </div>
            
            <!-- Connecting Line -->
            <div 
              v-if="index < steps.length - 1"
              class="w-24 h-0.5 mx-2"
              :class="[
                currentStep > step.number 
                  ? 'bg-blue-600' 
                  : 'bg-gray-200'
              ]"
            ></div>
          </div>
          
          <!-- Label -->
          <div 
            role="button"
            tabindex="0"
            @click="handleStepClick(step.number)"
            @keyup.enter="handleStepClick(step.number)"
            class="absolute -bottom-6 w-24 text-center"
            :class="[
              currentStep >= step.number 
                ? 'text-gray-900 hover:text-blue-600 cursor-pointer' 
                : 'text-gray-500'
            ]"
          >
            <span class="text-xs">{{ step.label }}</span>
          </div>
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