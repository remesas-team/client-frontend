import { sourcesRepository } from '~/repositories/v1/platform/sourcesRepository'
import {useRemittanceStore} from '~/stores/remittance'
import type { Country } from '~/types/country'
import type { Currency } from '~/types/currency'

interface SourcesState {
	genders: any[]
	occupations: any[]
	civil_statuses: any[]
	currencies: Currency[]
	countries: Country[]
	system_accounts: any[]
	banks: any[]
	doc_types: any[]
}

export const useSourcesStore = defineStore('sources', {
	state: (): SourcesState => ({
		genders: [],
		occupations: [],
		civil_statuses: [],
		currencies: [],
		countries: [],
		banks: [],
		system_accounts: [],
		doc_types: []
	}),

	getters: {},

	actions: {
		async fetchGenders() {
			if (this.genders.length > 0) return { success: true, data: this.genders }

			const requestSources = sourcesRepository()
			const response = await requestSources.getGenders()

			if (response.success) {
				const formattedResponse = response.data.map((item) => ({
					value: item.id,
					label: item.name,
				}))
				this.genders = formattedResponse
				return formattedResponse
			} else {
				return response
			}
		},
		async fetchOccupations() {
			if (this.occupations.length > 0) {
				console.log("store", this.occupations)
				return { success: true, data: this.occupations }
			}

			const requestSources = sourcesRepository()
			const response = await requestSources.getOccupations()

			if (response.success) {
				const formattedResponse = response.data.map((item) => ({
					value: item.id,
					label: item.name,
				}))
				this.occupations = formattedResponse
				console.log('formattedResponse', formattedResponse)
				return formattedResponse
			} else {
				console.log('false data')
				return response.data
			}
		},
		async fetchCivilStatuses() {
			if (this.civil_statuses.length > 0) return { success: true, data: this.civil_statuses }

			const requestSources = sourcesRepository()
			const response = await requestSources.getCivilStatuses()

			if (response.success) {
				this.civil_statuses = response.data
			}

			return response
		},
		async fetchCurrencies() {
			if (this.currencies.length > 0) return { success: true, data: this.currencies }

			const requestSources = sourcesRepository()
			const response = await requestSources.getCurrencies()

			if (response.success) {
				this.currencies = response.data
			}

			return response
		},
		async fetchCountries() {
			if (this.countries.length > 0) return { success: true, data: this.countries }

			const requestSources = sourcesRepository()
			const response = await requestSources.getCountries()

			if (response.success) {
				this.countries = response.data
			}

			return response
		},
		async fetchSystemAccounts() {
			if (this.countries.length > 0) return { success: true, data: this.countries }

			const requestSources = sourcesRepository()
			const response = await requestSources.getSystemAccounts()

			if (response.success) {
				this.system_accounts = response.data

				// Extraemos el array de cuentas
				const accounts = this.system_accounts

				// Creamos un objeto para agrupar las cuentas por país
				const countriesMap = {}

				// Recorremos cada cuenta para agrupar por país y acumular sus monedas (sin duplicados)
				accounts.forEach((account) => {
					const { country, currency } = account
					const countryId = country.id

					// Si el país no existe en el mapa, lo inicializamos con un arreglo vacío de currencies
					if (!countriesMap[countryId]) {
						countriesMap[countryId] = {
							id: country.id,
							name: country.name,
							emoji: country.emoji,
							currencies: [], // Aquí se guardarán los objetos de currency
						}
					}

					// Solo se añade la moneda si no existe ya en el arreglo (se comprueba por id)
					const exists = countriesMap[countryId].currencies.some((c) => c.id === currency.id)
					if (!exists) {
						countriesMap[countryId].currencies.push(currency)
					}
				})

				// Convertimos el objeto de países a un arreglo
				const countriesArray = Object.values(countriesMap)
				this.countries = countriesArray
			}

			return response
		},
		async fetchBanksByCountry() {
			//if (this.banks.length > 0) return { success: true, data: this.banks }
			const remittanceStore = useRemittanceStore()
			const requestSources = sourcesRepository()
			const response = await requestSources.getBanksByCountry({
				country_id: remittanceStore.form.destination_country_id,
			})
		
			if (!response.success) {
				return
			}
			banks.value = response.data
		},
		async fetchDocTypes() {
			if (this.doc_types.length > 0) return { success: true, data: this.doc_types }

			const requestSources = sourcesRepository()
			const response = await requestSources.getDocumentTypes()

			if (response.success) {
				this.doc_types = response.data
			}

			return response
		},
	},
})
