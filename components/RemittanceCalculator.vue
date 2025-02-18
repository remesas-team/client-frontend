<template>
  <div class="max-w-[800px] mx-auto px-4 md:px-8 mb-16">

    <div class="bg-white rounded-3xl shadow-lg p-6 md:p-8">
      <UForm
          id="refFormRemittance"
          ref="refFormRemittance"
          :schema="v.safeParser(schemaRemittance)"
          :state="formRemittance"
          @submit="startOperation"
      >
        <!-- Country Selection Grid -->
        <div class="grid md:grid-cols-2 gap-6 mb-8">
          <!-- From Country -->
          <pre class="col-span-full">{{ formRemittance }}</pre>
          <div class="relative">
            <label class="block text-[15px] font-medium text-gray-700 mb-2">
              ENVIAR DINERO DESDE
            </label>

            <USelectMenu
                  class="w-full"
                  :searchInput="false"
                  v-model="fromCountry"
                  :items="getCountries"
                  variant="soft"
                  size="xl"
                  :ui="{ base: 'bg-gray-100 hover:bg-gray-200 focus:bg-gray-200' }"
              >
                <template #default="{ modelValue }">
                  <div v-if="modelValue" class="flex items-center gap-3 w-full px-2 py-1">
                    <div class="text-2xl">{{ modelValue.emoji }}</div>
                    <div class="text-lg">{{ modelValue.label }}</div>
                  </div>
                  <div v-else class="flex items-center gap-3 w-full px-2 py-1">
                    <div class="text-2xl">🌍</div>
                    <div class="text-lg">Selecciona tu país</div>
                  </div>
                </template>

                <template #item="{ item }">
                  <div class="flex items-center gap-3 w-full px-2 py-1">
                    <div class="text-2xl">{{ item.emoji }}</div>
                    <div class="text-lg">{{ item.label }}</div>
                  </div>
                </template>
              </USelectMenu>
          </div>

          <!-- To Country -->
          <div class="relative">
            <label class="block text-[15px] font-medium text-gray-700 mb-2">
              HACIA
            </label>

            <USelectMenu
                class="w-full"
                :searchInput="false"
                v-model="toCountry"
                :items="getCountries"
                variant="soft"
                size="xl"
                :ui="{ base: 'bg-gray-100 hover:bg-gray-200 focus:bg-gray-200' }"
            >
              <template #default="{ modelValue }">
                <div v-if="modelValue" class="flex items-center gap-3 w-full px-2 py-1">
                  <div class="text-2xl">{{ modelValue.emoji }}</div>
                  <div class="text-lg">{{ modelValue.label }}</div>
                </div>
                <div v-else class="flex items-center gap-3 w-full px-2 py-1">
                  <div class="text-2xl">🌍</div>
                  <div class="text-lg">Selecciona tu país</div>
                </div>
              </template>

              <template #item="{ item }">
                <div class="flex items-center gap-3 w-full px-2 py-1">
                  <div class="text-2xl">{{ item.emoji }}</div>
                  <div class="text-lg">{{ item.label }}</div>
                </div>
              </template>
            </USelectMenu>
          </div>
        </div>

        <!-- Amount Section -->
        <div class="grid grid-cols-1 md:grid-cols-[2fr_0.7fr] gap-4 items-start mb-8">
          <!-- Amount Input with Currency -->
          <div>
            <label class="block text-[15px] font-medium text-gray-700 mb-2">
              Monto a enviar:
            </label>

            <UFormField name="amount">
              <UButtonGroup size="2xl" class="w-full">
                  <UInput
                      v-model="formRemittance.amount"
                      placeholder="Monto a enviar"
                      class="flex-1"
                      type="number"
                      @update:modelValue="handleAmountInput"
                  />

                <USelectMenu class="w-32" :search-input="false" v-model="toCountry" :items="getCountries"/>
              </UButtonGroup>
            </UFormField>
          </div>

          <!-- Destination Currency -->
          <div>
            <label class="block text-[15px] font-medium text-gray-700 mb-2">
              Ellos reciben en:
            </label>

            <UFormField name="to">
              <USelectMenu size="2xl" class="w-full" :search-input="false" v-model="toCountry" :items="getCountries"/>
            </UFormField>
          </div>
        </div>

        <!-- Exchange Rate Information -->
        <div v-if="estimate" class="space-y-4 mb-8">
          <div class="space-y-3">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Tipo de cambio:</span>
              <span class="text-[#E91E63] font-medium">1 {{ estimate.from }} = {{ estimate.exchange_unit }} {{
                  estimate.to
                }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Comisión de envío:</span>
              <span class="text-[#E91E63] font-medium">{{
                  estimate.from
                }} {{ (estimate.send_cost - estimate.amount).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Impuestos:</span>
              <span class="text-[#E91E63] font-medium">{{ estimate.from }} {{ estimate.tax || '0.00' }}</span>
            </div>
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Subtotal:</span>
              <span class="text-[#E91E63] font-medium">{{
                  estimate.from
                }} {{ estimate.subtotal || (Number(estimate.send_cost) + Number(estimate.tax || 0)).toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center font-bold">
              <span class="text-gray-600">Total a Recibir en destino:</span>
              <span class="text-[#E91E63]">{{ estimate.to }} {{ estimate.amount_to_send.toFixed(2) }}</span>
            </div>
          </div>

          <!-- Coupon Information -->
          <div v-if="estimate.coupon !== 'not applied'" class="p-4 bg-green-50 rounded-xl">
            <div class="flex items-center gap-2">
              <svg class="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clip-rule="evenodd"/>
              </svg>
              <span class="font-medium text-green-700">{{ estimate.coupon.code }}</span>
            </div>
            <p class="text-sm text-green-600 mt-1">{{ estimate.coupon.description }}</p>
          </div>
        </div>

        <!-- Coupon Section -->
        <div class="flex gap-4 mb-8">
          <div class="flex-1">
            <label class="block text-[15px] font-medium text-gray-700 mb-2">
              CUPÓN DE DESCUENTO
            </label>

            <UFormField name="coupon">
              <div class="flex gap-4">
                <div class="flex-1">
                  <UInput
                      v-model="formRemittance.coupon"
                      placeholder="Ingresa tu cupón"
                      size="2xl"
                      class="w-full"
                  />
                </div>

                <div class="flex-shrink-0">
                  <UButton type="button" color="success" size="2xl" @click="applyCoupon">
                    Aplicar
                  </UButton>
                </div>
              </div>
            </UFormField>
          </div>
        </div>

        <!-- Compare Button -->
        <button
            type="submit"
            class="w-full bg-[#E87234] text-white py-4 rounded-xl text-[17px] font-medium hover:bg-[#D66024] transition-colors"
        >
          Completar transferencia
        </button>
      </UForm>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot'
import {useRemittanceStore} from '~/stores/remittance';
import {useSourcesStore} from "~/stores/sources";
import {operationsRepository} from "~/repositories/v1/platform/operationsRepository";

const router = useRouter();
const remittanceStore = useRemittanceStore();
const sourcesStore = useSourcesStore();
const requestOperations = operationsRepository();

const refFormRemittance = ref(null)
const fromCountry = ref(null)
const toCountry = ref(null)
const estimate = ref(null)
const loadingSubmit = ref(false)
const formRemittance = ref({
  from: 'PEN',
  to: 'BRL',
  amount: 10,
  coupon: null
})

const getCountries = computed(() => {
  return sourcesStore.countries.map(item => ({
    id: item.id,
    label: item.name,
    emoji: item.emoji,
    currency_id: item.currency_id
  }))
})

const schemaRemittance = v.object({
  from: v.string('Required'),
  to: v.string('Required'),
  amount: v.pipe(v.number('Required'), v.minValue(1, 'Amount required')),
  coupon: v.nullable(v.string('Invalid coupon')),
})

const debouncedRequest = useDebounceFn(() => 'response', 3000)

const handleAmountInput = async (value: number) => {
  if (!value) return
  await debouncedRequest()
  await calculateEstimate()
}

const calculateEstimate = async () => {
  const params = {
    ...formRemittance.value,
    coupon: formRemittance.value.coupon?.toUpperCase()
  }

  const response = await requestOperations.getEstimate(params)

  if (!response.success) {
    const listErrors = Object.keys(response.errors).map((key) => ({ name: key, message: response.errors[key][0] }))

    refFormRemittance.value?.setErrors(listErrors)
    return
  }

  estimate.value = response.data
}

const applyCoupon = () => {
  if (formRemittance.value.coupon) {
    calculateEstimate()
  }
}

const startOperation = () => {
  loadingSubmit.value = true

  router.push('/wizard/1');
}

onMounted(async () => {
  await Promise.all([
    sourcesStore.fetchCurrencies(),
    sourcesStore.fetchCountries(),
  ]);

  if (sourcesStore.countries?.length > 0) {
    await calculateEstimate();
  }
});
</script>
