import tracer from '~/tracking/analytics'

export const trackEstimate = (params) => {
	tracer.track('estimate', params)
}
export const trackApplyCoupon = () => {
	tracer.track('example')
}

export const trackStartRemittance = () => {
	tracer.track('example')
}

export const trackStep = () => {
	tracer.track('example')
}

export const trackNewDestinatary = () => {
	tracer.track('example')
}

export const trackNewOrigin = () => {
	tracer.track('example')
}

export const trackConfirmation = () => {
	tracer.track('example')
}

export const trackUpload = () => {
	tracer.track('example')
}

