export default defineNuxtPlugin(({ provide, $config }) => {
	const commonHeaders = new Headers({
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	})

	const $api = $fetch.create({
		baseURL: $config.public.apiBase,
		onRequest({ options }) {
			commonHeaders.forEach((value, key) => {
				options.headers.set(key, value)
			})
		},
		// async onResponse({ response}) {
		// },
		async onResponseError({ response }) {
			// if (response.status === 401) {
			// interceptar error de 401
			// }

			throw response
		},
	})

	$api.setHeader = (key: string, value: string) => commonHeaders.set(key, value)

	provide('api', $api)
})
