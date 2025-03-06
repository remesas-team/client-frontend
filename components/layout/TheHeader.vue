<template>
  <header class="bg-white shadow">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex justify-between items-center">
        <NuxtLink to="/" class="text-xl font-bold text-gray-800">
          <img src="/images/logo.png" alt="" class="w-32 lg:w-45">
        </NuxtLink>

        <div class="flex items-center gap-4">
          <template v-if="authStore.isAuthenticated">
            <div class="relative" v-click-outside="closeDropdown">
              <button
                @click="toggleDropdown"
                class="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <span>{{ authStore.fullName }}</span>
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <div v-if="isDropdownOpen" class="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1">
                <NuxtLink
                  to="/perfil"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mi Perfil
                </NuxtLink>
                <NuxtLink
                  to="/remittance"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Mis operaciones
                </NuxtLink>
                <button
                  @click="handleLogout"
                  class="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                >
                  Cerrar sesión
                </button>
              </div>
            </div>
          </template>

          <template v-else>
            <NuxtLink
              to="/login"
              class="text-gray-600 hover:text-gray-900"
            >
              Inicia sesión
            </NuxtLink>
            <NuxtLink
              to="/registro"
              class="bg-green-dark text-white px-2 py-1 rounded-lg hover:bg-green-700"
            >
              Regístrate
            </NuxtLink>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>

<script setup lang="ts">
import {trackLogOut} from "~/tracking/events/authEvents";

const authStore = useAuthStore();
const isDropdownOpen = ref(false);

const toggleDropdown = () => {
  isDropdownOpen.value = !isDropdownOpen.value;
};

const closeDropdown = () => {
  isDropdownOpen.value = false;
};

const handleLogout = async () => {
  await authStore.logout();
  trackLogOut()
  closeDropdown();
};

const vClickOutside = {
  mounted(el: any, binding: any) {
    el.clickOutsideEvent = (event: Event) => {
      if (!(el === event.target || el.contains(event.target))) {
        binding.value();
      }
    };
    document.addEventListener('click', el.clickOutsideEvent);
  },
  unmounted(el: any) {
    document.removeEventListener('click', el.clickOutsideEvent);
  },
};
</script>
