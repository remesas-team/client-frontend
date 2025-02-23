<template>
  <main class="flex-1 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold">Crear cuenta</h1>
          <p class="text-gray-600 mt-2">Únete a nuestra plataforma de envíos</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-6">
          <div class="space-y-4">
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Nombre
              </label>
              <input
                  v-model="form.name"
                  type="text"
                  required
                  class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Apellido
              </label>
              <input
                  v-model="form.last_name"
                  type="text"
                  required
                  class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Correo electrónico
              </label>
              <input
                  v-model="form.email"
                  type="email"
                  required
                  class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Teléfono
              </label>
              <div class="flex gap-2">
                <select
                    v-model="form.phone_code"
                    class="w-24 h-12 px-2 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
                >
                  <option value="+51">+51</option>
                </select>
                <input
                    v-model="form.phone"
                    type="tel"
                    required
                    class="flex-1 w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
                />
              </div>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Tipo de documento
              </label>
              <select
                  v-model="form.doc_type_id"
                  class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
              >
                <option value="1">DNI</option>
              </select>
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Número de documento
              </label>
              <input
                  v-model="form.doc_value"
                  type="text"
                  required
                  class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Contraseña
              </label>
              <input
                  v-model="form.password"
                  type="password"
                  required
                  class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
              />
            </div>

            <div>
              <label class="block text-sm font-medium text-gray-700 mb-1">
                Confirmar contraseña
              </label>
              <input
                  v-model="form.password_confirmation"
                  type="password"
                  required
                  class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
              />
            </div>
          </div>

          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                  v-model="form.acceptTerms"
                  type="checkbox"
                  required
                  class="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500"
              />
            </div>
            <div class="ml-3">
              <label class="text-sm text-gray-700">
                Acepto los
                <a href="#" class="text-blue-600 hover:underline">términos y condiciones</a>
                y la
                <a href="#" class="text-blue-600 hover:underline">política de privacidad</a>
              </label>
            </div>
          </div>

          <div v-if="errorMessage || Object.keys(validationErrors).length > 0" class="space-y-2">
            <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
              {{ errorMessage }}
            </div>

            <div v-if="Object.keys(validationErrors).length > 0"
                 class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg space-y-2">
              <div v-for="(errors, field) in validationErrors" :key="field">
                <p v-for="error in errors" :key="error">{{ error }}</p>
              </div>
            </div>
          </div>

          <button
              type="submit"
              class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              :disabled="isLoading"
          >
            {{ isLoading ? 'Registrando...' : 'Crear cuenta' }}
          </button>

          <p class="text-center text-sm text-gray-600">
            ¿Ya tienes una cuenta?
            <NuxtLink to="/login" class="text-blue-600 hover:underline font-medium">
              Iniciar sesión
            </NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import {useAuthStore} from "~/stores/auth";

const { $auth } = useNuxtApp();
const router = useRouter();
const config = useRuntimeConfig();
const authStore = useAuthStore();

definePageMeta({
  auth: 'guest',
})

const isLoading = ref(false);
const errorMessage = ref('');
const validationErrors = ref<Record<string, string[]>>({});

const form = reactive({
  name: 'John',
  last_name: 'Doe',
  email: 'john.doe@example.com',
  phone_code: '+51',
  phone: '987654321',
  doc_type_id: 1,
  doc_value: '12345678',
  is_pep: false,
  is_pep_familiar: false,
  occupation_id: 5,
  genre: 'hombre',
  birth_date: '1990-01-01',
  civil_status: 'soltero',
  address: '123 Main Street, Springfield',
  geo_district_id: 10,
  password: 'Password123!',
  password_confirmation: 'Password123!',
  acceptTerms: false
});

const handleRegister = async () => {
  errorMessage.value = '';
  validationErrors.value = {};

  if (form.password !== form.password_confirmation) {
    errorMessage.value = 'Las contraseñas no coinciden';
    return;
  }

  try {
    isLoading.value = true;
    const apiUrl = `${config.public.baseUrl}/api/v1/platform/auth/register`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({
        name: form.name,
        last_name: form.last_name,
        email: form.email,
        phone_code: form.phone_code,
        phone: parseInt(form.phone),
        doc_type_id: form.doc_type_id,
        doc_value: form.doc_value,
        is_pep: form.is_pep,
        is_pep_familiar: form.is_pep_familiar,
        occupation_id: form.occupation_id,
        genre: form.genre,
        birth_date: form.birth_date,
        civil_status: form.civil_status,
        address: form.address,
        geo_district_id: form.geo_district_id,
        password: form.password,
        password_confirmation: form.password_confirmation
      })
    });

    const data = await response.json();

    if (!response.ok) {
      if (data.errors) {
        validationErrors.value = data.errors;
        errorMessage.value = data.message;
      } else {
        throw new Error(data.message || 'Error al registrar usuario');
      }
      return;
    }

    $auth.setToken(data.data.access_token);
    authStore.user = data.data.user;

    // Redirect to profile completion
    router.push('/perfil');
  } catch (error) {
    console.error('Error:', error);
    errorMessage.value = error instanceof Error ? error.message : 'Error al registrar usuario';
  } finally {
    isLoading.value = false;
  }
};
</script>
