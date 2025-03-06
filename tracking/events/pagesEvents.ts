import tracer from '~/tracking/analytics'

export const trackPage = () => {
	tracer.page()
}
