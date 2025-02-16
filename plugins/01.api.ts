export default defineNuxtPlugin(({ provide, $config }) => {
	const $api = $fetch.create({
		baseURL: $config.public.apiBase,
		onRequest({ request, options }) {
			options.headers.set('Content-Type', 'application/json')
			options.headers.set('Accept', 'application/json')
		},
		async onResponse({ response}) {
		},
		async onResponseError({ response }) {
			// if (response.status === 401) {
			// interceptar error de 401
			// }

			throw response
		},
	})

	provide('api', $api)
})
