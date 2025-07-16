import { create } from 'zustand';
import { toast } from 'react-toastify';
import api from '../../api';


const useAuthStore = create((set, get) => ({
  accessToken: localStorage.getItem('accessToken') || null,
  refreshToken: localStorage.getItem('refreshToken') || null,
  isAuthenticated: !!localStorage.getItem('refreshToken'),
  user: null,
  loading: false,
  error: null,

  login: async (username, password) => {
    try {
      set({ loading: true, error: null });
      // const response = await axios.post('http://localhost:8000/api/token/', { username, password });
      const response = await api.post('/token/', { username, password });
      const { access, refresh } = response.data;
      get().setTokens(access, refresh);

      // await get().fetchUserInfo();
      return true;

    } catch (error) {
      set({
        error: "Ha ocurrido un error al iniciar sesión. Por favor, verifica tus credenciales.",
        isAuthenticated: false,
      });
      toast.error("Error al iniciar sesión. Por favor, verifica tus credenciales.");
      console.error('Error during login:', error);
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    delete api.defaults.headers.common['Authorization'];

    set({ accessToken: null, refreshToken: null, isAuthenticated: false, user: null });
    window.location.href = '/ingresar';
  },

  refreshAccessToken: async () => {
    try {
      const { refreshToken } = get();

      if (!refreshToken) {
        throw new Error('No hay token de actualización disponible.');
      }

      const response = await api.post('/token/refresh/', { refresh: refreshToken });
      const { access } = response.data;

      localStorage.setItem('accessToken', access);

      set({ accessToken: access, error: null });
      return true;
    } catch (error) {
      get().logout();
      set({ error: "Error al refrescar el token de acceso. Por favor, vuelve a iniciar sesión." });
      console.error('Error refreshing access token:', error);
      return false;
    }
  },

  setTokens: (accessToken, refreshToken) => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
    if (refreshToken) {
      localStorage.setItem('refreshToken', refreshToken);
    }

    set({ accessToken, refreshToken, isAuthenticated: true, error: null });
  },

  fetchUserInfo: async () => {
    try {
      const response = await api.get('/me/');
      const { first_name, last_name, email } = response.data;
      set({ user: { first_name, last_name, email } });
    } catch (error) {
      set({ error: error.message });
    }
  }
}));

export default useAuthStore;
