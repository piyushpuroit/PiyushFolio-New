import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_BASE_URL;

const apiClient = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor: Attach JWT Token if available
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('admin_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle global errors
apiClient.interceptors.response.use(
  (response) => {
    // If the API returns our standard response envelope, extract data
    if (response.data && response.data.success !== undefined) {
      return response.data.data;
    }
    return response.data;
  },
  (error) => {
    // Check for 401 Unauthorized (invalid/expired token)
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('admin_token');
      // If we are in the admin dashboard, we might want to trigger a reload or redirect
      if (window.location.pathname.startsWith('/admin')) {
        window.location.href = '/admin';
      }
    }
    const message = error.response?.data?.message || error.message || 'API request failed';
    const apiError = new Error(message);
    apiError.status = error.response?.status;
    apiError.data = error.response?.data;
    return Promise.reject(apiError);
  }
);

export default apiClient;
