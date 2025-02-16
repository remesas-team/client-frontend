import { defineStore } from 'pinia';
import type {Country} from "~/types/country";
import type {Currency} from "~/types/currency";

// Define interfaces for type safety
interface SystemState {
  countries: Country[];
  isLoading: boolean;
  error: string | null;
}

export const useSystemConfigStore = defineStore({
  id: 'systemConfig',
  state: (): SystemState => ({
    countries: [],
    isLoading: false,
    error: null,
  }),

  getters: {
    getCountries(state: SystemState): Country[] {
      return state.countries;
    },

    getCountryById(state: SystemState) {
      return (id: number): Country | undefined => {
        return state.countries.find(country => country.id === id);
      };
    },

    getCurrencies(state: SystemState): Currency[] {
      return state.countries.map(country => country.currency);
    }
  },

  actions: {
    async fetchCountries() {
      try {
        this.isLoading = true;
        this.error = null;

        const config = useRuntimeConfig();
        const response = await fetch(`${config.public.baseUrl}/api/v1/platform/sources/countries`);
        const result = await response.json();

        if (result.success) {
          this.countries = result.data;
        } else {
          throw new Error(result.message || 'Failed to fetch countries');
        }
      } catch (error) {
        this.error = error instanceof Error ? error.message : 'An error occurred';
        console.error('Error fetching countries:', error);
      } finally {
        this.isLoading = false;
      }
    },

    async initializeConfig() {
      await this.fetchCountries();
    }
  },
  persist: {
    key: 'system-config',
    storage: process.client ? localStorage : null,
    paths: ['countries']
  }
});
