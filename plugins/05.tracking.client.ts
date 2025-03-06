import { tracerLoad } from '~/tracking/analytics'

export default defineNuxtPlugin(({ $config }) => {
	const { data_integration_platform } = $config.public

	if (data_integration_platform.enabled) {
		tracerLoad({
			key: data_integration_platform.key,
			url: data_integration_platform.url,
		})
	}
})
