import { defineStore } from 'pinia';

interface Country {
  code: string;
  name: string;
  flag: string;
  currencies: string[];
}

interface EstimateResponse {
  from: string;
  to: string;
  amount: number;
  exchange_unit: number;
  exchange_result: number;
  send_cost: number;
  tax?: number;
  coupon?: {
    code: string;
    description: string;
  };
  amount_to_send: number;
}

interface CreateAccountPayload {
  bank_id: number;
  district_id: number | null;
  currency_id: number;
  type: string;
  account_number: string;
  alias: string;
  is_joint_account: boolean;
}

export const useRemittanceStore = defineStore('remittance', {
  state: () => ({
    amount: '10',
    couponCode: '',
    couponError: '',
    estimate: null as EstimateResponse | null,
    selectedFromCountry: {
      code: 'PE',
      name: 'Perú',
      flag: 'https://flagcdn.com/w40/pe.png',
      currencies: ['USD', 'PEN']
    } as Country,
    selectedToCountry: {
      code: 'BR',
      name: 'Brasil',
      flag: 'https://flagcdn.com/w40/br.png',
      currencies: ['BRL']
    } as Country,
    selectedFromCurrency: 'USD',
    selectedToCurrency: 'BRL',
    countries: [
      {
        code: 'PE',
        name: 'Perú',
        flag: 'https://flagcdn.com/w40/pe.png',
        currencies: ['USD', 'PEN']
      },
      {
        code: 'BR',
        name: 'Brasil',
        flag: 'https://flagcdn.com/w40/br.png',
        currencies: ['BRL']
      }
    ] as Country[]
  }),

  getters: {
    availableFromCurrencies: (state) => state.selectedFromCountry.currencies,
    availableToCurrencies: (state) => state.selectedToCountry.currencies
  },

  actions: {
    async calculateEstimate() {
      try {
        const numericAmount = parseFloat(this.amount);
        if (isNaN(numericAmount) || numericAmount <= 0) return;

        const config = useRuntimeConfig();
        const authStore = useAuthStore();

        const params = new URLSearchParams({
          from: this.selectedFromCurrency,
          to: this.selectedToCurrency,
          amount: this.amount,
          coupon: this.couponCode
        });

        const response = await fetch(`${config.public.baseUrl}/api/v1/platform/operations/estimate?${params}`, {
          headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${authStore.token}`
          }
        });

        const data = await response.json();

        if (data.success) {
          this.estimate = data.data;
          this.couponError = '';
        } else {
          this.couponError = data.message || 'Error al aplicar el cupón';
        }
      } catch (error) {
        console.error('Error fetching estimate:', error);
        this.couponError = 'Error al aplicar el cupón';
      }
    },

    updateFromCountry(country: Country) {
      this.selectedFromCountry = country;
      this.selectedFromCurrency = country.currencies[0];
      this.calculateEstimate();
    },

    updateToCountry(country: Country) {
      this.selectedToCountry = country;
      this.selectedToCurrency = country.currencies[0];
      this.calculateEstimate();
    },

    updateFromCurrency(currency: string) {
      this.selectedFromCurrency = currency;
      this.calculateEstimate();
    },

    updateToCurrency(currency: string) {
      this.selectedToCurrency = currency;
      this.calculateEstimate();
    },

    updateAmount(newAmount: string) {
      this.amount = newAmount;
      this.calculateEstimate();
    },

    applyCoupon() {
      this.calculateEstimate();
    }
  },

  async createUserAccount(accountData: {
    accountType: 'bank' | 'pix',
    bank: string,
    accountNumber: string,
    accountAlias?: string
  }) {
    try {
      const config = useRuntimeConfig();
      const authStore = useAuthStore();
  
      // Map bank names to IDs (you might want to fetch this from an API)
      const bankMap: Record<string, number> = {
        'bradesco': 1,
        'itau': 2,
        'bancodobrasil': 3,
        'caixa': 4
      };
  
      const payload: CreateAccountPayload = {
        bank_id: bankMap[accountData.bank] || 1,
        district_id: null,
        currency_id: 1, // Assuming BRL
        type: 'corriente', // Default type
        account_number: accountData.accountNumber,
        alias: accountData.accountAlias || 'Cuenta principal',
        is_joint_account: false
      };
  
      const response = await fetch(`${config.public.baseUrl}/api/v1/platform/user-accounts/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${authStore.token}`
        },
        body: JSON.stringify(payload)
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || 'Error creating account');
      }
  
      return data.data;
    } catch (error) {
      console.error('Error creating account:', error);
      throw error;
    }
  }
});