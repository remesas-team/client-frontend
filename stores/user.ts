import {userRepository} from "~/repositories/v1/platform/userRepository";


export const useUserStore = defineStore('user', {
  state: (): bankAccounts => (
    {
        "bank_id": 1,
        "district_id": null,
        "currency_id": 1,
        "type": "corriente",
        "account_number": "1234567890",
        "alias": "Cuenta principal",
        "is_joint_account": false
      }
  ),

  getters: {
    
  },

  actions: {
    async createBankAccount() {
    
        const requestUser = userRepository();
        const response = await requestUser.createBankAccount();

        if (response.success) {
          this.occupations = response.data;
        }

        return response;
    },

  },

});