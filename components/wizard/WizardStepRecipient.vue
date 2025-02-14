<template>
  <div class="space-y-6">
    <h2 class="text-xl font-semibold mb-6">¿Dónde vas a recibir el dinero?</h2>
    <!-- Account Type Selection -->
    <div class="space-y-4 mb-8">
      <label 
        class="block p-4 border-2 rounded-lg cursor-pointer transition-colors"
        :class="[
          accountType === 'bank' 
            ? 'border-blue-600 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        ]"
      >
        <div class="flex items-center">
          <input
            type="radio"
            v-model="accountType"
            value="bank"
            class="sr-only"
          />
          <div 
            class="w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3"
            :class="[
              accountType === 'bank'
                ? 'border-blue-600'
                : 'border-gray-300'
            ]"
          >
            <div
              v-if="accountType === 'bank'"
              class="w-2.5 h-2.5 rounded-full bg-blue-600"
            ></div>
          </div>
          <span class="font-medium">Cuenta bancaria</span>
        </div>
      </label>

      <label 
        class="block p-4 border-2 rounded-lg cursor-pointer transition-colors"
        :class="[
          accountType === 'pix' 
            ? 'border-blue-600 bg-blue-50'
            : 'border-gray-200 hover:border-gray-300'
        ]"
      >
        <div class="flex items-center">
          <input
            type="radio"
            v-model="accountType"
            value="pix"
            class="sr-only"
          />
          <div 
            class="w-5 h-5 rounded-full border-2 flex items-center justify-center mr-3"
            :class="[
              accountType === 'pix'
                ? 'border-blue-600'
                : 'border-gray-300'
            ]"
          >
            <div
              v-if="accountType === 'pix'"
              class="w-2.5 h-2.5 rounded-full bg-blue-600"
            ></div>
          </div>
          <span class="font-medium">PIX</span>
        </div>
      </label>
    </div>

    <!-- Bank Account Form -->
    <div v-if="accountType === 'bank'" class="space-y-4">
      <select
        v-model="form.bank"
        class="w-full h-14 px-4 rounded-lg border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
      >
        <option value="">Selecciona un banco</option>
        <option value="bradesco">Bradesco</option>
        <option value="itau">Itaú</option>
        <option value="bancodobrasil">Banco do Brasil</option>
        <option value="caixa">Caixa Econômica Federal</option>
      </select>

      <input
        v-model="form.accountNumber"
        type="text"
        pattern="[0-9]*"
        inputmode="numeric"
        placeholder="Número de cuenta interbancario"
        class="w-full h-14 px-4 rounded-lg border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
        @input="form.accountNumber = form.accountNumber.replace(/\D/g, '')"
      />

      <input
        v-model="form.recipientName"
        type="text"
        placeholder="Nombre del destinatario"
        class="w-full h-14 px-4 rounded-lg border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
      />
    </div>

    <!-- PIX Form -->
    <div v-if="accountType === 'pix'" class="space-y-4">
      <input
        v-model="form.phone"
        type="tel"
        placeholder="Número de celular"
        class="w-full h-14 px-4 rounded-lg border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
      />

      <input
        v-model="form.recipientName"
        type="text"
        placeholder="Nombre del destinatario"
        class="w-full h-14 px-4 rounded-lg border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
      />
    </div>

    <!-- Save Account -->
    <div class="mt-6">
      <label class="flex items-center">
        <input
          v-model="form.saveAccount"
          type="checkbox"
          class="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        />
        <span class="ml-2 text-sm text-gray-600">
          Guardar como cuenta frecuente
        </span>
      </label>
    </div>

    <!-- Save Account Name -->
    <div v-if="form.saveAccount" class="mt-4">
      <input
        v-model="form.accountAlias"
        type="text"
        placeholder="Nombre para esta cuenta (ej: Cuenta principal)"
        class="w-full h-14 px-4 rounded-lg border-2 border-gray-200 bg-white shadow-sm focus:border-blue-500 focus:ring-blue-500 text-lg"
      />
    </div>

    <!-- Submit Button -->
    <button
      @click="handleSubmit"
      class="w-full bg-blue-600 text-white py-4 rounded-lg hover:bg-blue-700 transition-colors mt-8 text-lg font-medium h-14"
      :disabled="!isFormValid"
    >
      Continuar
    </button>
  </div>
</template>

<script setup lang="ts">
interface Form {
  accountType: 'bank' | 'pix';
  bank: string;
  accountNumber: string;
  phone: string;
  recipientName: string;
  saveAccount: boolean;
  accountAlias: string;
}

const accountType = ref<'bank' | 'pix'>('bank');

const form = reactive<Form>({
  accountType: 'bank',
  bank: '',
  accountNumber: '',
  phone: '',
  recipientName: '',
  saveAccount: false,
  accountAlias: ''
});

const isFormValid = computed(() => {
  if (accountType.value === 'bank') {
    return form.bank && form.accountNumber && form.recipientName;
  } else {
    return form.phone && form.recipientName;
  }
});

const handleSubmit = () => {
  if (!isFormValid.value) return;
  
  form.accountType = accountType.value;
  // Here you can handle the form submission
  // For example, save to store or emit event
  emit('next');
};

const emit = defineEmits<{
  (e: 'next'): void;
}>();

// Reset form values when switching account types
watch(accountType, (newType) => {
  if (newType === 'bank') {
    form.phone = '';
  } else {
    form.bank = '';
    form.accountNumber = '';
  }
});
</script>