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
						:search-input="true"
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
						<li v-if="selectedAccount.cci"><span class="font-medium">CCI:</span> {{ selectedAccount?.cci }}</li>
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
				:schema="v.safeParser(schemaOrigin)"
				@submit="handleSubmit"
			>
				<div v-if="!selectedAccount">
					<label
						for=""
						class="mb-2 mt-4 w-full block font-medium"
						>Datos de la cuenta:</label
					>
					<div class="w-full mb-2">
						<UFormField name="bank_id">
							<USelectMenu
								v-model="formState.bank_id"
								:items="banks"
								:search-input="{
									placeholder: 'Filter...',
									icon: 'i-lucide-search'
								}"
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
					<div class="w-full mb-2" v-if="remittanceStore.form.source_currency_symbol != 'BRL' && formState.account_type_id">
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
						>Datos del titular:</label
					>

					<div class="w-full text-green">
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
</template>

<script setup lang="ts">
import { userRepository } from '~/repositories/v1/platform/userRepository'
import { useAuthStore } from '~/stores/auth'
import {trackSetOrigin} from '~/tracking/events/remittanceEvents'

import { useRemittanceStore } from '~/stores/remittance'
import { sourcesRepository } from '~/repositories/v1/platform/sourcesRepository'
import CircleLoader from '~/components/CircleLoader.vue'
import * as v from 'valibot'

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
	cci: null,
	phone_number: null,
})

const schemaOrigin = computed(() => {
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
    ...(remittanceStore.form.source_currency_symbol != 'BRL' ? { //PARCHE: Verifica que no sea Brasil para validar el cci
      cci: v.pipe(
        v.string('CCI es requerido'),
        v.regex(/^\d*$/, 'CCI debe contener solo números')
      )
    } : {}),
    alias: v.pipe(
      v.string('Nombre del destinatario es requerido'),
      v.regex(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/, 'Nombre debe contener solo letras')
    )
  })
})


const handleSubmit = async () => {
	console.log("Submit")
	loadingSubmit.value = true

	const { bank_id, account_number, is_saved, alias, account_type_id, cci } = formState.value

	const params = {
			bank_id: bank_id,
			district_id: null,
			currency_id: remittanceStore.form.source_currency_id,
			account_type_id: account_type_id,
			account_number: account_number,
			alias: alias,
			is_joint_account: false,
			is_saved: is_saved,
			tag: 'origin'
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

		trackSetOrigin(params)
		remittanceStore.form.source_user_account_id = response.data.id
	} else {
		trackSetOrigin(params)
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
			item.tag === 'origin' && item.is_saved && item.currency_code === remittanceStore.form.source_currency_symbol
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
