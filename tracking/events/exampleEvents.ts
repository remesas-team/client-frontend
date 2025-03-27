import tracer from '~/tracking/analytics'
// import { useRemittanceStore } from '~/stores/remittance'

export const trackExample = (params = {}) => {
	// Access the Nuxt app
	// const { $config } = useNuxtApp()

	// Access the route
	// const route = useRoute()

	// Access the store
	// const remittanceStore = useRemittanceStore()

	// Access the cookie
	// const cookie = useCookie('')

	tracer.track('example', {
		name: params?.name,
		// page: route.path,
		// url: $config.public.domain,
		// cookie: cookie.value,
		// store: remittanceStore.form,
	})
}
