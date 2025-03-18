<template>
  <span>{{ availabilityMessage }} </span>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const availabilityMessage = ref('Tu dinero estará disponible el mismo día')

onMounted(() => {
  updateMessage()
  // Update message every minute
  setInterval(updateMessage, 60000)
})

const updateMessage = () => {
  const currentHour = new Date().getHours()
  
  if (currentHour >= 18) { // After 6 PM
    availabilityMessage.value = 'Tu dinero estará disponible mañana a primeras horas'
  } else {
    availabilityMessage.value = 'Tu dinero estará disponible el mismo día'
  }
}
</script>
