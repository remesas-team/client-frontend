import { defineStore } from 'pinia'
import type {User} from "~/types/user";
import {authRepository} from "~/repositories/v1/platform/authRepository";

interface AuthState {
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.user,
    fullName: (state) => state.user ? `${state.user.name} ${state.user.last_name}` : ''
  },

  actions: {
    setToken(token) {
      const { $api, $config } = useNuxtApp()

      const authCookieToken = useCookie($config.public.auth.name_cookie_token, {
        domain: $config.public.auth.name_cookie_domain,
        maxAge: $config.public.auth.max_age,
      })

      authCookieToken.value = token
      $api.setHeader('Authorization', `Bearer ${token}`)
    },


    async logout() {
      // Clear auth state
      this.user = null
      this.token = null

      // Clear cookies
      this.removeToken()

      // Navigate to login
      navigateTo('/login')
    },

    removeToken() {
      const { $api, $config } = useNuxtApp()

      const authCookieToken = useCookie($config.public.auth.name_cookie_token, {
        domain: $config.public.auth.name_cookie_domain,
      })

      authCookieToken.value = null
      $api.setHeader('Authorization', null)
    },

    async login(params) {
      const { $auth } = useNuxtApp();
      const requestAuth = authRepository();
      const response = await requestAuth.postLogin(params);

      if (response.success) {
        $auth.setToken(response.data.access_token);
      }

      return response;
    },

    async fetchMe() {
      const requestAuth = authRepository();
      const response = await requestAuth.getMe();

      if (response.success) {
        this.user = response.data;
      }

      return response;
    },
  }
})
