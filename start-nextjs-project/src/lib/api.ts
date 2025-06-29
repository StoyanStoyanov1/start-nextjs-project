import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

export const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor for auth tokens
api.interceptors.request.use(
    (config) => {
        // Add auth token if available
        if (typeof window !== 'undefined') {
            const token = localStorage.getItem('authToken');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Handle unauthorized access
            if (typeof window !== 'undefined') {
                localStorage.removeItem('authToken');
                window.location.href = '/login';
            }
        }
        return Promise.reject(error);
    }
);