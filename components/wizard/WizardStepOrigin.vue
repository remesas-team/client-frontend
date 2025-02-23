<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold mb-6">Configura una cuenta de origen</h2>
    <p>Esto nos ayudará a poder regresarte el dinero en caso de que no se pueda realizar tu transacción.
      Esto lo vas a realizar solo una vez. Para modificar tu cuenta de origen puedes hacerlo en
      <a href="" class="text-green-wather"><UIcon name="i-lucide:link"></UIcon>  Perfil > cuentas de origen</a></p>
    <!-- Bank Account Form -->

    <UForm id="refFormRemittance" ref="refFormRemittance" :state="formState" @submit="handleSubmit">
      <div class="space-y-4 w-full">
        <div class="w-full">
          <label for="">Crea una cuenta de origen:</label>
          <USelectMenu
            v-model="formState.bank_id"
            :items="banks"
            :search-input="false"
            value-key="id"
            label-Key="name"
            placeholder="Selecciona un banco"
            size="xl"
            class="w-full"
          />
        </div>
        <div class="w-full">
          <UInput
            v-model="formState.account_number"
            type="text"
            pattern="[0-9]*"
            inputmode="numeric"
            placeholder="Número de cuenta interbancario"
            size="xl"
            class="w-full text-xl"
            @input="formState.account_number = formState.account_number.replace(/\D/g, '')"
          />
        </div>
        <div class="w-full">
          <UInput
            v-model="formState.recipientName"
            type="text"
            placeholder="Nombre completo del titular"
            size="xl"
            class="w-full text-xl"
          />
        </div>
      </div>

      <!-- Save Account Name -->
      <div class="mt-4 w-full">
        <UInput
          v-model="formState.alias"
          type="text"
          placeholder="Asigna un Alias para esta cuenta (ej: Cuenta principal)"
          size="xl"
          class="w-full text-xl"
        />
      </div>

      <!-- Submit Button -->
      <UButton
        type="submit"
        size="xl"
        color="primary"
        block
        class="w-full mt-8 text-lg font-medium h-14 bg-green-dark text-center"
      >
        Continuar
      </UButton>
    </UForm>

  </div>
</template>

<script setup lang="ts">
import {userRepository} from "~/repositories/v1/platform/userRepository"
import {useRemittanceStore} from '~/stores/remittance'
import {sourcesRepository} from "~/repositories/v1/platform/sourcesRepository"

const emit = defineEmits<{
  (e: 'next'): void;
}>();

const userRequest = userRepository();
const sourcesRequest = sourcesRepository();
const remittanceStore = useRemittanceStore();

const banks = ref([])
const savedAccounts = ref([])

const formState = ref({
  bank_id: null,
  account_number: '',
  recipientName: '',
  is_saved: true,
  alias: '',
})

const handleSubmit = async () => {
  const {bank_id, account_number, is_saved, alias} = formState.value

  const response = await userRequest.createBankAccount({
    "bank_id": bank_id,
    "district_id": null,
    "currency_id": remittanceStore.form.source_currency_id,
    "type": "corriente",
    "account_number": account_number,
    "alias": alias,
    "is_joint_account": false,
    "is_saved": is_saved,
    "tag": 'origin'
  });

  remittanceStore.form.source_user_account_id = response.data.id

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

  savedAccounts.value = response.data.filter(item => item.tag === "origin")
}

onMounted(async () => {
  await Promise.all([
    getBanks(),
    getBankAccounts()
  ]);
});
</script>
