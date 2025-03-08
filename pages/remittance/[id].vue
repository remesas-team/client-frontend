<template>
	<main class="flex-1 container mx-auto px-4 py-8">
		<div class="max-w-2xl mx-auto">
			<!-- Loading State -->
			<div
				v-if="loading"
				class="flex justify-center items-center min-h-[400px]"
			>
				<CircleLoader />
			</div>

			<!-- Error State -->
			<UAlert
				v-else-if="error"
				:description="error"
				color="red"
				variant="soft"
				class="mb-4"
			/>

			<!-- Content -->
			<template v-else>
				<!-- Header -->
				<div class="text-center mb-8">
					<h1 class="text-3xl font-bold">Remesa N°{{ $route.params.id }}</h1>
					<p class="text-gray-600 mt-2">Estos son los detalles de tu remeesa</p>
				</div>

				<!-- Transaction Details Card -->
				<div class="bg-white rounded-xl shadow-lg p-8 [&>*]:mb-6">
					<!-- Status Section -->
					<div class="flex items-center justify-between pb-4 border-b">
						<span class="text-gray-600">Datos de la operación</span>
						<span
							class="px-3 py-1 rounded-full text-sm font-medium"
							:class="{
								'bg-green-100 text-green-800': remittance.status === 'completed',
								'bg-yellow-100 text-yellow-800': remittance.status === 'in_progress',
								'bg-gray-100 text-gray-800': remittance.status === 'pending',
							}"
						>
							{{ getStatusText(remittance.status) }}
						</span>
					</div>

					<!-- Amount Details -->
					<div class="[&>*]:mb-4">
						<div class="flex justify-between items-center">
							<span class="text-gray-600">Monto enviado</span>
							<span class="font-medium"
								>{{ remittance.source_currency_symbol }} {{ Number(remittance.source_amount).toFixed(2) }}</span
							>
						</div>

						<div class="flex justify-between items-center">
							<span class="text-gray-600">Tipo de cambio</span>
							<span class="font-medium"
								>1 {{ remittance.source_currency_symbol }} = {{ Number(remittance.exchange_rate).toFixed(2) }}
								{{ remittance.destination_currency_symbol }}</span
							>
						</div>

						<div class="flex justify-between items-center">
							<span class="text-gray-600">Comisión</span>
							<span class="font-medium"
								>{{ remittance.source_currency_symbol }} {{ Number(remittance.source_commission_fee).toFixed(2) }}</span
							>
						</div>

						<div class="flex justify-between items-center">
							<span class="text-gray-600">Impuestos</span>
							<span class="font-medium"
								>{{ remittance.source_currency_symbol }} {{ Number(remittance.source_tax).toFixed(2) }}</span
							>
						</div>

						<div class="flex justify-between items-center font-bold text-lg">
							<span>Monto a recibir</span>
							<span
								>{{ remittance.destination_currency_symbol }}
								{{ Number(remittance.destination_amount).toFixed(2) }}</span
							>
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
								<span class="font-medium">{{ remittance.destination_user_account.account_number }}</span>
							</div>
						</div>
					</div>

					<!-- Date Information -->
					<div class="pt-4 border-t [&>*]:mb-4">
						<div class="flex justify-between items-center">
							<span class="text-gray-600">Fecha de creación</span>
							<span class="font-medium">{{ formatDate(remittance.created_at) }}</span>
						</div>

						<div
							v-if="remittance.completed_at"
							class="flex justify-between items-center"
						>
							<span class="text-gray-600">Fecha de completado</span>
							<span class="font-medium">{{ formatDate(remittance.completed_at) }}</span>
						</div>
					</div>
				</div>

				<!-- Action Buttons -->
				<div class="mt-8 [&>*]:mb-4">
					<UButton
						variant="ghost"
						block
						size="xl"
						to="/remittance"
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

const route = useRoute()
const loading = ref(true)
const error = ref('')
const remittance = ref<any>(null)

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
