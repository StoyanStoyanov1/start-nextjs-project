import { IAuthRepository } from '@/types/interfaces/IAuthRepository';
import { IHttpClient } from '@/types/interfaces/IHttpClient';
import { ApiConfig } from '@/config/ApiConfig';
import { RegisterRequest, RegisterResponse } from '@/types/register';
import { 
  GoogleCallbackData, 
  AuthResponse, 
  TokenVerificationResponse,
  UserProfile
} from '@/types/auth';
import { httpClient } from '@/infrastructure/HttpClient';

/**
 * Implementation of IAuthRepository
 * Handles all authentication-related API calls
 */
export class AuthRepository implements IAuthRepository {
  private httpClient: IHttpClient;

  /**
   * Creates a new AuthRepository instance
   * @param httpClient - HTTP client for making API requests
   */
  constructor(httpClient: IHttpClient = httpClient) {
    this.httpClient = httpClient;
  }

  /**
   * Registers a new user
   * @param userData - User registration data
   * @returns Promise with registration response
   */
  async register(userData: RegisterRequest): Promise<RegisterResponse> {
    try {
      return await this.httpClient.post<RegisterResponse>(
        ApiConfig.auth.register,
        userData
      );
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
   * Logs in a user
   * @param email - User email
   * @param password - User password
   * @returns Promise with auth response containing user and token
   */
  async login(email: string, password: string): Promise<AuthResponse> {
    try {
      const response = await this.httpClient.post<AuthResponse>(
        ApiConfig.auth.login,
        { email, password }
      );
      
      // Store token
      if (response.token) {
        this.httpClient.setAuthToken(response.token);
      }
      
      return response;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Invalid email or password');
      }
      throw new Error('Login failed');
    }
  }

  /**
   * Logs out the current user
   * @returns Promise indicating success
   */
  async logout(): Promise<boolean> {
    try {
      await this.httpClient.post(ApiConfig.auth.logout);
      this.httpClient.setAuthToken(null);
      return true;
    } catch (error) {
      // Even if API call fails, remove token locally
      this.httpClient.setAuthToken(null);
      throw new Error('Logout failed');
    }
  }

  /**
   * Gets the current user's profile
   * @returns Promise with user profile data
   */
  async getProfile(): Promise<UserProfile> {
    try {
      return await this.httpClient.get<UserProfile>(ApiConfig.auth.profile);
    } catch (error) {
      throw new Error('Failed to get user profile');
    }
  }

  /**
   * Gets the Google OAuth authorization URL
   * @param scopes - OAuth scopes to request
   * @returns Promise with the authorization URL
   */
  async getGoogleAuthUrl(scopes: string[] = ['email']): Promise<{ authorization_url: string }> {
    try {
      return await this.httpClient.get<{ authorization_url: string }>(
        ApiConfig.auth.googleAuthorize,
        { scopes }
      );
    } catch (error) {
      throw new Error('Failed to get Google auth URL');
    }
  }

  /**
   * Handles the Google OAuth callback
   * @param callbackData - Data from the Google callback
   * @returns Promise with auth response containing user and token
   */
  async handleGoogleCallback(callbackData: GoogleCallbackData): Promise<AuthResponse> {
    try {
      const response = await this.httpClient.get<AuthResponse>(
        ApiConfig.auth.googleCallback,
        {
          code: callbackData.code,
          state: callbackData.state
        }
      );
      
      // Store token
      if (response.token) {
        this.httpClient.setAuthToken(response.token);
      }
      
      return response;
    } catch (error) {
      throw new Error('Google authentication failed');
    }
  }

  /**
   * Requests email verification
   * @param email - Email to verify
   * @returns Promise with success message
   */
  async requestEmailVerification(email: string): Promise<string> {
    try {
      const response = await this.httpClient.post<{ message: string }>(
        ApiConfig.auth.requestVerifyToken,
        { email }
      );
      return response.message;
    } catch (error: any) {
      // Use a more specific error message if available
      const message = error.response?.data?.detail || 'Failed to send verification email';
      throw new Error(message);
    }
  }

  /**
   * Verifies a token
   * @param token - Token to verify
   * @returns Promise with verification response
   */
  async verifyToken(token: string): Promise<TokenVerificationResponse> {
    try {
      return await this.httpClient.post<TokenVerificationResponse>(
        ApiConfig.auth.verifyToken,
        { token }
      );
    } catch (error: any) {
      // Use a more specific error message if available
      const message = error.response?.data?.detail || 'Token verification failed';
      throw new Error(message);
    }
  }
}

// Create a singleton instance for use throughout the app
export const authRepository = new AuthRepository();