import { api } from '@/store/api';
import { RegisterRequest, RegisterResponse } from '@/types/register';
import { EmailVerificationRequest, EmailVerificationResponse, IEmailVerificationService } from '@/types/auth';
import { EmailVerificationErrorMapper } from '@/utils/emailVerificationErrorMapper';

export class AuthService implements IEmailVerificationService {
    private static readonly ENDPOINTS = {
        REGISTER: '/auth/sign-up',
        LOGIN: '/auth/sign-in',
        PROFILE: '/auth/me',
        LOGOUT: '/auth/logout',
        REQUEST_VERIFY_TOKEN: '/auth/request-verify-token'
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

    /**
     * Requests a verification token to be sent to the user's email
     * @param email user's email address
     * @returns success message
     */
    static async requestVerifyToken(email: string): Promise<string> {
        try {
            const response = await api.post<EmailVerificationResponse>(
                this.ENDPOINTS.REQUEST_VERIFY_TOKEN,
                { email }
            );
            return response.data.message;
        } catch (error: any) {
            throw new Error(EmailVerificationErrorMapper.mapApiError(error));
        }
    }
}
