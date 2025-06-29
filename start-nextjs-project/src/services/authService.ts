import { api } from '@/store/api';
import { RegisterRequest, RegisterResponse } from '@/types/register';
import { 
    EmailVerificationRequest, 
    EmailVerificationResponse, 
    IEmailVerificationService,
    TokenVerificationResponse,
    ITokenVerification
} from '@/types/auth';
import { EmailVerificationErrorMapper } from '@/utils/emailVerificationErrorMapper';
import { TokenVerificationErrorMapper } from '@/utils/tokenVerificationErrorMapper';

export class AuthService implements IEmailVerificationService, ITokenVerification {
    private static readonly ENDPOINTS = {
        REGISTER: '/auth/sign-up',
        LOGIN: '/auth/sign-in',
        PROFILE: '/auth/me',
        LOGOUT: '/auth/logout',
        REQUEST_VERIFY_TOKEN: '/auth/request-verify-token',
        VERIFY_TOKEN: '/auth/verify'
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

    /**
     * Verifies a token to confirm user's email address
     * @param token verification token
     * @returns user data with updated verification status
     */
    static async verifyToken(token: string): Promise<TokenVerificationResponse> {
        try {
            const response = await api.post<TokenVerificationResponse>(
                this.ENDPOINTS.VERIFY_TOKEN,
                { token }
            );
            return response.data;
        } catch (error: any) {
            throw new Error(TokenVerificationErrorMapper.mapApiError(error));
        }
    }
}
