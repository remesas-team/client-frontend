import { handleApi } from '~/utils/handleApi'

export const userRepository = () => {
	const fetch = handleApi()

	return {
		async createBankAccount(params) {
			return fetch.post('/v1/platform/user-accounts/create', params)
		},
		async getBankAccounts() {
			return fetch.get('/v1/platform/user-accounts')
		},
		async updateProfile(params) {
			return fetch.post('/v1/platform/auth/profile', params)
		}
	}
}
