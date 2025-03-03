<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold mb-6">¿Dónde vas a recibir el dinero?</h2>

    <div v-if="loadingInfo" class="flex items-center justify-center h-[308px]">
      <CircleLoader class="size-10"/>
    </div>

    <div v-else>
      <div class="space-y-4 w-full">
        <div class="mb-2" v-if="savedAccounts.length">
          <label for="">Destinatarios guardados:</label>
          <USelectMenu
              v-model="selectedAccount"
              :items="savedAccounts"
              :search-input="false"
              label-Key="alias"
              placeholder="Selecciona un destinatario"
              size="xl"
              class="w-full"
          />
        </div>

        <div v-if="selectedAccount" class="mt-4 bg-gray-50 p-4 rounded-lg">
          <h3 class="font-medium mb-2">Información de la cuenta:</h3>
          <ul class="space-y-2 text-sm">
            <li><span class="font-medium">Nombre:</span> {{ selectedAccount?.alias }}</li>
            <li><span class="font-medium">Número de cuenta:</span> {{ selectedAccount?.account_number }}</li>
            <li><span class="font-medium">Banco:</span> {{ selectedAccount?.bank_name }}</li>
            <li><span class="font-medium">Moneda:</span> {{ selectedAccount?.currency_code }}</li>
          </ul>
          <a href="#" class="underline decoration-solid mt-5 block" @click="selectedAccount = null"> + Crear nuevo
            destinatario</a>
        </div>
      </div>

      <!-- Bank Account Form -->
      <UForm id="refFormRemittance" ref="refFormRemittance" :state="formState" @submit="handleSubmit">
        <!-- Save Account -->
        <div v-if="!selectedAccount">
          <div class="w-full mb-2">
            <label for="">Nuevo destinatario:</label>
            <USelectMenu
                v-model="formState.bank_id"
                :items="banks"
                :search-input="false"
                value-key="id"
                label-key="name"
                placeholder="Selecciona un banco"
                size="xl"
                class="w-full"
            />
          </div>

          <div class="w-full mb-2">
            <UInput v-model="formState.account_number" type="text" pattern="[0-9]*" inputmode="numeric"
                    placeholder="Número de cuenta interbancario" size="xl" class="w-full text-xl"
                    @input="formState.account_number = formState.account_number.replace(/\D/g, '')"/>
          </div>

          <div class="w-full">
            <UInput v-model="formState.alias" type="text" placeholder="Nombre del destinatario" size="xl"
                    class="w-full text-xl"/>
          </div>

          <div class="mt-6">
            <label class="flex items-center">
              <input v-model="formState.is_saved" type="checkbox"
                     class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"/>
              <span class="ml-2 text-sm text-gray-600">
              Guardar como cuenta frecuente
            </span>
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
            class="w-full mt-8 text-lg font-medium h-14 bg-green-dark text-center">
          Continuar
        </UButton>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import {userRepository} from "~/repositories/v1/platform/userRepository"
import {useRemittanceStore} from '~/stores/remittance'
import {sourcesRepository} from "~/repositories/v1/platform/sourcesRepository";
import CircleLoader from "~/components/CircleLoader.vue";

const emit = defineEmits<{
  (e: 'next'): void;
}>();

const userRequest = userRepository();
const sourcesRequest = sourcesRepository();
const remittanceStore = useRemittanceStore();

const loadingInfo = ref(true)
const loadingSubmit = ref(false)
const banks = ref([])
const savedAccounts = ref([])

const selectedAccount = ref(null)
const formState = ref({
  bank_id: null,
  account_number: '',
  recipientName: '',
  is_saved: false,
  alias: ''
})

const handleSubmit = async () => {
  loadingSubmit.value = true

  const {bank_id, account_number, is_saved, alias} = formState.value

  if (!selectedAccount.value) {
    const response = await userRequest.createBankAccount({
      "bank_id": bank_id,
      "district_id": null,
      "currency_id": remittanceStore.form.destination_currency_id,
      "type": "corriente",
      "account_number": account_number,
      "alias": alias,
      "is_joint_account": false,
      "is_saved": is_saved,
      "tag": "destination",
    });

    if (!response.success) {
      loadingSubmit.value = false
      return
    }

    remittanceStore.form.destination_user_account_id = response.data.id
  } else {
    remittanceStore.form.destination_user_account_id = selectedAccount.value.id
  }

  emit('next');
};

const getBanks = async () => {
  const response = await sourcesRequest.getBanksByCountry({
    country_id: remittanceStore.form.destination_country_id
  });

  if (!response.success) {
    return
  }

  banks.value = response.data
}

const getBankAccounts = async () => {
  const response = await userRequest.getBankAccounts();

  if (!response.success) {
    return
  }

  savedAccounts.value = response.data.filter(item => item.tag === "destination" && item.is_saved && item.currency_code === remittanceStore.form.destination_currency_symbol)
}

const setFormState = () => {
  const {destination_user_account_id} = remittanceStore.form

  if (savedAccounts.value.length > 0 && destination_user_account_id === null) {
    selectedAccount.value = savedAccounts.value[0]
    return
  }

  selectedAccount.value = savedAccounts.value.find(item => item.id === destination_user_account_id)
}

onMounted(async () => {
  loadingInfo.value = true

  await Promise.all([
    getBankAccounts(),
    getBanks()
  ]);
  //setFormState()

  loadingInfo.value = false
});
</script>
