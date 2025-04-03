import tracer from '~/tracking/analytics'

export const trackIdentify = (userParams = {}) => {
	const { $auth } = useNuxtApp()
	const user = $auth.user

	if (user === null) return

	const params = {
		...userParams,
		id: user.id,
		email: user.email,
	}

	tracer.identify(user.email, params)
}

export const trackLogIn = () => {
	trackIdentify()
	tracer.track('login')
}

export const trackRegister = () => {
	trackIdentify()
	tracer.track('create_account')
}

export const trackLogOut = () => {
	tracer.track('logout')
	tracer.reset()
}
