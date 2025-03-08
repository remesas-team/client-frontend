<template>
	<div class="[&>*]:mb-6">
		<div class="[&>*]:mb-4 w-full">
			<h2 class="text-xl font-semibold mb-6">Configura una cuenta de origen</h2>
			<p>
				Esto nos ayudará a poder regresarte el dinero en caso de que no se pueda realizar tu transacción. Esto lo vas a
				realizar solo una vez. Para modificar tu cuenta de origen puedes hacerlo en
				<a
					href=""
					class="text-green-wather"
				>
					<UIcon name="i-lucide:link"></UIcon>
					Perfil > cuentas de origen</a
				>
			</p>
			<!-- Bank Account Form -->

			<div
				v-if="loadingInfo"
				class="flex items-center justify-center h-[308px]"
			>
				<CircleLoader class="size-10" />
			</div>

			<div v-else>
				<div
					v-if="savedAccounts.length"
					class="mb-2"
				>
					<label for="">Origen guardados:</label>
					<USelectMenu
						v-model="selectedAccount"
						:items="savedAccounts"
						:search-input="false"
						label-key="alias"
						placeholder="Selecciona un destinatario"
						size="xl"
						class="w-full"
					/>
				</div>

				<div
					v-if="selectedAccount"
					class="mt-4 bg-gray-50 p-4 rounded-lg"
				>
					<h3 class="font-bold mb-2">Información de la cuenta:</h3>
					<ul class="[&>*]:mb-2 text-sm">
						<li><span class="font-medium">Número de cuenta:</span> {{ selectedAccount?.account_number }}</li>
						<li><span class="font-medium">Banco:</span> {{ selectedAccount?.bank_name }}</li>
						<li><span class="font-medium">Moneda:</span> {{ selectedAccount?.currency_code }}</li>
					</ul>
					<a
						href="#"
						class="underline decoration-solid mt-5 block"
						@click="selectedAccount = null"
					>
						+ Configurar nueva cuenta de origen</a
					>
				</div>
			</div>

			<UForm
				id="refFormRemittance"
				ref="refFormRemittance"
				:state="formState"
				@submit="handleSubmit"
			>
				<div v-if="!selectedAccount">
					<label
						for=""
						class="mb-2 mt-4 w-full block font-medium"
						>Datos de la cuenta:</label
					>
					<div class="w-full mb-2">
						<USelectMenu
							v-model="formState.bank_id"
							:items="banks"
							:search-input="false"
							value-key="id"
							label-key="name"
							placeholder="Selecciona un banco"
							size="xl"
							class="w-full"
							@change="getBankTypes"
						/>
					</div>

					<div class="w-full mb-2">
						<USelectMenu
							v-model="formState.account_type_id"
							:items="bank_types"
							:search-input="false"
							value-key="id"
							label-key="name"
							placeholder="Tipo de cuenta"
							size="xl"
							class="w-full"
						/>
					</div>

					<div class="w-full mb-2">
						<UInput
							v-model="formState.account_number"
							:placeholder="bankTypes"
							type="text"
							size="xl"
							class="w-full text-xl"
							@input="formState.account_number = formState.account_number.replace(/\D/g, '')"
						/>
					</div>

					<label
						for=""
						class="mb-2 mt-4 w-full block font-medium"
						>Datos del titular:</label
					>

					<div class="w-full">
						<UInput
							v-model="formState.alias"
							type="text"
							placeholder="Nombre del destinatario"
							size="xl"
							disabled
							class="w-full text-xl text-gray"
						/>
					</div>

					<div class="mt-6">
						<label class="flex items-center">
							<input
								v-model="formState.is_saved"
								type="checkbox"
								class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
							/>
							<span class="ml-2 text-sm text-gray-600"> Guardar como cuenta frecuente </span>
						</label>
					</div>
				</div>

				<!-- Submit Button -->
				<UButton
					type="submit"
					size="xl"
					color="primary"
					block
					class="w-full mt-8 text-lg font-medium h-14 bg-green-dark text-center hover:bg-green-grass"
				>
					Continuar
				</UButton>
			</UForm>
		</div>
	</div>
</template>

<script setup lang="ts">
import { userRepository } from '~/repositories/v1/platform/userRepository'
import { useAuthStore } from '~/stores/auth'

import { useRemittanceStore } from '~/stores/remittance'
import { sourcesRepository } from '~/repositories/v1/platform/sourcesRepository'
import CircleLoader from '~/components/CircleLoader.vue'

const emit = defineEmits<{
	(e: 'next'): void
}>()

const userRequest = userRepository()
const sourcesRequest = sourcesRepository()
const remittanceStore = useRemittanceStore()
const authStore = useAuthStore()

const loadingInfo = ref(true)
const loadingSubmit = ref(false)
const banks = ref([])
const bank_types = ref([])
const savedAccounts = ref([])

const selectedAccount = ref(null)
const formState = ref({
	bank_id: null,
	account_type_id: null,
	account_number: '',
	recipientName: '',
	is_saved: true,
	alias: '',
})

const handleSubmit = async () => {
	loadingSubmit.value = true

	const { bank_id, account_number, is_saved, alias, account_type_id } = formState.value

	if (!selectedAccount.value) {
		const response = await userRequest.createBankAccount({
			bank_id: bank_id,
			district_id: null,
			currency_id: remittanceStore.form.source_currency_id,
			account_type_id: account_type_id,
			account_number: account_number,
			alias: alias,
			is_joint_account: false,
			is_saved: is_saved,
			tag: 'origin',
		})

		if (!response.success) {
			loadingSubmit.value = false
			return
		}

		remittanceStore.form.source_user_account_id = response.data.id
	} else {
		remittanceStore.form.source_user_account_id = selectedAccount.value.id
	}

	emit('next')
}

const getBanks = async () => {
	const response = await sourcesRequest.getBanksByCountry({
		country_id: remittanceStore.form.source_country_id,
	})

	if (!response.success) {
		return
	}

	banks.value = response.data
}

const getBankAccounts = async () => {
	const response = await userRequest.getBankAccounts()

	if (!response.success) {
		return
	}

	savedAccounts.value = response.data.filter(
		(item) =>
			item.tag === 'origin' && item.is_saved && item.currency_code === remittanceStore.form.source_currency_code,
	)
}

const getBankTypes = async () => {
	const selectedBank = formState.value.bank_id
	bank_types.value = banks.value.find((item) => item.id === selectedBank)?.account_types
	console.log(bank_types.value)
}

const bankTypes = computed(() => {
	const selectedType = formState.value.account_type_id
	const selectedbanktype = bank_types.value.find((item) => item.id === selectedType)?.name || ''

	return 'Ingresa tu ' + selectedbanktype
})

const setFormState = () => {
	const { source_user_account_id } = remittanceStore.form

	if (savedAccounts.value.length > 0 && source_user_account_id === null) {
		selectedAccount.value = savedAccounts.value[0]

		return
	}

	selectedAccount.value = savedAccounts.value.find((item) => item.id === source_user_account_id)
}

onMounted(async () => {
	loadingInfo.value = true
	formState.value.alias = authStore.fullName
	await Promise.all([getBankAccounts(), getBanks()])
	setFormState()

	loadingInfo.value = false
})
</script>
