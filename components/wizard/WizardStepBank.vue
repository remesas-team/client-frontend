<template>
	<div class="space-y-6">
		<h2 class="text-xl font-semibold mb-6">Selecciona el banco</h2>

		<!-- Bank Selection -->
		<div class="grid grid-cols-2 gap-4">
			<button
				v-for="bank in banks"
				:key="bank.id"
				class="p-4 border-2 rounded-lg text-center hover:border-blue-600 transition-colors"
				:class="[selectedBank?.id === bank.id ? 'border-blue-600 bg-blue-50' : 'border-gray-200']"
				@click="selectBank(bank)"
			>
				<img
					:src="bank.logo"
					:alt="bank.name"
					class="h-8 object-contain mx-auto mb-2"
				/>
				<span class="text-sm font-medium">{{ bank.name }}</span>
			</button>
		</div>

		<!-- Navigation Buttons -->
		<div class="[&>*]:mb-3 mt-8">
			<button
				class="w-full bg-green-grass text-white py-3 rounded-lg hover:bg-blue-700 transition-colors"
				:disabled="!selectedBank"
				@click="handleNext"
			>
				Continuar
			</button>

			<button
				class="w-full bg-gray-100 text-gray-600 py-3 rounded-lg hover:bg-gray-200 transition-colors"
				@click="$emit('back')"
			>
				Atrás
			</button>
		</div>
	</div>
</template>

<script setup lang="ts">
interface Bank {
	id: string
	name: string
	logo: string
}

const banks: Bank[] = [
	{
		id: 'bradesco',
		name: 'Bradesco',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banco_Bradesco_logo.svg/2560px-Banco_Bradesco_logo.svg.png',
	},
	{
		id: 'itau',
		name: 'Itaú',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banco_Itau_logo.svg/2560px-Banco_Itau_logo.svg.png',
	},
	{
		id: 'bancodobrasil',
		name: 'Banco do Brasil',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Banco_do_Brasil_logo.svg/2560px-Banco_do_Brasil_logo.svg.png',
	},
	{
		id: 'caixa',
		name: 'Caixa',
		logo: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Caixa_Econ%C3%B4mica_Federal_logo.svg/2560px-Caixa_Econ%C3%B4mica_Federal_logo.svg.png',
	},
]

const selectedBank = ref<Bank | null>(null)

const selectBank = (bank: Bank) => {
	selectedBank.value = bank
}

const handleNext = () => {
	if (selectedBank.value) {
		emit('next')
	}
}

const emit = defineEmits<{
	(e: 'next'): void
	(e: 'back'): void
}>()
</script>
