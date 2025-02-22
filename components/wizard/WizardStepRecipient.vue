<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold mb-6">¿Dónde vas a recibir el dinero?</h2>

    <!-- Bank Account Form -->
    <UForm id="refFormRemittance" ref="refFormRemittance" :state="form" @submit="handleSubmit">
      <div class="space-y-4 w-full">
        <div class="w-full">
          <div class="mb-2" v-if="savedAccounts.length">
            <label for="">Destinatarios guardados:</label>
            <USelect v-model="form.bank" :items="savedAccounts" value-attribute="id" placeholder="Selecciona un banco"
              size="xl" class="w-full text-xl" />
          </div>
        </div>
      </div>

      <!-- Save Account -->
      <div class="w-full mb-2">
        <label for="">Nuevo destinatario:</label>
        <USelect v-model="form.bank" :items="banks" value-attribute="id" placeholder="Selecciona un banco" size="xl"
          class="w-full text-xl" />
      </div>
      <div class="w-full mb-2">
        <UInput v-model="form.accountNumber" type="text" pattern="[0-9]*" inputmode="numeric"
          placeholder="Número de cuenta interbancario" size="xl" class="w-full text-xl"
          @input="form.accountNumber = form.accountNumber.replace(/\D/g, '')" />
      </div>
      <div class="w-full">
        <UInput v-model="form.recipientName" type="text" placeholder="Nombre del destinatario" size="xl"
          class="w-full text-xl" />
      </div>

      <div class="mt-6">
        <label class="flex items-center">
          <input v-model="form.saveAccount" type="checkbox"
            class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500" />
          <span class="ml-2 text-sm text-gray-600">
            Guardar como cuenta frecuente
          </span>
        </label>
      </div>

      <!-- Save Account Name -->
      <div v-if="form.saveAccount" class="mt-4 w-full">
        <UInput v-model="form.accountAlias" type="text" placeholder="Nombre del destinatario" size="xl"
          class="w-full text-xl" />
      </div>

      <!-- Submit Button -->
      <UButton type="submit" size="xl" color="primary" class="w-full mt-8 text-lg font-medium h-14 bg-green-dark text-center">
        Continuar
      </UButton>
    </UForm>

  </div>
</template>

<script setup lang="ts">
import { userRepository } from "~/repositories/v1/platform/userRepository"
import { useRemittanceStore } from '~/stores/remittance'

const userRepo = userRepository()
const sourcesStore = useSourcesStore()
const remittanceStore = useRemittanceStore()
const banks = ref([])
const savedAccounts = ref([])
const form = ref({
  bank: null,
  accountNumber: '',
  recipientName: '',
  saveAccount: false,
  accountAlias: ''
})

const isFormValid = computed(() => {
  return form.bank && form.accountNumber && form.recipientName;
});

const handleSubmit = async () => {

  // Here you can handle the form submission
  // For example, save to store or emit event

  const bank_id = form.value.bank

  const response = await userRepo.createBankAccount({
    "bank_id": bank_id,
    "district_id": null,
    "currency_id": remittanceStore.form.destination_currency_id,
    "type": "corriente",
    "account_number": form.value.accountNumber,
    "alias": form.value.accountAlias,
    "is_joint_account": false,
    "is_saved": form.value.saveAccount,
    "tag": "destination",
  });

  remittanceStore.form.destination_user_account_id = response.data.id

  emit('next');
};

const emit = defineEmits<{
  (e: 'next'): void;
}>();


// Add onMounted hook
onMounted(async () => {
  //Deuda: Se debe obtener el pais de la orden de remesa sin perderlo al actualizar
  const banksByCountry = await sourcesStore.fetchBanksByCountry(remittanceStore.form.source_country_id ? remittanceStore.form.source_country_id : 1); // You might want to pass the actual country_id
  const destinataryBanksAccounts = await userRepo.fetchBankAccounts();

  banks.value = Object.entries(banksByCountry.data.banks).map(([id, name]) => ({
    value: id,
    label: name
  }));

  savedAccounts.value = destinataryBanksAccounts.data.map((item) => {
    return {
      value: item.bank_id,
      label: item.alias
    }
  })

  console.log(savedAccounts.value);
  console.log(banks.value);
});

</script>