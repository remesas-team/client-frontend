import tracer from '~/tracking/analytics'
import { useRemittanceStore } from '~/stores/remittance'

export const trackRemittanceCalculator = () => {
	const remittanceStore = useRemittanceStore()

	tracer.track('remittance_calculator', {
		source_country_name: remittanceStore.form.source_country_id,
	})
}
