import { RudderAnalytics } from '@rudderstack/analytics-js'

type ConfigProvide = {
	key: string
	url: string
}

type Properties = {
	[key: string]: string | number | boolean
}

export const analytics = new RudderAnalytics()

const tracer = {
	identify(userId: string, params?: Properties) {
		analytics.identify(userId, params)
	},
	page() {
		analytics.page()
	},
	track(name: string, params?: Properties) {
		analytics.track(name?.toLowerCase(), params)
	},
	alias(previousId: string, userId: string) {
		analytics.alias(previousId, userId)
	},
	reset() {
		analytics.reset()
	},
	getUserId() {
		return analytics.getUserId()
	},
	getAnonymousId() {
		return analytics.getAnonymousId()
	},
}

export const tracerLoad = (config: ConfigProvide) => {
	window.rudderanalytics = analytics
	analytics.load(config.key, config.url)
}

export default tracer
