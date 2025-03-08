import { handleApi } from '~/utils/handleApi'

export const authRepository = () => {
	const fetch = handleApi()

	return {
		async postRegister(params) {
			return fetch.post('/v1/platform/auth/register', params)
		},
		async postLogin(params) {
			return fetch.post('/v1/platform/auth/login', params)
		},
		async posLogout() {
			return fetch.post('/v1/platform/auth/logout')
		},
		async getMe() {
			return fetch.get('/v1/platform/auth/me')
		},
	}
}
