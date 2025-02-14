<template>
  <div class="relative">
    <!-- Profile Button -->
    <button 
      @click="toggleDropdown"
      class="flex items-center space-x-2 focus:outline-none"
    >
      <div class="w-8 h-8 rounded-full bg-gray-200 overflow-hidden">
        <img 
          :src="avatarUrl" 
          alt="Profile"
          class="w-full h-full object-cover"
        />
      </div>
      <svg 
        class="w-4 h-4 text-gray-600 transition-transform duration-200"
        :class="{ 'transform rotate-180': isOpen }"
        fill="none" 
        stroke="currentColor" 
        viewBox="0 0 24 24"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
      </svg>
    </button>

    <!-- Dropdown Menu -->
    <div 
      v-show="isOpen"
      class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 z-50"
    >
      <NavProfileDropdownItem to="/perfil">
        <template #icon>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </template>
        Mi Perfil
      </NavProfileDropdownItem>

      <NavProfileDropdownItem to="/transferencias">
        <template #icon>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
          </svg>
        </template>
        Mis Transferencias
      </NavProfileDropdownItem>

      <div class="border-t border-gray-100 my-1"></div>

      <NavProfileDropdownItem @click="handleLogout" class="text-red-600 hover:text-red-700">
        <template #icon>
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
          </svg>
        </template>
        Cerrar Sesión
      </NavProfileDropdownItem>
    </div>
  </div>
</template>

<script setup>
const isOpen = ref(false);
const emit = defineEmits(['logout']);

// In a real app, this would come from your user store/state
const avatarUrl = ref('https://api.dicebear.com/7.x/avataaars/svg?seed=Felix');

const toggleDropdown = () => {
  isOpen.value = !isOpen.value;
};

const handleLogout = () => {
  isOpen.value = false;
  emit('logout');
};

// Close dropdown when clicking outside
onMounted(() => {
  const handleClickOutside = (event) => {
    if (isOpen.value && !event.target.closest('.relative')) {
      isOpen.value = false;
    }
  };

  document.addEventListener('click', handleClickOutside);
  onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside);
  });
});

// Close dropdown when pressing escape
onMounted(() => {
  const handleEscape = (event) => {
    if (event.key === 'Escape' && isOpen.value) {
      isOpen.value = false;
    }
  };

  document.addEventListener('keydown', handleEscape);
  onUnmounted(() => {
    document.removeEventListener('keydown', handleEscape);
  });
});
</script>