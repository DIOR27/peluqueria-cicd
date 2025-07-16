import axios from 'axios';
import useAuthStore from './src/stores/authStore';
const { VITE_API_URL } = import.meta.env;

const api = axios.create({
  baseURL: VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para añadir token a todas las solicitudes
api.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor para manejras errores 401(token expirado);
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Si el error es 401 (Unauthorized) y no hemos intentado refrescar el token ya
    if (
      error.response?.status === 401 &&
      error.response?.data?.code === 'token_not_valid' &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        // Obtenemos el refresh token
        const refreshToken = useAuthStore.getState().refreshToken;

        if (!refreshToken) {
          // Si no hay refresh token, forzar logout
          useAuthStore.getState().logout();
          return Promise.reject(new Error('Sesión expirada. Por favor, inicie sesión nuevamente.'));
        }

        // Llamamos al endpoint de refresh token
        const response = await axios.post(`${VITE_API_URL}/token/refresh/`, {
          refresh: refreshToken
        });

        // Obtenemos el nuevo access token
        const { access } = response.data;

        //Actualizamos el token en el store de Zustand
        localStorage.setItem('accessToken', access);
        useAuthStore.setState({ accessToken: access });

        //Actualizamos el token en los headers predeterminados de la instancia api
        api.defaults.headers.common['Authorization'] = `Bearer ${access}`;

        //Actualizamos el token en la solicitud original
        originalRequest.headers['Authorization'] = `Bearer ${access}`;

        // Actualizamos el token en la solicitud original y reintentarla
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, forzar logout
        useAuthStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
