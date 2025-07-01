/**
 * Interface for error handling
 * Provides centralized error handling functionality
 */
export interface IErrorHandler {
  /**
   * Handles an error and returns a user-friendly message
   * @param error - The error to handle
   * @param context - Optional context information
   * @returns User-friendly error message
   */
  handleError(error: unknown, context?: string): string;

  /**
   * Logs an error for debugging purposes
   * @param error - The error to log
   * @param context - Optional context information
   */
  logError(error: unknown, context?: string): void;

  /**
   * Gets the original error from a wrapped error
   * @param error - The wrapped error
   * @returns The original error
   */
  getOriginalError(error: unknown): Error;

  /**
   * Determines if an error is of a specific type
   * @param error - The error to check
   * @param errorType - The error type to check for
   * @returns True if the error is of the specified type
   */
  isErrorType<T extends Error>(error: unknown, errorType: new (...args: any[]) => T): error is T;

  /**
   * Creates a new error with additional context
   * @param message - The error message
   * @param originalError - The original error
   * @param context - Optional context information
   * @returns A new error with context
   */
  createError(message: string, originalError?: Error, context?: string): Error;
}

/**
 * Interface for error mapping
 * Maps error codes or types to user-friendly messages
 */
export interface IErrorMapper {
  /**
   * Maps an API error to a user-friendly message
   * @param error - The API error
   * @returns User-friendly error message
   */
  mapApiError(error: unknown): string;

  /**
   * Maps a validation error to a user-friendly message
   * @param error - The validation error
   * @param fieldName - Optional field name for context
   * @returns User-friendly error message
   */
  mapValidationError(error: unknown, fieldName?: string): string;

  /**
   * Maps an authentication error to a user-friendly message
   * @param error - The authentication error
   * @returns User-friendly error message
   */
  mapAuthError(error: unknown): string;
}