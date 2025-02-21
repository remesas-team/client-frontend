export const useRemittanceStore = defineStore('remittance', {
  state: () => ({
    form: {
      source_origin_fund_id: 2,
      source_user_account_id: 1,
      destination_user_account_id: 2,
      source_currency_id: 2,
      source_amount: 100.00,
      collection_system_account_id: 1,
      destination_currency_id: 3,
      destination_bank_account_id: 1,
      destination_amount: 95.00,
      exchange_rate: 1.87,
      destination_origin_fund_id: 3,
      coupon_id: null,
      timezone: "America/Lima",
      payment_method: "transferencia",
      source_country_id: 0,
      destination_country_id: 0
    },
  }),

  getters: {},

  actions: {
    async createUserAccount(accountData: {
      accountType: 'bank' | 'pix',
      bank: string,
      accountNumber: string,
      accountAlias?: string
    }) {
      const payload = {
        bank_id: 1,
        district_id: null,
        currency_id: 1, // Assuming BRL
        type: 'corriente', // Default type
        account_number: accountData.accountNumber,
        alias: accountData.accountAlias || 'Cuenta principal',
        is_joint_account: false
      };
    }
  },
});
