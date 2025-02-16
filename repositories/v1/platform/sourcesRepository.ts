import {handleApi} from "~/utils/handleApi";

export const sourcesRepository = () => {
    const fetch = handleApi()

    return {
        async getGenders() {
            return fetch.get('/v1/platform/sources/genders')
        },
        async getOccupations() {
            return fetch.get('/v1/platform/sources/occupations')
        },
        async getCivilStatuses() {
            return fetch.get('/v1/platform/sources/civil-statuses')
        },
        async getCurrencies() {
            return fetch.get('/v1/platform/sources/currencies')
        },
        async getCountries() {
            return fetch.get('/v1/platform/sources/countries')
        },
        async getExchangeRate(params) {
            return fetch.get('/v1/platform/sources/exchange-rate', params)
        },
        async getBanksByCountry(params) {
            return fetch.get('/v1/platform/sources/banks-by-country', params)
        },
        async getRegions(params) {
            return fetch.get('/v1/platform/sources/regions', params)
        },
        async getProvinces(params) {
            return fetch.get('/v1/platform/sources/provinces', params)
        },
        async getDistricts(params) {
            return fetch.get('/v1/platform/sources/districts', params)
        },
        async getDocumentTypes(params) {
            return fetch.get('/v1/platform/sources/document-types', params)
        },
    }
}

