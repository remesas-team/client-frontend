<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold mb-6">¿Dónde vas a recibir el dinero?</h2>

    <!-- Bank Account Form -->
    <UForm id="refFormRemittance" ref="refFormRemittance" :state="form" @submit="handleSubmit">
      <div class="space-y-4 w-full">
        <div class="w-full">
          <div class="mb-2" v-if="savedAccounts.length">
            <label for="">Destinatarios guardados:</label>
            <USelect v-model="selectedAccount" :items="savedAccounts" value-attribute="id"
              @change="setDestinataryInfo()" placeholder="Selecciona un destinatario" size="xl"
              class="w-full text-xl mt-1" />
          </div>
        </div>
        {{infoSelectedAccount}}
          <div v-if="infoSelectedAccount" class="mt-4 bg-gray-50 p-4 rounded-lg">
            <h3 class="font-medium mb-2">Información de la cuenta:</h3>
            <ul class="space-y-2 text-sm">
              <li><span class="font-medium">Nombre:</span> {{ infoSelectedAccount?.recipientName }}</li>
              <li><span class="font-medium">Número de cuenta:</span> {{ infoSelectedAccount?.account_number }}</li>
              <li><span class="font-medium">Banco:</span> {{ infoSelectedAccount?.bank?.name }}</li>
              <li><span class="font-medium">Moneda:</span> {{ infoSelectedAccount?.currency?.name }}</li>
            </ul>
          </div>
      </div>

      <!-- Save Account -->
      <div v-if="!selectedAccount">
        <div class="w-full mb-2">
          <label for="">Nuevo destinatario:</label>
          <USelect v-model="form.bank" :items="banks" value-attribute="id" placeholder="Selecciona un banco" size="xl"
            class="w-full text-xl mt-1" />
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
      </div>
      <!-- Submit Button -->
      <UButton type="submit" size="xl" color="primary"
        class="w-full mt-8 text-lg font-medium h-14 bg-green-dark text-center">
        Continuar
      </UButton>
    </UForm>

  </div>
</template>

<script setup lang="ts">
import { userRepository } from "~/repositories/v1/platform/userRepository"
import { useRemittanceStore } from '~/stores/remittance'
import { sourcesRepository } from "~/repositories/v1/platform/sourcesRepository";

const userRepo = userRepository()
const remittanceStore = useRemittanceStore()
const requestSources = sourcesRepository();
const infoAccounts = ref(null)
const selectedAccount = ref(null)

const emit = defineEmits<{
  (e: 'next'): void;
}>();

const banks = ref([])
const savedAccounts = ref([])
const infoSelectedAccount = ref(null)

const form = ref({
  bank: null,
  accountNumber: '',
  recipientName: '',
  saveAccount: false,
  accountAlias: ''
})

const handleSubmit = async () => {
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

  if (selectedAccount.value) {
    remittanceStore.form.destination_user_account_id = selectedAccount.value.id
  } else {
    remittanceStore.form.destination_user_account_id = response.data.id
  }


  emit('next');
};

const setDestinataryInfo = () => {
  infoSelectedAccount.value = infoAccounts.value.find((item) => item.id === selectedAccount.value)
  console.log(infoSelectedAccount.value)
  return
}

onMounted(async () => {
  const response = await requestSources.getBanksByCountry({ country_id: remittanceStore.form.source_country_id });

  if (Array.isArray(response.data.banks)) {
    banks.value = response.data.banks
  } else {
    banks.value = Object.entries(response.data.banks).map(([id, name]) => ({
      value: id,
      label: name
    }));
  }

  const destinataryBanksAccounts = await userRepo.fetchBankAccounts();
  infoAccounts.value = destinataryBanksAccounts.data

  savedAccounts.value = destinataryBanksAccounts.data.map((item) => {
    return {
      value: item.id,
      label: item.alias
    }
  })

});

</script>
