<template>
	<main class="flex-1 flex items-center justify-center p-4">
		<div class="w-full max-w-md">
			<div class="bg-white rounded-xl shadow-lg p-8">
				<div class="text-center mb-8">
					<h1 class="text-2xl font-bold">Iniciar sesión</h1>
					<p class="text-gray-600 mt-2">Accede a tu cuenta para empezar tu proceso de envío de dinero</p>
				</div>

				<form
					class="gap-4"
					@submit.prevent="handleLogin"
				>
					<div class="">
						<div class="mb-4">
							<label class="block text-sm font-medium text-gray-700 mb-1"> Correo electrónico: </label>
							<input
								v-model="form.email"
								type="email"
								required
								class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
							/>
						</div>
						<div class="mb-4">
							<label class="block text-sm font-medium text-gray-700 mb-1"> Contraseña: </label>
							<div class="relative">
								<input
									v-model="form.password"
									:type="showPassword ? 'text' : 'password'"
									required
									class="w-full h-12 px-4 pr-12 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
								/>
								<button
									type="button"
									class="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
									@click="showPassword = !showPassword"
								>
									<svg
										v-if="showPassword"
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
										/>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
										/>
									</svg>
									<svg
										v-else
										xmlns="http://www.w3.org/2000/svg"
										fill="none"
										viewBox="0 0 24 24"
										stroke-width="1.5"
										stroke="currentColor"
										class="w-6 h-6"
									>
										<path
											stroke-linecap="round"
											stroke-linejoin="round"
											d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
										/>
									</svg>
								</button>
							</div>
						</div>
					</div>

					<div
						v-if="errorMessage"
						class="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg"
					>
						{{ errorMessage }}
					</div>

					<button
						type="submit"
						class="w-full bg-green-dark text-white py-3 rounded-lg hover:bg-green-wather transition-colors text-lg font-medium mb-4"
						:disabled="isLoading"
					>
						{{ isLoading ? 'Iniciando sesión...' : 'Iniciar sesión' }}
					</button>
					<hr class="bg-gray-300 my-5 text-gray-200">
					<div class="text-center text-sm text-gray-600 flex flex-col gap-3">
						<span class="text-xl font-bold">¿Es tu primera vez enviando dinero?</span>
						<span class="">Crea una cuenta de usuario</span>
						<NuxtLink
							to="/registro"
							class="text-blue-600 text-lg text-white hover:underline font-medium bg-green-grass px-6 py-4 rounded-lg transition-colors hover:bg-green-dark"
						>
							Registrate aquí
						</NuxtLink>
					</div>
				</form>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
const router = useRouter()
const authStore = useAuthStore()
const showPassword = ref(false)
import { trackLogIn } from '~/tracking/events/authEvents'

definePageMeta({
	auth: 'guest',
})

useSeoMeta({
	title: 'Login | Remesas.com',
	description: 'Inicia sesión para empezar a enviar dinero a cualquier parte del Perú y Brasil',
})

// Initialize form data with ref instead of reactive to avoid SSR issues
const form = ref({
	email: '',
	password: '',
})

const isLoading = ref(false)
const errorMessage = ref('')

const handleLogin = async () => {
	errorMessage.value = ''
	isLoading.value = true

	const response = await authStore.login(form.value)

	if (!response.success) {
		errorMessage.value = response.message
		isLoading.value = false
		return
	}

	const config = useRuntimeConfig()
	const redirect = useCookie(config.public.auth.name_cookie_redirect)

	if (redirect.value) {
		router.push(redirect.value)
		redirect.value = null
		return
	}

	trackLogIn()

	router.push('/perfil')
}
</script>
