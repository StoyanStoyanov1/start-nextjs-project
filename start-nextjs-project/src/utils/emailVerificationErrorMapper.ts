import { AxiosError } from 'axios';

/**
 * Maps API errors for email verification to user-friendly messages
 */
export class EmailVerificationErrorMapper {
  /**
   * Maps API errors to user-friendly messages
   * @param error The error from the API
   * @returns A user-friendly error message
   */
  static mapApiError(error: AxiosError): string {
    if (error.response?.status === 422) {
      return this.mapValidationError(error.response.data);
    }
    if (error.response?.status === 404) {
      return 'Email address not found in our system';
    }
    if (error.response?.status === 429) {
      return 'Too many requests. Please try again later';
    }
    return 'Failed to send verification email. Please try again';
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
    return 'Invalid email address format';
  }
}