import { AxiosError } from 'axios';

/**
 * Maps API errors for token verification to user-friendly messages
 */
export class TokenVerificationErrorMapper {
  /**
   * Maps API errors to user-friendly messages
   * @param error The error from the API
   * @returns A user-friendly error message
   */
  static mapApiError(error: AxiosError): string {
    if (error.response?.status === 400) {
      const detail = error.response.data?.detail;
      switch (detail) {
        case 'VERIFY_USER_BAD_TOKEN':
          return 'Invalid or expired verification token. Please request a new one.';
        case 'VERIFY_USER_ALREADY_VERIFIED':
          return 'This email address is already verified. You can sign in now.';
        default:
          return 'Verification failed. Please check your token and try again.';
      }
    }
    
    if (error.response?.status === 422) {
      return this.mapValidationError(error.response.data);
    }
    
    return 'An unexpected error occurred during verification. Please try again.';
  }

  /**
   * Maps validation errors to user-friendly messages
   * @param data The validation error data
   * @returns A user-friendly error message
   */
  private static mapValidationError(data: any): string {
    if (Array.isArray(data.detail)) {
      return data.detail.map((err: any) => err.msg).join(', ');
    }
    return 'Invalid token format';
  }
}