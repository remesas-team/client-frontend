<template>
  <div class="bg-white rounded-xl shadow-lg p-6">
    <h2 class="text-lg font-medium mb-6">Información Personal</h2>
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Nombre
        </label>
        <input
          v-model="form.firstName"
          type="text"
          required
          class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
          placeholder="Ingresa tu nombre"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Apellido
        </label>
        <input
          v-model="form.lastName"
          type="text"
          required
          class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
          placeholder="Ingresa tu apellido"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Correo electrónico
        </label>
        <input
          v-model="form.email"
          type="email"
          required
          class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
          placeholder="correo@ejemplo.com"
        />
      </div>
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Número de celular
        </label>
        <input
          v-model="form.phone"
          type="tel"
          required
          class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
          placeholder="+51 999 888 777"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
interface PersonalInfo {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

const form = reactive<PersonalInfo>({
  firstName: 'Juan',
  lastName: 'Pérez',
  email: 'juan.perez@example.com',
  phone: '+51 999 888 777'
});
</script>