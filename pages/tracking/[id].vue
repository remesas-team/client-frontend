<template>
	<main class="flex-1 container mx-auto px-4 py-8">
		<div class="max-w-2xl mx-auto">
			<!-- Transaction Header -->
			<div class="text-center mb-12">
				<h1 class="text-3xl font-bold mb-4">Operación N°{{ $route.params.id }}</h1>
				<p class="text-gray-600">
					Tu operación se encuentra en fase de transferencia puedes darle seguimiento a tu dinero paso a paso o
					comunicarte con
					<button
						class="text-blue-600 hover:text-blue-700 underline font-medium"
						@click="openSupportChat"
					>
						soporte técnico
					</button>
				</p>
			</div>

			<!-- Timeline -->
			<div class="relative">
				<!-- Vertical Line -->
				<div class="absolute left-[43px] top-0 bottom-0 w-0.5 bg-gray-200"></div>

				<!-- Timeline Steps -->
				<div class="space-y-8">
					<div
						v-for="(step, index) in tracking"
						:key="index"
						class="flex items-start gap-6"
					>
						<!-- Circle -->
						<div
							class="relative z-10 w-[30px] h-[30px] rounded-full flex items-center justify-center"
							:class="[step.status != 'pendiente' ? 'bg-green-500' : 'bg-gray-300']"
						>
							<span class="text-white font-medium">{{ index + 1 }}</span>
						</div>

						<!-- Content -->
						<div class="flex-1 pt-1">
							<h3 class="text-lg font-medium mb-1">{{ step.title }}</h3>
							<div class="flex items-center gap-2">
								<span :class="[step.status != 'pendiente' ? 'text-green-600' : 'text-gray-500']">
									{{ step.status }}
								</span>
								<svg
									v-if="step.status != 'pendiente'"
									class="w-5 h-5 text-green-500"
									viewBox="0 0 20 20"
									fill="currentColor"
								>
									<path
										fill-rule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
										clip-rule="evenodd"
									/>
								</svg>
							</div>
						</div>
					</div>
				</div>
			</div>

			<!-- Support Button -->
			<div class="mt-12">
				<button
					class="w-full bg-gray-800 text-white py-4 rounded-lg hover:bg-gray-700 transition-colors text-lg font-medium flex justify-center items-center"
					@click="openSupportChat"
				>
					<UIcon name="i-lucide:headset mr-2"></UIcon> <span>Contactar con soporte</span>
				</button>
			</div>
		</div>
	</main>
</template>

<script setup lang="ts">
import { useRemittanceStore } from '@/stores/remittance'
import { useRoute } from 'vue-router'

interface Step {
	title: string
	status: 'completed' | 'pending'
	date?: string
}

const route = useRoute()
const remittanceStore = useRemittanceStore()
const tracking = ref()

const steps = ref<Step[]>([
	{
		title: 'Recolectado dinero en origen',
		status: 'completed',
		date: '13:40 12/02/2023',
	},
	{
		title: 'Transferido a Destino',
		status: 'completed',
		date: '13:40 12/02/2023',
	},
	{
		title: 'Depositado a destinatario',
		status: 'pending',
	},
	{
		title: 'Transacción terminada',
		status: 'pending',
	},
])

const openSupportChat = () => {
	// Here you would implement the logic to open the support chat
	console.log('Opening support chat...')
}
function objectMap(object, mapFn) {
	return Object.keys(object).reduce(function (result, key) {
		result[key] = mapFn(object[key])
		return result
	}, {})
}

function formatDate(dateString: string) {
	if (!dateString || dateString === 'pendiente') return 'pendiente'

	const date = new Date(dateString)
	const months = [
		'enero',
		'febrero',
		'marzo',
		'abril',
		'mayo',
		'junio',
		'julio',
		'agosto',
		'septiembre',
		'octubre',
		'noviembre',
		'diciembre',
	]

	const day = date.getDate()
	const month = months[date.getMonth()]
	const year = date.getFullYear()
	const hours = date.getHours().toString().padStart(2, '0')
	const minutes = date.getMinutes().toString().padStart(2, '0')

	return `${day} de ${month} ${year} a las ${hours}:${minutes}`
}

onMounted(async () => {
	const responseTracking = await remittanceStore.getOperationTracking(route.params.id)

	tracking.value = [
		{
			title: 'Inicio de la operación',
			status: responseTracking.tracking.start_operation
				? formatDate(responseTracking.tracking.start_operation)
				: 'pendiente',
		},
		{
			title: 'Operación verificada',
			status: responseTracking.tracking.verified_at ? formatDate(responseTracking.tracking.verified_at) : 'pendiente',
		},
		{
			title: 'Su orden está siendo procesada',
			status: responseTracking.tracking.processed_at ? formatDate(responseTracking.tracking.processed_at) : 'pendiente',
		},
		{
			title: 'Dinero desembolsado en destino',
			status: responseTracking.tracking.finised ? formatDate(responseTracking.tracking.finised) : 'pendiente',
		},
	]
})
</script>
