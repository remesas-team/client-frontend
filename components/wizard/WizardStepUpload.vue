<template>
	<div class="mb-8">
		<!-- Timer Section -->
		<div class="text-center mb-2">
			<h2 class="text-gray-600">Termina tu operación antes de que acabe el contador:</h2>
			<div class="flex items-center justify-center gap-2 my-8">
				<svg
					class="w-8 h-8 text-gray-600"
					viewBox="0 0 24 24"
					fill="none"
					stroke="currentColor"
				>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						stroke-width="2"
						d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<span class="text-5xl font-bold">{{ formattedTimeRemaining }}</span>
			</div>
		</div>

		<!-- Transfer Method Selection section commented out -->

		<!-- Transfer Details -->
		<div class="mb-4">
			<h3 class="text-md font-medium my-5 text-center">Para terminar con la operación deposita el monto total a transferir al siguiente número de cuenta.</h3>
			<div class="mb-4 flex flex-col gap-4">
				<div class="flex flex-col gap-2 md:justify-between md:items-center border-b-1 border-b-[#ececec] pb-4">
					<span class="text-gray-600 text-sm">Total a Transferir</span>
					<div class="flex items-center gap-2 justify-between">
						<span
							v-if="newOperation.collection_system_account.currency"
							class="font-medium text-2xl"
							>{{ newOperation.collection_system_account.currency.code }}
							{{ parseFloat(newOperation.source_amount).toFixed(2) }}</span
						>
						<button
							class="text-blue-600 hover:text-blue-700"
							title="Copiar monto"
							@click="copyToClipboard(parseFloat(newOperation.source_amount).toFixed(2))"
						>
							<svg
								class="w-5 h-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
								/>
							</svg>
						</button>
					</div>
				</div>
				<div class="flex flex-col gap-2 md:justify-between md:items-center border-b-1 border-b-[#ececec] pb-4">
					<span class="text-gray-600 text-sm">Banco:</span>
					<div class="flex items-center gap-2 justify-between">
						<span
							v-if="newOperation"
							class="font-medium"
							>{{ newOperation.collection_system_account.account_name }}</span
						>
						<button
							class="text-blue-600 hover:text-blue-700"
							title="Copiar nombre del destinatario"
							@click="copyToClipboard('Remesas.com S.A.C')"
						>
							<svg
								class="w-5 h-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div class="flex flex-col gap-2 md:justify-between md:items-center border-b-1 border-b-[#ececec] pb-4">
					<span class="text-gray-600 text-sm" >N° de cuenta:</span>
					<div class="flex items-center gap-2 justify-between">
						<span
							v-if="newOperation"
							class="font-medium"
							>{{ newOperation.collection_system_account.account_number }}</span
						>
						<button
							class="text-blue-600 hover:text-blue-700"
							title="Copiar número de cuenta"
							@click="copyToClipboard(newOperation.collection_system_account.account_number)"
						>
							<svg
								class="w-5 h-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div class="flex flex-col gap-2 md:justify-between md:items-center border-b-1 border-b-[#ececec] pb-4">
					<span class="text-gray-600 text-sm">N° de cuenta interbancario:</span>
					<div class="flex items-center gap-2 justify-between">
						<span
							v-if="newOperation"
							class="font-medium"
							>{{ newOperation.collection_system_account.cci }}</span
						>
						<button
							class="text-blue-600 hover:text-blue-700"
							title="Copiar número de cuenta"
							@click="copyToClipboard(newOperation.collection_system_account.cci)"
						>
							<svg
								class="w-5 h-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
								/>
							</svg>
						</button>
					</div>
				</div>

				<div class="flex flex-col gap-2 md:justify-between md:items-center border-b-1 border-b-[#ececec] pb-4">
					<span class="text-gray-600 text-sm">Titular de la cuenta:</span>
					<div class="flex items-center gap-2 justify-between">
						<span
							v-if="newOperation"
							class="font-medium"
							>{{ newOperation.collection_system_account.account_owner }}</span
						>
						<button
							class="text-blue-600 hover:text-blue-700"
							title="Copiar número de cuenta"
							@click="copyToClipboard(newOperation.collection_system_account.account_owner)"
						>
							<svg
								class="w-5 h-5"
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
							>
								<path
									stroke-linecap="round"
									stroke-linejoin="round"
									stroke-width="2"
									d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"
								/>
							</svg>
						</button>
					</div>
				</div>

				
			</div>
		</div>

		<!-- Upload Section -->
		<div class="mb-4 mt-8">
			<div
				v-if="!selectedFile"
				class="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mt-4"
				:class="{ 'border-blue-500 bg-blue-50': isDragging }"
				@dragover.prevent="isDragging = true"
				@dragleave.prevent="isDragging = false"
				@drop.prevent="handleDrop"
			>
				<div class="mb-2">
					<p class="text-gray-600">Sube una Screenshot o foto de tu transacción o voucher de depósito</p>
				</div>

				<input
					ref="fileInput"
					type="file"
					class="hidden"
					accept="image/*,.pdf"
					@change="handleFileSelect"
				/>

				<button
					class="px-6 py-3 bg-green-wather text-white rounded-lg hover:bg-green-grass transition-colors mt-4"
					@click="$refs.fileInput.click()"
				>
					Seleccionar archivo
				</button>
			</div>

			<!-- Selected File Preview -->
			<div
				v-if="selectedFile"
				class="bg-green-50 p-4 rounded-lg flex items-center justify-between mt-4"
			>
				<div class="flex items-center gap-2">
					<svg
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
					<span class="text-green-700">{{ selectedFile.name }}</span>
				</div>
				<button
					class="text-gray-500 hover:text-gray-700"
					@click="selectedFile = null"
				>
					<svg
						class="w-5 h-5"
						viewBox="0 0 20 20"
						fill="currentColor"
					>
						<path
							fill-rule="evenodd"
							d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
							clip-rule="evenodd"
						/>
					</svg>
				</button>
			</div>
		</div>

		<UAlert
			v-if="errorGeneral"
			:description="errorGeneral"
			color="error"
			variant="soft"
		/>

		<!-- Action Buttons -->
		<div class="mb-4">
			<UButton
				type="submit"
				size="xl"
				color="primary"
				block
				class="w-full mt-8 text-lg font-medium h-14 bg-green-grass text-center hover:bg-green-dark hover:cursor-pointer"
				:loading="loadingSubmit"
				@click="confirmTransaction"
			>
				Confirma y Envia el dinero
			</UButton>

			<!-- Delivery Time Notice -->
			<p
				class="mt-4 text-center text-gray-600 flex flex-col direction-column md:flex-row items-center justify-center gap-2 text-[#2e7d6b] "
			>
				<UIcon name="i-mdi:run-fast text-green-wather"></UIcon>
				<UtilitiesDineroDisponible />
			</p>
		</div>
	</div>

	<!-- Toast notification for copy feedback -->
	<div 
		v-if="showCopyToast" 
		class="fixed bottom-4 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-lg transition-opacity duration-300"
		:class="{ 'opacity-100': showCopyToast, 'opacity-0': !showCopyToast }"
	>
		<div class="flex items-center gap-2">
			<UIcon name="i-mdi:check-circle" />
			<span>Copiado al portapapeles</span>
		</div>
	</div>
</template>

<script setup lang="ts">
import { operationsRepository } from '~/repositories/v1/platform/operationsRepository'
import { useRemittanceStore } from '~/stores/remittance'

const router = useRouter()
const requestOperations = operationsRepository()
const remittanceStore = useRemittanceStore()

const timer = ref()
const timeRemaining = ref(0)
const isDragging = ref(false)
const selectedFile = ref<File | null>(null)
const fileInput = ref<HTMLInputElement | null>(null)
const loadingSubmit = ref(false)
const errorGeneral = ref('')
const newOperation = ref({
	collection_system_account: {
		account_name: null,
		account_number: null,
		currency_symbol: null,
	},
})

// Toast notification state
const showCopyToast = ref(false)

// Format remaining time as MM:SS
const formattedTimeRemaining = computed(() => {
	const minutes = Math.floor(timeRemaining.value / 60)
	const seconds = timeRemaining.value % 60
	return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
})

// Copy to clipboard function with feedback
const copyToClipboard = async (text: string) => {
	try {
		await navigator.clipboard.writeText(text)
		// Show toast notification
		showCopyToast.value = true
		// Hide toast after 2 seconds
		setTimeout(() => {
			showCopyToast.value = false
		}, 2000)
	} catch (err) {
		console.error('Failed to copy text: ', err)
	}
}

// File handling functions
const handleFileSelect = (event: Event) => {
	const input = event.target as HTMLInputElement
	if (input.files && input.files[0]) {
		selectedFile.value = input.files[0]
	}
}

const handleDrop = (event: DragEvent) => {
	isDragging.value = false
	if (event.dataTransfer?.files.length) {
		selectedFile.value = event.dataTransfer.files[0]
	}
}

const confirmTransaction = async () => {
	errorGeneral.value = ''
	loadingSubmit.value = true

	const operation_id = remittanceStore.currentOperation.operation_id

	const formData = new FormData()
	formData.append('user_voucher_file', selectedFile.value)
	formData.append('operation_id', operation_id.toString())

	const response = await requestOperations.postUploadVoucher(formData)

	if (!response.success) {
		loadingSubmit.value = false
		errorGeneral.value = response.message
		return
	}

	router.push('/operacion/success')
}

// Timer countdown
onMounted(async () => {
	const newOperationResponse = await remittanceStore.getOperation(remittanceStore.currentOperation.operation_id)
	newOperation.value = newOperationResponse.data.operation
	timeRemaining.value = newOperationResponse.data.time_left
	timer.value = setInterval(() => {
		if (timeRemaining.value > 0) {
			timeRemaining.value--
		} else {
			clearInterval(timer.value)
		}
	}, 1000)
})

onUnmounted(() => {
	clearInterval(timer.value)
})
</script>
