// API Configuration and Utilities
const API_BASE_URL = 'http://localhost:3000';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add token to requests
api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Auth API calls
const authAPI = {
    register: (email, password) => api.post('/api/auth/register', { email, password }),
    login: (email, password) => api.post('/api/auth/login', { email, password }),
    getMe: () => api.get('/api/auth/me'),
};

// Chat API calls
const chatAPI = {
    sendMessage: (message) => api.post('/api/chat', { message }),
};

// Token management
const tokenUtils = {
    setToken: (token) => localStorage.setItem('token', token),
    getToken: () => localStorage.getItem('token'),
    removeToken: () => localStorage.removeItem('token'),
    isAuthenticated: () => !!localStorage.getItem('token'),
};
