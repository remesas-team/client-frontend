<template>
  <main class="flex-1 flex items-center justify-center py-12 px-4">
    <div class="w-full max-w-2xl">
      <!-- Progress Steps -->
      <WizardProgress :current-step="currentStep"/>

      <!-- Step Content -->
      <div class="bg-white rounded-xl shadow-lg p-8">
        <component
            :is="currentComponent"
            @next="nextStep"
            @back="goBack"
        />
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const currentStep = computed(() => parseInt(route.params.step as string));

// Dynamic component loading based on current step
const currentComponent = computed(() => {
  switch (currentStep.value) {
    case 1:
      return resolveComponent('WizardStepRecipient');
    case 2:
      return resolveComponent('WizardStepOrigin');
    case 3:
      return resolveComponent('WizardStepConfirmation');
    case 4:
      return resolveComponent('WizardStepBank');
    case 5:
      return resolveComponent('WizardStepUpload'); // This was the issue - component name was incorrect
    default:
      return null;
  }
});

const nextStep = () => {
  if (currentStep.value < 5) {
    router.push(`/wizard/${currentStep.value + 1}`);
  }
};

const goBack = () => {
  if (currentStep.value > 1) {
    router.push(`/wizard/${currentStep.value - 1}`);
  }
};

// Redirect to step 1 if invalid step
onMounted(() => {
  if (![1, 2, 3, 4, 5].includes(currentStep.value)) {
    router.replace('/wizard/1');
  }
});
</script>
