/**
 * Interface for HTTP client implementations
 * Provides a consistent API for making HTTP requests
 */
export interface IHttpClient {
  /**
   * Performs a GET request
   * @param url - The URL to request
   * @param params - Query parameters
   * @param headers - Custom headers
   * @returns Promise with the response data
   */
  get<T>(url: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T>;

  /**
   * Performs a POST request
   * @param url - The URL to request
   * @param data - The data to send
   * @param headers - Custom headers
   * @returns Promise with the response data
   */
  post<T>(url: string, data?: any, headers?: Record<string, string>): Promise<T>;

  /**
   * Performs a PUT request
   * @param url - The URL to request
   * @param data - The data to send
   * @param headers - Custom headers
   * @returns Promise with the response data
   */
  put<T>(url: string, data?: any, headers?: Record<string, string>): Promise<T>;

  /**
   * Performs a DELETE request
   * @param url - The URL to request
   * @param params - Query parameters
   * @param headers - Custom headers
   * @returns Promise with the response data
   */
  delete<T>(url: string, params?: Record<string, any>, headers?: Record<string, string>): Promise<T>;

  /**
   * Sets the authorization token for subsequent requests
   * @param token - The token to set
   */
  setAuthToken(token: string | null): void;

  /**
   * Gets the current authorization token
   * @returns The current token or null if not set
   */
  getAuthToken(): string | null;

  /**
   * Sets a request interceptor
   * @param interceptor - Function to intercept requests
   * @returns Function to remove the interceptor
   */
  setRequestInterceptor(
    interceptor: (config: any) => any | Promise<any>
  ): () => void;

  /**
   * Sets a response interceptor
   * @param onFulfilled - Function to handle successful responses
   * @param onRejected - Function to handle errors
   * @returns Function to remove the interceptor
   */
  setResponseInterceptor(
    onFulfilled?: (response: any) => any | Promise<any>,
    onRejected?: (error: any) => any | Promise<any>
  ): () => void;
}