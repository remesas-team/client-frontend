import {sourcesRepository} from "~/repositories/v1/platform/sourcesRepository";
import type {Country} from "~/types/country";
import type {Currency} from "~/types/currency";

interface SourcesState {
    genders: any[];
    occupations: any[];
    civil_statuses: any[];
    currencies: Currency[];
    countries: Country[];
}

export const useSourcesStore = defineStore('sources', {
  state: (): SourcesState => ({
    genders: [],
    occupations: [],
    civil_statuses: [],
    currencies: [],
    countries: [],
  }),

  getters: {},

  actions: {
    async fetchGenders() {
        if (this.genders.length > 0) return { success: true, data: this.genders };

        const requestSources = sourcesRepository();
        const response = await requestSources.getGenders();

        if (response.success) {
          this.genders = response.data;
        }

        return response;
    },
    async fetchOccupations() {
        if (this.occupations.length > 0) return { success: true, data: this.occupations };

        const requestSources = sourcesRepository();
        const response = await requestSources.getOccupations();

        if (response.success) {
          this.occupations = response.data;
        }

        return response;
    },
    async fetchCivilStatuses() {
        if (this.civil_statuses.length > 0) return { success: true, data: this.civil_statuses };

        const requestSources = sourcesRepository();
        const response = await requestSources.getCivilStatuses();

        if (response.success) {
          this.civil_statuses = response.data;
        }

        return response;
    },
    async fetchCurrencies() {
        if (this.currencies.length > 0) return { success: true, data: this.currencies };

        const requestSources = sourcesRepository();
        const response = await requestSources.getCurrencies();

        if (response.success) {
          this.currencies = response.data;
        }

        return response;
    },
    async fetchCountries() {
        if (this.countries.length > 0) return { success: true, data: this.countries };

        const requestSources = sourcesRepository();
        const response = await requestSources.getCountries();

        if (response.success) {
          this.countries = response.data;
        }

        return response;
    },
  },
});
