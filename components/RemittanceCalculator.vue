<template>
  <div class="max-w-[450px] mx-auto px-2 md:px-4 mb-16">
    <div class="bg-white rounded-xl shadow-lg px-4 md:px-8 py-5 md:py-12">
      <UForm id="refFormRemittance" ref="refFormRemittance" :schema="v.safeParser(schemaRemittance)"
        :state="formRemittance" @submit="startOperation">
        <!-- Country Selection Grid -->
        <div class="grid gap-1  mb-4">
          <!-- From Country -->
          <div class="relative">
            <USelectMenu class="w-full mb-0 bg-[#93f7f41c]" :searchInput="false" v-model="fromCountry"
              :items="getCountries" variant="soft" size="xl" @change="setFromCurrencies"
              :ui="{ base: 'bg-gray-100 hover:bg-gray-200 focus:bg-gray-200' }">
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
            <label
              class="absolute shadow-md rounded-lg left-[10px] top-[-15px] z-10 bg-white px-3 py-1 block text-[12px] font-medium text-gray-700 mb-2">
              HACIA
            </label>
            <USelectMenu class="w-full" :searchInput="false" v-model="toCountry" :items="getCountries" variant="soft"
              size="xl" @change="setFromCurrencies" :ui="{ base: 'bg-gray-100 hover:bg-gray-200 focus:bg-gray-200' }">
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
        <div class="grid grid-cols-1 gap-4 items-start mb-4">
          <!-- Amount Input with Currency -->
          <div>
            <label class="block text-[15px] font-medium text-gray-700 mb-2">
              Monto a enviar:
            </label>
            <UFormField name="amount">
              <UButtonGroup size="2xl" class="w-full">
                <UInput size="2xl" v-model="formRemittance.amount" placeholder="Monto a enviar" class="flex-1"
                  type="number" @update:modelValue="handleAmountInput" />
                <USelectMenu class="w-32" @change="calculateEstimate" :search-input="false"
                  v-model="formRemittance.from" value-key="label" :items="getFromCurrency" />
              </UButtonGroup>
            </UFormField>
          </div>
          <!-- Destination Currency -->
          <div>
            <div class="flex justify-between">
              <label class="block text-[15px] font-medium text-gray-700 mb-2">
                Ellos reciben:
              </label>
              <span class="text-md font-bold hover:cursor-pointer hover:text-green-wather"
                @click="showCoupon = !showCoupon">Aplicar cupon</span>
            </div>
            <UFormField name="destination_amount">
              <UButtonGroup size="2xl" class="w-full">
                <UInput v-if="estimate" v-model="estimate.exchange_result" placeholder="Monto a enviar" class="flex-1"
                  type="number" @update:modelValue="reverseAmount" />
                <USelectMenu size="2xl" class="w-32" @change="calculateEstimate" :search-input="false"
                  v-model="formRemittance.to" value-key="label" :items="getToCurrency" />
              </UButtonGroup>
            </UFormField>
          </div>
        </div>
        <!-- Coupon Section -->
        <div class="flex gap-4 mb-8" v-if="showCoupon">
          <div class="flex-1">
            <UFormField name="coupon">
              <div class="flex gap-2">
                <div class="flex-1">
                  <UInput v-model="formRemittance.coupon" placeholder="Ingresa tu cupón" size="2xl" class="w-full" />
                </div>
                <div class="flex-shrink-0">
                  <UButton type="button"
                    class="hover:cursor-pointer px-5 py-4 bg-green-dark text-white hover:bg-green-grass"
                    @click="applyCoupon">
                    Aplicar
                  </UButton>
                </div>
              </div>
            </UFormField>
          </div>
        </div>
        <!-- Exchange Rate Information -->
        <div class="flex items-center gap-2 text-lg mb-5 cursor-pointer hover:underline" @click="showDetails = !showDetails">
          <div>Mira los detalles</div>
          <UIcon name="i-lucide:chevron-down" :class="showDetails ? 'rotate-180' : ''" />
        </div>
        <div v-if="estimate && showDetails" class="[&>*]:mb-4 mb-8">
          <div class="[&>*]:mb-3">
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
        }} {{ (estimate.send_cost).toFixed(2) }}</span>
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
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Total a enviar:</span>
              <span class="text-[#E91E63] font-medium">{{
        estimate.from
      }} {{ estimate.amount_to_send.toFixed(2) }}</span>
            </div>
            <div class="flex justify-between items-center font-bold">
              <span class="text-gray-600">Total a Recibir en destino:</span>
              <span class="text-[#E91E63]">{{ estimate.to }} {{ estimate.exchange_result.toFixed(2) }}</span>
            </div>
          </div>
        </div>
        <!-- Coupon Information -->
        <div v-if="estimate && estimate.coupon !== 'not applied'" class="p-4 bg-green-50 rounded-xl mb-4">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clip-rule="evenodd" />
            </svg>
            <span class="font-medium text-green-700">{{ estimate.coupon.code }}</span>
          </div>
          <p class="text-sm text-green-600 mt-1">{{ estimate.coupon.description }}</p>
          <p class="font-bold text-green-600">Ahorraste: {{ estimate.savings }} {{ estimate.from }}</p>
        </div>
        <!-- Compare Button -->
        <button type="submit"
          class="w-full bg-green-grass text-white py-4 rounded-xl text-[17px] font-medium hover:bg-green-dark transition-colors hover:cursor-pointer">
          Iniciar transferencia
        </button>
      </UForm>
    </div>

  </div>
</template>

<script setup lang="ts">
import * as v from 'valibot'
import { useRemittanceStore } from '~/stores/remittance';
import { useSourcesStore } from "~/stores/sources";
import { operationsRepository } from "~/repositories/v1/platform/operationsRepository";

const props = defineProps(['setCoupon'])

const router = useRouter();
const remittanceStore = useRemittanceStore();
const sourcesStore = useSourcesStore();
const requestOperations = operationsRepository();

const refFormRemittance = ref(null)
const fromCountry = ref(null)
const toCountry = ref(null)
const toCurrency = ref(null)
const fromCurrency = ref(null)
const estimate = ref(null)
const loadingSubmit = ref(false)
const showDetails = ref(false)
const showCoupon = ref(false)

const formRemittance = ref({
  from: 'PEN',
  to: 'BRL',
  amount: 1500,
  coupon: null
})

const getCountries = computed(() => {
  if (!sourcesStore.countries) return []

  return sourcesStore.countries.map(item => ({
    id: item.id,
    label: item.name,
    emoji: item.emoji,
    currency_id: item.currency_id
  }))
})

const getFromCurrency = computed(() => {
  if (!fromCountry.value) return null
  const currentCountry = sourcesStore.countries.find(country => country.id === fromCountry.value.id)
  return currentCountry.currencies.map((item) => ({
    id: item.id,
    label: item.code,
  }))
})

const getToCurrency = computed(() => {
  if (!fromCountry.value) return null
  const currentCountry = sourcesStore.countries.find(country => country.id === toCountry.value.id)
  return currentCountry.currencies.map((item) => ({
    id: item.id,
    label: item.code
  }))
})

const schemaRemittance = v.object({
  from: v.string('Required'),
  to: v.string('Required'),
  amount: v.pipe(v.number('Required'), v.minValue(1, 'Amount required')),
  coupon: v.nullable(v.string('Invalid coupon')),
})

const reverseAmount = () => {
  if (estimate.value) {
    console.log(estimate.value)
    formRemittance.value.amount = Number((estimate.value.exchange_result / estimate.value.exchange_unit).toFixed(2))
  }
}

const handleAmountInput = (value: number) => {
  if (!value) return
  let debounceTimer;
  clearTimeout(debounceTimer);
  debounceTimer = setTimeout(async () => {
    await calculateEstimate();
  }, 1000);


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

  remittanceStore.$reset()
  // Origin
  remittanceStore.form.source_country_id = fromCountry.value.id
  remittanceStore.form.source_currency_id = getFromCurrency.value.find((item) => item.label === formRemittance.value.from).id
  remittanceStore.form.source_currency_symbol = estimate.value.from

  // Destination
  remittanceStore.form.destination_country_id = toCountry.value.id
  remittanceStore.form.destination_currency_id = getToCurrency.value.find((item) => item.label === formRemittance.value.to).id
  remittanceStore.form.destination_currency_symbol = estimate.value.to

  // Result remittance
  remittanceStore.form.source_amount = formRemittance.value.amount
  remittanceStore.form.destination_amount = estimate.value.exchange_result
  remittanceStore.form.exchange_rate = estimate.value.exchange_unit
  remittanceStore.form.send_cost = estimate.value.send_cost
  remittanceStore.form.coupon_id = formRemittance.value.coupon?.toUpperCase() || null
  remittanceStore.form.send_tax = estimate.value.tax
  remittanceStore.form.amount_to_send = estimate.value.amount_to_send

  router.push('/operacion/1');
}

const initCalculator = () => {
  fromCountry.value = getCountries.value[0]
  toCountry.value = getCountries.value[1]
  formRemittance.value.from = getFromCurrency.value[0].label;
  formRemittance.value.to = getToCurrency.value[0].label;
}

const setFromCurrencies = () => {

  // If countries are the same, set destination to next available country
  if (fromCountry.value.id === toCountry.value.id) {
    const availableCountries = getCountries.value.filter(country =>
      country.id !== fromCountry.value.id
    );
    toCountry.value = availableCountries[0] || getCountries.value[1];
  }


  formRemittance.value.from = getFromCurrency.value[0].label;
  formRemittance.value.to = getToCurrency.value[0].label;

  console.log(fromCountry.value, toCountry.value)


  calculateEstimate();
}

onMounted(async () => {
  await Promise.all([
    sourcesStore.fetchCurrencies(),
    sourcesStore.fetchSystemAccounts(),
  ]);

  if (sourcesStore.countries?.length > 0) {
    initCalculator();
    await calculateEstimate();
  }
});

watch(() => props.setCoupon, (newCoupon) => {
  console.log(newCoupon)
  if (newCoupon) {
    showCoupon.value = true;
    formRemittance.value.coupon = newCoupon;
    calculateEstimate();
  }
});


</script>
