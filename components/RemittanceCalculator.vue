<template>
  <div class="max-w-[800px] mx-auto px-4 md:px-8 mb-16">
    <div class="bg-white rounded-3xl shadow-lg p-6 md:p-8">
      <!-- Country Selection Grid -->
      <div class="grid md:grid-cols-2 gap-6 mb-8">
        <!-- From Country -->
        <div class="relative">
          <label class="block text-[15px] font-medium text-gray-700 mb-2">
            ENVIAR DINERO DESDE
          </label>
          <button 
            class="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            @click="toggleFromCountries"
          >
            <div class="flex items-center gap-3">
              <span 
                class="object-cover rounded-sm text-[35px]">
                <template v-if="selectedFromCountry">
                  {{selectedFromCountry.emoji}}
                </template>
                <template v-else>
                  🌍
                </template>
              </span>
              <span class="text-[17px] font-medium">{{ selectedFromCountry?.name || 'Select Country' }}
              </span>
            </div>
            <svg 
              class="w-5 h-5 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showFromCountries }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- From Countries Dropdown -->
          <div 
            v-if="showFromCountries"
            class="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
          >
            <button
              v-for="country in getCountries"
              :key="country.id"
              @click="selectFromCountry(country)"
              class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <span 
                class="object-cover rounded-sm text-[35px]">
                {{country.emoji}}
              </span>
              <span class="text-[17px] font-medium">{{ country.name }}</span>
            </button>
          </div>
        </div>

        <!-- To Country -->
        <div class="relative">
          <label class="block text-[15px] font-medium text-gray-700 mb-2">
            HACIA
          </label>
          <button 
            class="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            @click="toggleToCountries"
          >
            <div class="flex items-center gap-3">
              <span 
                class="object-cover rounded-sm text-[35px]">
                <template v-if="selectedToCountry">
                  {{selectedToCountry.emoji}}
                </template>
                <template v-else>
                  🌍
                </template>
              </span>
              <span class="text-[17px] font-medium">{{ selectedToCountry?.name || 'Select Country' }}</span>
            </div>
            <svg 
              class="w-5 h-5 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showToCountries }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- Replace the To Countries Dropdown section -->
          <div 
            v-if="showToCountries"
            class="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
          >
            <button
              v-for="country in getCountries"
              :key="country.id"
              @click="selectToCountry(country)"
              class="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-50 transition-colors"
            >
              <span 
                class="object-cover rounded-sm text-[35px]">
                {{country.emoji}}
              </span>
              <span class="text-[17px] font-medium">{{ country.name }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Amount Section -->
      <div class="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4 items-end mb-8">
        <!-- Amount Input with Currency -->
        <div>
          <label class="block text-[15px] font-medium text-gray-700 mb-2">
            Monto a enviar:
          </label>
          <div class="flex bg-white border-2 border-[#8BC83F] rounded-xl relative">
            <input
              v-model="amount"
              type="text"
              inputmode="numeric"
              class="flex-1 bg-transparent text-[28px] font-medium px-4 py-2 focus:outline-none w-full"
              placeholder="0"
              @input="handleAmountInput"
            />
            <div class="absolute right-2 top-0 h-full">
              <button 
                class="h-full px-4 flex items-center gap-2 border-l-2 border-[#8BC83F] hover:bg-gray-50 transition-colors"
                @click="toggleFromCurrencyDropdown"
              >
                <span class="text-[17px] font-medium">{{ selectedFromCurrency }}</span>
                <svg 
                  class="w-5 h-5 text-gray-400 transition-transform duration-200"
                  :class="{ 'rotate-180': showFromCurrencyDropdown }"
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              <!-- From Currency Dropdown -->
              <div 
                v-if="showFromCurrencyDropdown"
                class="absolute z-10 w-24 mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
              >
                <button
                  v-for="currency in availableFromCurrencies"
                  :key="currency"
                  @click="selectFromCurrency(currency)"
                  class="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-[17px] font-medium"
                >
                  {{ currency }}
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Destination Currency -->
        <div class="relative">
          <label class="block text-[15px] font-medium text-gray-700 mb-2">
            Ellos reciben en:
          </label>
          <button 
            class="w-full flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
            @click="toggleToCurrencyDropdown"
          >
            <span class="text-[17px] font-medium">{{ selectedToCurrency }}</span>
            <svg 
              class="w-5 h-5 text-gray-400 transition-transform duration-200"
              :class="{ 'rotate-180': showToCurrencyDropdown }"
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          <!-- To Currency Dropdown -->
          <div 
            v-if="showToCurrencyDropdown"
            class="absolute z-10 w-full mt-2 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
          >
            <button
              v-for="currency in availableToCurrencies"
              :key="currency"
              @click="selectToCurrency(currency)"
              class="w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors text-[17px] font-medium"
            >
              {{ currency }}
            </button>
          </div>
        </div>
      </div>

      <!-- Exchange Rate Information -->
      <div v-if="estimate" class="space-y-4 mb-8">
        

        <div class="space-y-3">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Tipo de cambio:</span>
            <span class="text-[#E91E63] font-medium">1 {{ estimate.from }} = {{ estimate.exchange_unit }} {{ estimate.to }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Comisión de envío:</span>
            <span class="text-[#E91E63] font-medium">{{ estimate.from }} {{ (estimate.send_cost - estimate.amount).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Impuestos:</span>
            <span class="text-[#E91E63] font-medium">{{ estimate.from }} {{ estimate.tax || '0.00' }}</span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Subtotal:</span>
            <span class="text-[#E91E63] font-medium">{{ estimate.from }} {{ estimate.subtotal || (Number(estimate.send_cost) + Number(estimate.tax || 0)).toFixed(2) }}</span>
          </div>
          <div class="flex justify-between items-center font-bold">
            <span class="text-gray-600">Total a Recibir en destino:</span>
            <span class="text-[#E91E63]">{{ estimate.to }} {{ estimate.amount_to_send.toFixed(2) }}</span>
          </div>
        </div>

        <!-- Coupon Information -->
        <div v-if="estimate.coupon" class="p-4 bg-green-50 rounded-xl">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 text-green-500" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
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
          <input
            v-model="couponCode"
            type="text"
            class="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:outline-none focus:border-[#8BC83F]"
            :class="{ 'border-red-500': couponError }"
            placeholder="Ingresa tu cupón"
          />
          <p v-if="couponError" class="mt-2 text-sm text-red-600">
            {{ couponError }}
          </p>
        </div>
        <div class="flex items-end">
          <button
            @click="applyCoupon"
            class="px-6 py-4 bg-[#8BC83F] text-white rounded-xl hover:bg-[#7AB52F] transition-colors"
          >
            Aplicar
          </button>
        </div>
      </div>
      <!-- Compare Button -->
      <button 
        @click="startOperation"
        class="w-full bg-[#E87234] text-white py-4 rounded-xl text-[17px] font-medium hover:bg-[#D66024] transition-colors"
      >
        Completar transferencia
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from 'vue';
import { useRemittanceStore } from '@/stores/remittance';
import { useSystemConfigStore } from '@/stores/systemConfig';
import { storeToRefs } from 'pinia';

const router = useRouter();
const remittanceStore = useRemittanceStore();
const systemConfigStore = useSystemConfigStore();

// Get countries from systemConfig store
const { getCountries } = storeToRefs(systemConfigStore);

// Destructure what we need from the store with storeToRefs to maintain reactivity
const {
  amount,
  estimate,
  selectedFromCountry,
  selectedToCountry,
  selectedFromCurrency,
  selectedToCurrency,
  couponCode,
  couponError,
  availableFromCurrencies,
  availableToCurrencies,
} = storeToRefs(remittanceStore);


// Dropdown states (keeping these in component since they're UI-specific)
const showFromCountries = ref(false);
const showToCountries = ref(false);
const showFromCurrencyDropdown = ref(false);
const showToCurrencyDropdown = ref(false);

// Toggle dropdown visibility
const toggleFromCountries = () => {
  showFromCountries.value = !showFromCountries.value;
  showToCountries.value = false;
  showFromCurrencyDropdown.value = false;
  showToCurrencyDropdown.value = false;
};

const toggleToCountries = () => {
  showToCountries.value = !showToCountries.value;
  showFromCountries.value = false;
  showFromCurrencyDropdown.value = false;
  showToCurrencyDropdown.value = false;
};

const toggleFromCurrencyDropdown = () => {
  showFromCurrencyDropdown.value = !showFromCurrencyDropdown.value;
  showFromCountries.value = false;
  showToCountries.value = false;
  showToCurrencyDropdown.value = false;
};

const toggleToCurrencyDropdown = () => {
  showToCurrencyDropdown.value = !showToCurrencyDropdown.value;
  showFromCountries.value = false;
  showToCountries.value = false;
  showFromCurrencyDropdown.value = false;
};

// Select handlers
// First, add the Country interface at the top of the script
interface Country {
  id: number;
  name: string;
  phone_prefix: string;
  emoji: string;
  currency_id: number;
  currency: {
    id: number;
    name: string;
    code: string;
    symbol: string;
  };
}

const selectFromCountry = (country: Country) => {
  if (!country || !country.currency) return;
  
  remittanceStore.$patch({
    selectedFromCountry: country,
    selectedFromCurrency: country.currency.code
  });
  
  showFromCountries.value = false;
};

const selectToCountry = (country: Country) => {
  if (!country || !country.currency) return;
  
  remittanceStore.$patch({
    selectedToCountry: country,
    selectedToCurrency: country.currency.code
  });
  
  showToCountries.value = false;
  remittanceStore.calculateEstimate();
};

const selectFromCurrency = (currency: string) => {
  remittanceStore.updateFromCurrency(currency);
  showFromCurrencyDropdown.value = false;
};

const selectToCurrency = (currency: string) => {
  remittanceStore.updateToCurrency(currency);
  showToCurrencyDropdown.value = false;
};

// Close dropdowns when clicking outside
// Add debounce function for amount changes
const handleAmountInput = (event: Event) => {
  const value = (event.target as HTMLInputElement).value;
  amount.value = value;
  remittanceStore.calculateEstimate();
};

// Update onMounted section
onMounted(async () => {
  // Initialize system config first
  await systemConfigStore.initializeConfig();
  
  // Wait for countries to be loaded and set initial values
  await nextTick();
  
  if (getCountries.value?.length > 0) {
    const defaultFromCountry = getCountries.value[0];
    const defaultToCountry = getCountries.value[1] || getCountries.value[0]; // Fallback to first if second doesn't exist
    
    remittanceStore.$patch({
      selectedFromCountry: defaultFromCountry,
      selectedFromCurrency: defaultFromCountry.currency.code,
      selectedToCountry: defaultToCountry,
      selectedToCurrency: defaultToCountry.currency.code
    });
  }
  
  document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    if (!target.closest('.relative')) {
      showFromCountries.value = false;
      showToCountries.value = false;
      showFromCurrencyDropdown.value = false;
      showToCurrencyDropdown.value = false;
    }
  });
  remittanceStore.calculateEstimate();
});

// Update applyCoupon to use store action
const applyCoupon = () => {
  remittanceStore.applyCoupon();
};
const startOperation = () => {
  const numericAmount = parseFloat(amount.value);
  if (isNaN(numericAmount) || numericAmount <= 0) {
    alert('Por favor ingresa un monto válido');
    return;
  }

  localStorage.setItem('transferAmount', amount.value);
  router.push('/wizard/1');
};
</script>

<style scoped>
input[type="text"]::-webkit-input-placeholder {
  color: #9CA3AF;
}
</style>