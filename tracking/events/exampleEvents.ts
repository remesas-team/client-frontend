import tracer from '~/tracking/analytics'

export const trackExample = () => {
	tracer.track('example')
}
