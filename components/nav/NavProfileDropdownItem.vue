<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
    :class="$attrs.class"
  >
    <span class="text-gray-400">
      <slot name="icon"></slot>
    </span>
    <span><slot></slot></span>
  </NuxtLink>
  <button
    v-else
    class="w-full flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50"
    :class="$attrs.class"
    @click="$emit('click')"
  >
    <span class="text-gray-400">
      <slot name="icon"></slot>
    </span>
    <span><slot></slot></span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  to?: string
}>();
</script>