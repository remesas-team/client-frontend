<template>
  <div>
    <!-- Show login/register buttons when not authenticated -->
    <div v-if="!isAuthenticated" class="flex items-center space-x-4">
      <NuxtLink 
        to="/login" 
        class="text-gray-600 hover:text-blue-600 font-medium"
      >
        Iniciar sesión
      </NuxtLink>
      <NuxtLink 
        to="/registro" 
        class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Registrarse
      </NuxtLink>
    </div>

    <!-- Show profile when authenticated -->
    <NavProfile v-else @logout="logout" />
  </div>
</template>

<script setup>
import NavProfile from './NavProfile.vue'

const isAuthenticated = ref(false);

const logout = () => {
  isAuthenticated.value = false;
};
</script>