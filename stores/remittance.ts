import {operationsRepository} from "~/repositories/v1/platform/operationsRepository";

export const useRemittanceStore = defineStore('remittance', {
  state: () => ({
    form: {
      // Base
      timezone: "America/Lima",
      payment_method: "transferencia",

      // Form remittance
      source_country_id: null,
      source_currency_id: null,
      source_currency_symbol: null,
      destination_country_id: null,
      destination_currency_id: null,
      destination_currency_symbol: null,
      source_amount: null,
      destination_amount: null,
      exchange_rate: null,
      send_cost: null,
      coupon_id: null,
      send_tax: null,
      amount_to_send: null,

      // Step 1
      destination_user_account_id: null,

      // Step 2
      source_user_account_id: null,

      // ????
      collection_system_account_id: 1,
      // source_origin_fund_id: null,
      // destination_bank_account_id: null,
      // destination_origin_fund_id: null,
    },
    currentOperation: null,
  }),

  getters: {},

  actions: {
    async createOperation() {
      const remittance = operationsRepository()
      const response = await remittance.postOperation(this.form)

      if (response.success) {
        this.currentOperation = response.data
      }

      return response
    }
  },

  persist: true,
});
