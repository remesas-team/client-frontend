<template>
	<div class="space-y-6">
		<h2 class="text-xl font-semibold">Datos de la cuenta</h2>
		<div class="space-y-4">
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1"> Banco </label>
				<select
					v-model="form.bank"
					class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				>
					<option value="">Selecciona un banco</option>
					<option value="bradesco">Bradesco</option>
					<option value="itau">Itaú</option>
					<option value="bancodobrasil">Banco do Brasil</option>
				</select>
			</div>
			<div>
				<label class="block text-sm font-medium text-gray-700 mb-1"> Número de cuenta </label>
				<input
					v-model="form.accountNumber"
					type="text"
					class="w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
				/>
			</div>
		</div>
		<button
			class="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
			@click="$emit('next')"
		>
			Continuar
		</button>
	</div>
</template>

<script setup lang="ts">
const form = reactive({
	bank: '',
	accountNumber: '',
})

defineEmits<{
	(e: 'next'): void
}>()
</script>
