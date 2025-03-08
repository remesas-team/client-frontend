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

export const trackLogOut = () => {
	tracer.track('logout')
	tracer.reset()
}
