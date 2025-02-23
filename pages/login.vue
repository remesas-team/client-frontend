<template>
  <main class="flex-1 flex items-center justify-center p-4">
    <div class="w-full max-w-md">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <div class="text-center mb-8">
          <h1 class="text-2xl font-bold">Iniciar sesión</h1>
          <p class="text-gray-600 mt-2">Accede a tu cuenta</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-4">
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
                Contraseña
              </label>
              <input
                  v-model="form.password"
                  type="password"
                  required
                  class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
              />
            </div>
          </div>

          <div v-if="errorMessage" class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
            {{ errorMessage }}
          </div>

          <button
              type="submit"
              class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-medium"
              :disabled="isLoading"
          >
            {{ isLoading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
          </button>

          <p class="text-center text-sm text-gray-600">
            ¿No tienes una cuenta?
            <NuxtLink to="/registro" class="text-blue-600 hover:underline font-medium">
              Crear cuenta
            </NuxtLink>
          </p>
        </form>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
const router = useRouter();
const authStore = useAuthStore();

definePageMeta({
  auth: 'guest',
})

// Initialize form data with ref instead of reactive to avoid SSR issues
const form = ref({
  email: '',
  password: ''
});

const isLoading = ref(false);
const errorMessage = ref('');

const handleLogin = async () => {
  errorMessage.value = '';
  isLoading.value = true;

  const response = await authStore.login(form.value);

  if (!response.success) {
    errorMessage.value = response.message;
    isLoading.value = false;
    return;
  }

  router.push('/perfil');
};
</script>
