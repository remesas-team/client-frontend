import type { Currency } from '~/types/currency'

export interface Country {
	id: number
	name: string
	phone_prefix: string
	emoji: string
	currency_id: number
	currency: Currency
}
