interface User {
  id: number;
  name: string;
  last_name: string;
  phone_code: string;
  phone: string;
  email: string;
  birth_date: string;
  doc_type_id: number;
  user_status_id: number;
  doc_value: string;
  is_pep: number;
  is_pep_familiar: number;
  occupation_id: number;
  genre: string;
  proof_residence: string | null;
  civil_status: string;
  address: string;
  geo_district_id: string;
  email_verified_at: string | null;
  created_at: string;
  updated_at: string;
}

interface AuthState {
  token: string | null;
  user: User | null;
}

export const useAuth = () => {
  const state = reactive<AuthState>({
    token: null,
    user: null
  });
  const config = useRuntimeConfig();

  const login = async (email: string, password: string) => {
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

      setAuth(data.data.access_token, data.data.user);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const setAuth = (token: string, user: any) => {
    state.token = token;
    state.user = user;
    localStorage.setItem('auth_token', token);
  };

  const clearAuth = () => {
    state.token = null;
    state.user = null;
    localStorage.removeItem('auth_token');
  };

  const logout = async () => {
    try {
      const response = await fetch(`${config.public.baseUrl}/api/v1/platform/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${state.token}`,
          'Accept': 'application/json',
        }
      });

      if (!response.ok) {
        throw new Error('Error during logout');
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      clearAuth();
      navigateTo('/login');
    }
  };

  return {
    state,
    login,
    logout,
    setAuth,
    clearAuth
  };
};
