<template>
  <span class="mt-3">{{ availabilityMessage }} </span>
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
  const currentDate = new Date()
  const currentHour = currentDate.getHours()
  const currentDay = currentDate.getDay()
  
  // Check if it's weekend (Saturday = 6, Sunday = 0)
  if (currentDay === 0 || currentDay === 6) {
    availabilityMessage.value = 'Tu operación será atendida el siguiente día útil'
  } else if (currentHour >= 17) { // After 5 PM
    availabilityMessage.value = 'Tu dinero será procesado desde las 10am del 19/03 (Mañana)'
  } else {
    availabilityMessage.value = 'Los envíos de 9am a 5pm llegarán el mismo día.'
  }
}

</script>
