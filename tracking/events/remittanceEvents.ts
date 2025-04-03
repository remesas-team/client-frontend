import tracer from '~/tracking/analytics'

export const trackEstimate = (params, recalculado) => {
	if (recalculado) {
		params = {
			...params,
			recalculado: true
		}
	}
	tracer.track('estimate', params)
}
export const trackApplyCoupon = (params) => {
	tracer.track('cupon_applie', params)
}

export const trackStartRemittance = (params) => {
	tracer.track('remittance_start', params)
}

export const trackSetDestinatary = (params) => {
	tracer.track('remittance_destination', params)
}

export const trackSetOrigin = (params) => {
	tracer.track('remittance_origin', params)
}

export const trackConfirmation = (params) => {
	tracer.track('remittance_confirmation', params)
}

export const trackUpload = (params) => {
	// format, 
	tracer.track('remittance_upload', params)
}

export const trackFinish = (params) => {
	tracer.track('remittance_finish', params)
}
