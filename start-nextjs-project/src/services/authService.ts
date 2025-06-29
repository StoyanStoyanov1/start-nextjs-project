import { api } from '@/store/api';
import { RegisterRequest, RegisterResponse } from '@/types/register';

export class AuthService {
    private static readonly ENDPOINTS = {
        REGISTER: '/auth/sign-up',
        LOGIN: '/auth/sign-in',
        PROFILE: '/auth/me',
        LOGOUT: '/auth/logout'
    } as const;

    /**
     * Registers a new user
     * @param userData user registration data
     * @returns registered user data
     */
    static async register(userData: RegisterRequest): Promise<RegisterResponse> {
        try {
            const response = await api.post<RegisterResponse>(
                this.ENDPOINTS.REGISTER,
                userData
            );
            return response.data;
        } catch (error: any) {
            if (error.response?.status === 400) {
                throw new Error(error.response.data.detail || 'REGISTER_USER_ALREADY_EXISTS');
            }
            if (error.response?.status === 422) {
                throw new Error('Validation error occurred');
            }
            throw new Error('Registration failed');
        }
    }
}
