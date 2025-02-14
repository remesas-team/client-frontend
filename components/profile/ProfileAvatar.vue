<template>
  <div class="flex flex-col items-center space-y-4">
    <div class="relative group">
      <div class="w-32 h-32 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
        <img 
          :src="modelValue || defaultAvatar" 
          alt="Profile Avatar"
          class="w-full h-full object-cover"
        />
      </div>
      <div 
        class="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
        @click="$refs.avatarInput.click()"
      >
        <span class="text-white text-sm">Cambiar foto</span>
      </div>
      <input
        ref="avatarInput"
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleAvatarChange"
      />
    </div>
    <p class="text-sm text-gray-500">
      Click para cambiar tu foto de perfil
    </p>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  modelValue: string | null;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string | null): void;
}>();

const defaultAvatar = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Felix';

const handleAvatarChange = (event: Event) => {
  const input = event.target as HTMLInputElement;
  if (input.files && input.files[0]) {
    const file = input.files[0];
    
    if (!file.type.startsWith('image/')) {
      alert('Por favor selecciona una imagen válida');
      return;
    }
    
    if (file.size > 5 * 1024 * 1024) {
      alert('La imagen no debe exceder 5MB');
      return;
    }
    
    const reader = new FileReader();
    reader.onload = (e) => {
      emit('update:modelValue', e.target?.result as string);
    };
    reader.readAsDataURL(file);
  }
};
</script>