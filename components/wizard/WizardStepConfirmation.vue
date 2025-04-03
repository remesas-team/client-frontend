<template>
	<div class="mb-8">
		<!-- Header -->
		<div class="text-center my-5 mb-10">
			<h2 class="text-3xl font-bold mb-2">Todo listo para realizar la transferencia</h2>
			<p class="text-gray-600">
				Revisa bien los datos de la transacción. Recuerda que tienes un tiempo limitado para mantener el mejor tipo de
				cambio garantizado.
			</p>
		</div>

		<!-- Exchange Rate Info -->
		<div class="mb-8">
			<div class="flex justify-between items-center mb-4">
				<span class="text-gray-600 text-lg">Tú depositas</span>
				<span class="text-xl font-bold"
					>{{ remittanceStore.form.source_amount }} {{ remittanceStore.form.source_currency_symbol }}</span
				>
			</div>
			<div class="flex justify-between items-center">
				<span class="text-gray-600 text-lg">En destino reciben:</span>
				<span class="text-xl font-bold"
					>{{ remittanceStore.form.destination_amount }} {{ remittanceStore.form.destination_currency_symbol }}</span
				>
			</div>
		</div>

		<!-- Transfer Details -->
		<div class="bg-gray-50 rounded-lg p-6 mb-8">
			<h3 class="text-lg font-bold text-gray-700 mb-4">Detalles del envío</h3>

			<div>
				<div class="flex justify-between mb-3">
					<span class="text-gray-600">Tipo de cambio:</span>
					<span class="font-medium"
						>1 {{ remittanceStore.form.source_currency_symbol }} = {{ remittanceStore.form.exchange_rate }}
						{{ remittanceStore.form.destination_currency_symbol }}</span
					>
				</div>
				<div class="flex justify-between mb-3">
					<span class="text-gray-600">Costo de envío (+igv):</span>
					<span class="font-medium"
						>{{ remittanceStore.form.send_cost + remittanceStore.form.send_tax }}
						{{ remittanceStore.form.source_currency_symbol }}</span
					>
				</div>
				<div class="flex justify-between mb-3 text-green-wather" v-if="remittanceStore.form.savings > 0">
					<span class="text-gray-600">Descuento coupon <span class="font-bold">({{ remittanceStore.form.coupon }})</span>:</span>
					<span class="font-bold"
						>- {{ remittanceStore.form.savings }}
						{{ remittanceStore.form.source_currency_symbol }}</span
					>
				</div>
				<div class="flex justify-between">
					<span class="text-gray-600">Total a convertir:</span>
					<span class="font-medium"
						>{{ remittanceStore.form.amount_to_send }} {{ remittanceStore.form.source_currency_symbol }}</span
					>
				</div>
			</div>
		</div>

		<UAlert
			v-if="errorGeneral"
			:description="errorGeneral"
			color="error"
			variant="soft"
			class="mb-8"
		/>
		<div v-if="errorGeneral" class="bg-white rounded-lg p-4 mb-6 border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-3">
			<UIcon 
				name="i-mdi-refresh" 
				class="text-blue-500 w-5 h-5"
			/>
			<span class="text-gray-600">Ups... El tipo de cambio se actualizó...</span>
			</div>
			<button 
			@click="reloadEstimation"
			class="cursor-pointer px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-sm font-medium hover:bg-blue-100 transition-colors duration-200 flex items-center space-x-2"
			>
			<span>Volver a calcular</span>
			<UIcon 
				name="i-mdi-arrow-right" 
				class="w-4 h-4"
			/>
			</button>
		</div>
		</div>
		<!-- Action Button -->
		<UButton
			type="submit"
			size="xl"
			color="primary"
			block
			class="w-full mt-8 text-lg font-medium h-14 bg-green-grass text-center hover:bg-green-dark hover:cursor-pointer"
			:loading="loadingSubmit"
			@click="handleConfirm"
		>
			Realizar depósito
		</UButton>

		<!-- Delivery Time Notice -->
		<p
			class="text-center text-gray-600 flex flex-col direction-column md:flex-row items-center justify-center gap-2 text-[#2e7d6b] "
		>
			<UIcon name="i-mdi:run-fast text-green-wather"></UIcon>
			<UtilitiesDineroDisponible />
		</p>
	</div>
</template>

<script setup lang="ts">
import { useRemittanceStore } from '~/stores/remittance'
import {trackConfirmation} from '~/tracking/events/remittanceEvents'
import { operationsRepository } from '~/repositories/v1/platform/operationsRepository'
import {trackEstimate, trackApplyCoupon, trackStartRemittance} from '~/tracking/events/remittanceEvents'

const emit = defineEmits<{
	(e: 'next'): void
}>()

const remittanceStore = useRemittanceStore()


const refFormRemittance = ref(null)

const TIME_LIMIT = 15 * 60 // 15 minutes in seconds
const timeRemaining = ref(TIME_LIMIT)
const loadingSubmit = ref(false)
const errorGeneral = ref('')
const requestOperations = operationsRepository()
const estimate = ref(null)
 	
const reloadEstimation = async () => {
	const response = await requestOperations.getEstimate(remittanceStore.estimationData)

	if (!response.success) {
		const listErrors = Object.keys(response.errors).map((key) => ({ name: key, message: response.errors[key][0] }))

		refFormRemittance.value?.setErrors(listErrors)
		return
	}
	trackEstimate(response.data, 'recalculado')

	errorGeneral.value = null

	estimate.value = response.data
	setNewEstimation()
	return response.data
}

const setNewEstimation = async () => {
	remittanceStore.form.source_currency_symbol = estimate.value.from
	remittanceStore.form.destination_currency_symbol = estimate.value.to
	remittanceStore.form.destination_amount = estimate.value.exchange_result
	remittanceStore.form.exchange_rate = estimate.value.exchange_unit
	remittanceStore.form.send_cost = estimate.value.send_cost
	remittanceStore.form.send_tax = estimate.value.tax
	remittanceStore.form.amount_to_send = estimate.value.amount_to_send
	remittanceStore.form.savings = estimate.value.savings || 0
	remittanceStore.form.coupon_code = estimate.value.coupon?.code || null
	remittanceStore.form.coupon = estimate.value.coupon?.code || null
}


const handleConfirm = async () => {
	errorGeneral.value = ''
	loadingSubmit.value = true

	const response = await remittanceStore.createOperation()

	if (!response.success) {
		loadingSubmit.value = false
		errorGeneral.value = response.message
		return
	}

	console.log(response.data)
	remittanceStore.newOperation = ref(response.data)
	trackConfirmation(remittanceStore.form)

	emit('next')
}

// Timer countdown
onMounted(() => {
	const timer = setInterval(() => {
		if (timeRemaining.value > 0) {
			timeRemaining.value--
		} else {
			clearInterval(timer)
			// Handle timeout - maybe show a message or redirect
		}
	}, 1000)

	// Clean up timer on component unmount
	onUnmounted(() => {
		clearInterval(timer)
	})
})
</script>
