import { userRepository } from '~/repositories/v1/platform/userRepository'

export const useUserStore = defineStore('user', {
state: () => ({
    bankAccounts: {
        bank_id: 1,
        district_id: null,
        currency_id: 1,
        type: 'corriente',
        account_number: '1234567890',
        alias: 'Cuenta principal',
        is_joint_account: false,
    },
    bankAccountsList: [], // Store for GetBankAccounts response
    profile: {
        name: '',
        last_name: '',
        phone_code: '',
        phone: '',
        birth_date: '',
        doc_type_id: null,
        user_status_id: null,
        doc_value: '',
        is_pep: 0,
        is_pep_familiar: 0,
        occupation_id: null,
        genre: '',
        civil_status: '',
        address: '',
        geo_district_id: ''
    }
}),

	getters: {},

	actions: {
		async createBankAccount() {
			const requestUser = userRepository()
			const response = await requestUser.createBankAccount()

			if (response.success) {
				this.occupations = response.data
			}

			return response
		},
		async getBankAccounts() {
			const requestUser = userRepository()
			const response = await requestUser.getBankAccounts()
			if (response.success) {
				this.bankAccountsList = response.data
			}
			return response
		},
		async updateProfile(profileData) {
			const requestUser = userRepository()
			const response = await requestUser.updateProfile(profileData)
			
			if (response.success) {
				// Update local profile data
				this.profile = { ...this.profile, ...profileData }
			}
			
			return response
		},
	},
})
