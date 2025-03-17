<template>
	<div class="bg-white rounded-xl shadow-lg p-6">
		<h2 class="text-lg font-medium mb-6">Información Personal</h2>
		<div class="grid grid-cols-1 md:grid-cols-2 gap-6">
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-2"> Nombre </label>
				<input
					v-model="form.name"
					type="text"
					required
					class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
					placeholder="Ingresa tu nombre"
				/>

				<UFormField name="alias">
					<UInput
						v-model="formState.alias"
						type="text"
						placeholder="Nombre del destinatario"
						size="xl"
						disabled
						class="w-full text-xl disabled:text-gray-500"
					/>
				</UFormField>
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-2"> Apellido </label>
				<input
					v-model="form.last_name"
					type="text"
					required
					class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
					placeholder="Ingresa tu apellido"
				/>
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-2"> Correo electrónico </label>
				<input
					v-model="form.email"
					type="email"
					required
					class="w-full h-12 px-4 rounded-lg border-2 border-gray-200 focus:border-blue-500 focus:ring focus:ring-blue-200 transition-colors bg-white shadow-sm text-lg"
					placeholder="correo@ejemplo.com"
				/>
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-2"> Número de celular </label>
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
import { useAuthStore } from '@/stores/auth'
const authStore = useAuthStore()
const form = ref(authStore.user)
</script>
