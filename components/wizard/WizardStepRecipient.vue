<template>
	<div class="[&>*]:mb-6">
		<div class="[&>*]:mb-4 w-full">
			<h2 class="text-2xl font-semibold mb-4">1. Ingresa los datos del destinatario</h2>
			<div
				v-if="loadingInfo"
				class="flex items-center justify-center h-[308px]"
			>
				<CircleLoader class="size-10" />
			</div>

			<div v-else>
				<div class="mb-6 w-full" v-if="!setNewAccount">
					<div
						v-if="savedAccounts.length"
						class="mb-2"
					>
						<label class="text mb-2 block">Selecciona un destinatario guardado:</label>
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
						<h3 class="font-medium mb-2">Información de la cuenta:</h3>
						<ul class="[&>*]:mb-2 text-sm">
							<li><span class="font-medium">Nombre:</span> {{ selectedAccount?.alias }}</li>
							<li><span class="font-medium">Número de cuenta:</span> {{ selectedAccount?.account_number }}</li>
							<li v-if="selectedAccount.cci"><span class="font-medium">CCI:</span> {{ selectedAccount?.cci }}</li>
							<li><span class="font-medium">Celular:</span> {{ selectedAccount?.phone_number }}</li>
							<li><span class="font-medium">Banco:</span> {{ selectedAccount?.bank_name }}</li>
							<li><span class="font-medium">Moneda:</span> {{ selectedAccount?.currency_code }}</li>
						</ul>
					</div>
				</div>
				<div @click="switchNewAccount()" class="text mt-2 flex items-center justify-between md:justify-start gap-5" v-if="!setNewAccount && !selectedAccount">
					<span class="mb-2">También puedes:</span>
					<span class=" hover:underline cursor-pointer bg-gray-100 py-2 px-5 rounded-lg hover:bg-gray-200">+ Crear un nuevo destinatario</span>
				</div>
				<div v-else @click="setNewAccount = false; selectedAccount = null">
					< Volver
				</div>
				<!-- Bank Account Form -->
				<UForm
					id="refFormRemittance"
					ref="refFormRemittance"
					:state="formState"
					:schema="v.safeParser(schemaRecipient)"
					@submit="handleSubmit"
				>
					<!-- Save Account -->
					<div  v-if="setNewAccount == true">
						<label
							for=""
							class="mb-2 mt-4 w-full block font-medium"
							>Cuenta de quién recibe el dinero:</label
						>
						<div class="w-full mb-2">
							<UFormField name="bank_id">
								<USelectMenu
									v-model="formState.bank_id"
									:items="banks"
									:search-input="true"
									value-key="id"
									label-key="name"
									placeholder="Selecciona un banco"
									size="xl"
									class="w-full"
									@change="getBankTypes"
								/>
							</UFormField>
						</div>

						<div class="w-full mb-2">
							<UFormField name="account_type_id">
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
							</UFormField>
						</div>

						<div class="w-full mb-2" v-if="formState.account_type_id">
							<UFormField name="account_number">
								<UInput
									v-model="formState.account_number"
									:placeholder="bankTypes"
									type="text"
									size="xl"
									class="w-full text-xl"
								/>
							</UFormField>
						</div>

						<div class="w-full mb-2" v-if="remittanceStore.form.destination_currency_symbol != 'BRL'">
							<UFormField name="cci">
								<UInput
									v-model="formState.cci"
									placeholder="Numero de cuenta interbancario"
									type="text"
									size="xl"
									class="w-full text-xl"
								/>
							</UFormField>
						</div>

						<label
							for=""
							class="mb-2 mt-4 w-full block font-medium"
							>Datos de contacto del destinatario:</label
						>
						<div class="w-full mb-2">
							<UFormField name="alias">
								<UInput
									v-model="formState.alias"
									type="text"
									placeholder="Nombre del destinatario"
									size="xl"
									class="w-full text-xl"
								/>
							</UFormField>
						</div>
						<div class="w-full">
							<UFormField name="phone_number">
								<UInput
									v-model="formState.phone_number"
									type="text"
									pattern="[0-9]*"
									inputmode="numeric"
									placeholder="N° Celular"
									size="xl"
									class="w-full text-xl"
								/>
							</UFormField>
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
						:loading="loadingSubmit"
						class="w-full mt-8 text-lg font-medium h-14 bg-green-grass text-center hover:bg-green-dark hover:cursor-pointer"
					>
						Continuar
					</UButton>
				</UForm>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { useUserStore } from '~/stores/user'
import { useRemittanceStore } from '~/stores/remittance'
import { sourcesRepository } from '~/repositories/v1/platform/sourcesRepository'
import { userRepository } from '~/repositories/v1/platform/userRepository'
import CircleLoader from '~/components/CircleLoader.vue'
import {trackSetDestinatary} from '~/tracking/events/remittanceEvents'


import * as v from 'valibot'

const emit = defineEmits<{
	(e: 'next'): void
}>()

const userStore = useUserStore()
const sourcesRequest = sourcesRepository()
const userRequest = userRepository()
const remittanceStore = useRemittanceStore()

const setNewAccount = ref(false)
const loadingInfo = ref(true)
const loadingSubmit = ref(false)
const banks = ref([])
const bank_types = ref([])
const savedAccounts = ref([])

const selectedAccount = ref(null)
const formState = ref({
	bank_id: null,
	account_type_id: null,
	account_number: null,
	cci: null,
	recipientName: '',
	is_saved: false,
	alias: null,
	phone_number: null,
})

const schemaRecipient = computed(() => {
	console.log(selectedAccount.value)
  if (selectedAccount.value) {
    return v.object({})
  }

  return v.object({
    bank_id: v.number('Banco es requerido'),
    account_type_id: v.number('Tipo de cuenta es requerido'),
    account_number: v.pipe(
      v.string('Número de cuenta es requerido'),
      v.regex(/^(?:\d+|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/, 'Debe contener solo números o ser un correo válido')
    ),
    ...(remittanceStore.form.destination_currency_symbol != 'BRL' ? { //PARCHE: Verifica que no sea Brasil para validar el cci
      cci: v.pipe(
        v.string('CCI es requerido'),
        v.regex(/^\d*$/, 'CCI debe contener solo números')
      )
    } : {}),
    alias: v.pipe(
      v.string('Nombre del destinatario es requerido'),
      v.regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'EL Nombre del destinatario debe contener solo letras')
    ),
    phone_number: v.pipe(
      v.string('Número de teléfono es requerido'),
      v.regex(/^\d+$/, 'Número de teléfono debe contener solo números')
    ),
  })
})


const bankTypes = computed(() => {
	const selectedType = formState.value.account_type_id
	const selectedbanktype = bank_types.value.find((item) => item.id === selectedType)?.name || ''

	return 'Ingresa tu ' + selectedbanktype
})

const handleSubmit = async () => {
	loadingSubmit.value = true

	const { bank_id, account_number, is_saved, alias, phone_number, account_type_id, cci } = formState.value

	const params = {
			bank_id: bank_id,
			district_id: null,
			currency_id: remittanceStore.form.destination_currency_id,
			account_type_id: account_type_id,
			account_number: account_number,
			alias: alias,
			is_joint_account: false,
			is_saved: is_saved,
			tag: 'destination',
			phone_number: phone_number,
		}

	if(cci) {
		params.cci = cci
	}


	console.log("PARAMS", params)

	if (!selectedAccount.value) {
		const response = await userRequest.createBankAccount(params)

		if (!response.success) {
			loadingSubmit.value = false
			return
		}
		console.log("Selected!", response.data)
		params.is_new = true
		trackSetDestinatary(params)
		remittanceStore.form.destination_user_account_id = response.data.id
	} else {
		console.log("Selected",selectedAccount.value.id)
		params.is_new = false
		trackSetDestinatary(params)
		remittanceStore.form.destination_user_account_id = selectedAccount.value.id
	}

	emit('next')
}

const getBanks = async () => {
	//console.log("remittance store country id", remittanceStore.form, remittanceStore.form.destination_country_id)
	const response = await sourcesRequest.getBanksByCountry({
		country_id: remittanceStore.form.destination_country_id,
	})

	if (!response.success) {
		return
	}
	banks.value = response.data

}

const getBankAccounts = async () => {
	const response = await userStore.getBankAccounts()
	//console.log(userStore.bankAccountsList)
	if (!response.success) { return }

	savedAccounts.value = response.data.filter(
		(item) =>
			item.tag === 'destination' &&
			item.is_saved &&
			item.currency_code === remittanceStore.form.destination_currency_symbol,
	)
	//console.log("saved accountsssss", savedAccounts.value)
	return savedAccounts.value
}

const getBankTypes = async () => {
	const selectedBank = formState.value.bank_id
	bank_types.value = banks.value.find((item) => item.id === selectedBank)?.account_types
	console.log(bank_types.value)
}

const setFormState = () => {
	//const { destination_user_account_id } = remittanceStore.form


	// (savedAccounts.value.length > 0 && destination_user_account_id === null) {
	//	selectedAccount.value = savedAccounts.value[0]
	//	return
	//}

	//selectedAccount.value = savedAccounts.value.find((item) => item.id === destination_user_account_id)
}

const switchNewAccount = () => {
	selectedAccount.value = null
	setNewAccount.value = !setNewAccount.value
}

onMounted(async () => {
	loadingInfo.value = true

	const requests = await Promise.all([getBankAccounts(), getBanks()])
	setFormState()
	console.log("REQUEST",requests[0])
	if(!requests[0]) {
		setNewAccount.value = true
	}
	loadingInfo.value = false
})

</script>
