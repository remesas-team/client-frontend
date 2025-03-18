<template>
	<main class="flex-1 container mx-auto px-4 py-8">
		<div class="max-w-2xl mx-auto">
			<!-- Loading State -->
			<div v-if="loading" class="flex justify-center items-center min-h-[400px]">
				<CircleLoader />
			</div>

			<!-- Error State -->
			<UAlert v-else-if="error" :description="error" color="red" variant="soft" class="mb-4" />

			<!-- Content -->
			<template v-else>
				<!-- Header -->
				<div class="text-center mb-8">
					<h1 class="text-3xl font-bold">Remesa N°{{ $route.params.id }}</h1>
					<p class="text-gray-600 mt-2">Estos son los detalles de tu remeesa</p>
				</div>
				<!-- Processing Order Widget -->
				<div v-if="remittance?.status_id === 1" 
					class="bg-blue-50 rounded-xl p-6 mb-8 border border-blue-100 hover:bg-blue-100 transition-colors duration-300">
					<div class="flex items-center space-x-4">
						<!-- Animated Processing Icon -->
						<div class="relative w-12 h-12 flex items-center justify-center">
							<div class="absolute animate-ping w-8 h-8 bg-blue-400 rounded-full opacity-20"></div>
							<div class="relative">
								<div class="h-8 w-8 text-blue-600">
									<div class="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
									<div class="absolute inset-0 border-4 border-blue-500 rounded-full border-t-transparent animate-spin">
									</div>
								</div>
							</div>
						</div>

						<div class="flex-1">
							<h3 class="text-lg font-semibold text-blue-700">Esperando comprobante de pago</h3>
							<p class="text-blue-600 text-sm mt-1">
								Para que tu remesa pueda ser procesada debes cargar el comprobante de pago.
							</p>
							<button 
								@click="goToUpload()"
								class="inline-block bg-blue-600 px-4 py-2 rounded-lg text-white text-sm mt-3 hover:bg-blue-700 transition-colors duration-300">
								Cargar comprobante de pago
								<span class="ml-2">→</span>
							</button>
						</div>
					</div>
				</div>
				<!-- Tracking Widget for Status > 1 -->
				<div v-if="remittance.status_id in {2:2,3:3}"
					class="bg-purple-50 rounded-xl p-6 mb-8 border border-purple-100 hover:bg-purple-100 transition-colors duration-300">
					<div class="flex items-center space-x-4">
						<!-- Animated Tracking Icon -->
						<div class="relative w-12 h-12 flex items-center justify-center">
							<div class="absolute animate-ping w-8 h-8 bg-purple-400 rounded-full opacity-20"></div>
							<div class="relative">
								<svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-purple-600" fill="none"
									viewBox="0 0 24 24" stroke="currentColor">
									<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
										d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
								</svg>
							</div>
						</div>

						<div class="flex-1">
							<h3 class="text-lg font-semibold text-purple-700">¡Tu remesa está en proceso! 🚀</h3>
							<p class="text-purple-600 text-sm mt-1">
								Dale seguimiento a tu operación en tiempo real
							</p>
							<NuxtLink :to="`/tracking/${$route.params.id}`"
								class="inline-block bg-purple-600 px-4 py-2 rounded-lg text-white text-sm mt-3 hover:bg-purple-700 transition-colors duration-300">
								Ver seguimiento
								<span class="ml-2">→</span>
							</NuxtLink>
						</div>
					</div>
				</div>

				<!-- Transaction Details Card -->
				<div class="bg-white rounded-xl shadow-lg p-8 [&>*]:mb-6">
					<!-- Status Section -->
					<div class="flex items-center justify-between pb-4 border-b">
						<span class="text-gray-600 font-bold text-lg">Datos de la operación</span>
						<span class="px-3 py-1 rounded-full text-sm font-medium" :class="{
								'bg-green-100 text-green-800': remittance.status === 'completed',
								'bg-yellow-100 text-yellow-800': remittance.status === 'in_progress',
								'bg-gray-100 text-gray-800': remittance.status === 'pending',
							}">
							{{ getStatusText(remittance.status) }}
						</span>
					</div>

					<!-- Amount Details -->
					<div class="[&>*]:mb-4">
						<div class="flex justify-between items-center">
							<span class="text-gray-600">Monto enviado</span>
							<span class="font-medium">{{ remittance.source_currency.code }} {{
				Number(remittance.source_amount).toFixed(2) }}</span>
						</div>

						<div class="flex justify-between items-center">
							<span class="text-gray-600">Tipo de cambio</span>
							<span class="font-medium">1 {{ remittance.source_currency.code }} = {{
				Number(remittance.exchange_rate).toFixed(2) }}
								{{ remittance.destination_currency_symbol }}</span>
						</div>

						<div class="flex justify-between items-center">
							<span class="text-gray-600">Comisión</span>
							<span class="font-medium">{{ remittance.source_currency.code }} {{
				Number(remittance.source_commission_fee).toFixed(2) }}</span>
						</div>

						<div class="flex justify-between items-center">
							<span class="text-gray-600">Impuestos</span>
							<span class="font-medium">{{ remittance.source_currency.code }} {{
				Number(remittance.source_tax).toFixed(2) }}</span>
						</div>

						<div class="flex justify-between items-center font-bold text-lg">
							<span>Monto a recibir</span>
							<span>{{ remittance.destination_currency.code }}
								{{ Number(remittance.destination_amount).toFixed(2) }}</span>
						</div>
					</div>

					<!-- Recipient Details -->
					<div class="pt-4 border-t [&>*]:mb-4">
						<h3 class="font-medium text-lg">Datos del destinatario</h3>

						<div class="[&>*]:mb-3">
							<div class="flex justify-between items-center">
								<span class="text-gray-600">Nombre</span>
								<span class="font-medium">{{ remittance.destination_user_account.alias }}</span>
							</div>

							<div class="flex justify-between items-center">
								<span class="text-gray-600">Banco</span>
								<span class="font-medium">{{ remittance.destination_user_account.bank.name }}</span>
							</div>

							<div class="flex justify-between items-center">
								<span class="text-gray-600">Cuenta</span>
								<span class="font-medium">{{ remittance.destination_user_account.account_number
									}}</span>
							</div>
						</div>
					</div>

					<!-- Date Information -->
					<div class="pt-4 border-t [&>*]:mb-4">
						<div class="flex justify-between items-center">
							<span class="text-gray-600">Fecha de creación</span>
							<span class="font-medium">{{ formatDate(remittance.created_at) }}</span>
						</div>

						<div v-if="remittance.completed_at" class="flex justify-between items-center">
							<span class="text-gray-600">Fecha de completado</span>
							<span class="font-medium">{{ formatDate(remittance.completed_at) }}</span>
						</div>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="mt-8 [&>*]:mb-4">
					<UButton 
						variant="solid"
						color="green-grass"
						block 
						size="xl" 
						to="/remittance"
						class="bg-green-grass text-white hover:bg-green-dark transition-colors duration-300 font-medium shadow-md"
					>
						Volver a transferencias
					</UButton>
				</div>
			</template>
		</div>
	</main>
</template>

<script setup lang="ts">
import { operationsRepository } from '~/repositories/v1/platform/operationsRepository'
import { useRemittanceStore } from '~/stores/remittance' // Import the remittance store

const route = useRoute()
const loading = ref(true)
const error = ref('')
const remittance = ref<any>(null)
const remittanceStore = useRemittanceStore() // Initialize the store

// Format date helper
const formatDate = (date: string) => {
	return new Date(date).toLocaleDateString('es-ES', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
	})
}

// Get status text helper
const getStatusText = (status: string) => {
	const statusMap: { [key: string]: string } = {
		completed: 'Completada',
		in_progress: 'En proceso',
		pending: 'Pendiente',
	}
	return statusMap[status] || status
}
const goToUpload = () => {
	// Add the current remittance to the store's CurrentOperation
	remittanceStore.CurrentOperation = remittance.value
	// Navigate to upload page (you might want to add navigation logic here)
	navigateTo('/operacion/4')
}

// Fetch remittance details
onMounted(async () => {
	try {
		const operations = operationsRepository()
		const response = await operations.getOperationById(route.params.id as string)

		if (!response.success) {
			throw new Error(response.message || 'Error al cargar los detalles de la remesa')
		}

		remittance.value = response.data.operation
		console.log(remittance.value)
	} catch (e: any) {
		error.value = e.message
	} finally {
		loading.value = false
	}
})
</script>
