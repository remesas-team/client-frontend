import { defineStore } from 'pinia'
import type {User} from "~/types/user";

interface AuthState {
  token: string | null;
  user: User | null;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    token: null,
    user: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    fullName: (state) => state.user ? `${state.user.name} ${state.user.last_name}` : ''
  },

  actions: {
    initializeFromCookies() {
      const tokenCookie = useCookie('auth_token');
      const userCookie = useCookie('auth_user');

      if (tokenCookie.value) {
        this.token = tokenCookie.value;
        const {$api} = useNuxtApp()
        $api.setHeader('Authorization', `Bearer ${this.token}`)
      }

      if (userCookie.value) {
        try {
          const parsedUser = typeof userCookie.value === 'string'
            ? JSON.parse(userCookie.value)
            : userCookie.value;
          this.user = parsedUser;
        } catch (e) {
          console.error('Error parsing user cookie:', e);
          this.clearAuth();
        }
      }
    },

    setAuth(token: string, user: User) {
      this.token = token;
      this.user = user;
      


      const tokenCookie = useCookie('auth_token', {
        maxAge: 604800,
        sameSite: 'lax'
      });
      const userCookie = useCookie('auth_user', {
        maxAge: 604800,
        sameSite: 'lax'
      });

      tokenCookie.value = token;
      userCookie.value = JSON.stringify(user);
    },

    clearAuth() {
      this.token = null;
      this.user = null;

      const tokenCookie = useCookie('auth_token');
      const userCookie = useCookie('auth_user');

      tokenCookie.value = null;
      userCookie.value = null;
    },

    async getProfile(token: string) {
        console.log("get profile", token);
      const config = useRuntimeConfig();

      try {
        const response = await fetch(`${config.public.baseUrl}/api/v1/platform/auth/user`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/json',
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error fetching user profile');
        }

        this.user = data.data;
        console.log(data.data)
        return data.data;
      } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
      }
    },

    async login(email: string, password: string) {
      const config = useRuntimeConfig();

      try {
        const response = await fetch(`${config.public.baseUrl}/api/v1/platform/auth/login`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Error during login');
        }
        console.log(data.data.user, data.data.access_token)
        // Fetch complete profile
        data.data.user = await this.getProfile(data.data.access_token);

        console.log(data.data.user, data.data.access_token)


        // Set initial auth data
        this.setAuth(data.data.access_token, data.data.user);


        return true;
      } catch (error) {
        console.error('Login error:', error);
        throw error;
      }
    },

    async logout() {
      const config = useRuntimeConfig();

      try {
        const response = await fetch(`${config.public.baseUrl}/api/v1/platform/auth/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.token}`,
            'Accept': 'application/json',
          }
        });

        if (!response.ok) {
          throw new Error('Error during logout');
        }
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.clearAuth();
        navigateTo('/login');
      }
    }
  }
})
