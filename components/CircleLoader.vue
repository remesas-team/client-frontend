<template>
  <span
    class="animate-spin inline-block rounded-full border-b-transparent"
    :class="[props.borderWidth, props.borderColor]"
  />
</template>

<script setup lang="ts">
const props = defineProps({
  borderWidth: {
    type: String,
    default: 'border-4',
  },
  borderColor: {
    type: String,
    default: 'border-primary-500',
  },
})
</script>
