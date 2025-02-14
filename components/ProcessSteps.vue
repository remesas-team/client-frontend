<template>
  <div class="bg-white p-6 rounded-xl shadow-lg">
    <h2 class="text-lg font-semibold mb-4">Cómo funciona</h2>
    <div class="space-y-6">
      <div v-for="(step, index) in steps" :key="index" class="flex">
        <div class="flex flex-col items-center mr-4">
          <div
            class="w-8 h-8 bg-blue-600 rounded-full text-white flex items-center justify-center"
          >
            {{ index + 1 }}
          </div>
          <div
            class="w-px h-full bg-gray-200"
            v-if="index !== steps.length - 1"
          ></div>
        </div>
        <div class="pb-4">
          <h3 class="font-medium mb-1">{{ step.title }}</h3>
          <p class="text-sm text-gray-600">{{ step.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface Step {
  title: string;
  description: string;
}

defineProps<{
  steps: Step[]
}>();
</script>