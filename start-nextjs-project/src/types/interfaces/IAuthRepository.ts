import { RegisterRequest, RegisterResponse } from '@/types/register';
import { 
  GoogleCallbackData, 
  AuthResponse, 
  TokenVerificationResponse,
  UserProfile
} from '@/types/auth';

/**
 * Interface for Auth Repository
 * Implements Repository pattern for authentication operations
 */
export interface IAuthRepository {
  /**
   * Registers a new user
   * @param userData - User registration data
   * @returns Promise with registration response
   */
  register(userData: RegisterRequest): Promise<RegisterResponse>;

  /**
   * Logs in a user
   * @param email - User email
   * @param password - User password
   * @returns Promise with auth response containing user and token
   */
  login(email: string, password: string): Promise<AuthResponse>;

  /**
   * Logs out the current user
   * @returns Promise indicating success
   */
  logout(): Promise<boolean>;

  /**
   * Gets the current user's profile
   * @returns Promise with user profile data
   */
  getProfile(): Promise<UserProfile>;

  /**
   * Gets the Google OAuth authorization URL
   * @param scopes - OAuth scopes to request
   * @returns Promise with the authorization URL
   */
  getGoogleAuthUrl(scopes?: string[]): Promise<{ authorization_url: string }>;

  /**
   * Handles the Google OAuth callback
   * @param callbackData - Data from the Google callback
   * @returns Promise with auth response containing user and token
   */
  handleGoogleCallback(callbackData: GoogleCallbackData): Promise<AuthResponse>;

  /**
   * Requests email verification
   * @param email - Email to verify
   * @returns Promise with success message
   */
  requestEmailVerification(email: string): Promise<string>;

  /**
   * Verifies a token
   * @param token - Token to verify
   * @returns Promise with verification response
   */
  verifyToken(token: string): Promise<TokenVerificationResponse>;
}