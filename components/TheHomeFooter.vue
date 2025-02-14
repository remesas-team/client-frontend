<template>
  <footer class="bg-gray-800 text-white py-8">
    <div class="max-w-6xl mx-auto px-4">
      <div class="flex flex-col md:flex-row justify-between items-center">
        <span class="h-8 mb-4 md:mb-0 text-white font-bold">Renectas</span>
        <div class="flex space-x-8">
          <a href="#" class="hover:text-blue-400 transition-colors">Seguridad</a>
          <a href="#" class="hover:text-blue-400 transition-colors">Soporte</a>
          <a href="#" class="hover:text-blue-400 transition-colors">Blog</a>
        </div>
      </div>
      <p class="text-center mt-8 text-gray-400 text-sm">
        © {{ currentYear }} Renectas. Todos los derechos reservados.
      </p>
    </div>
  </footer>
</template>

<script setup lang="ts">
const currentYear = computed(() => new Date().getFullYear());
</script>