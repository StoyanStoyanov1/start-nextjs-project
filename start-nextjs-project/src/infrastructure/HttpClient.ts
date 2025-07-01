import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { IHttpClient } from '@/types/interfaces/IHttpClient';

/**
 * Implementation of IHttpClient using Axios
 */
export class HttpClient implements IHttpClient {
  private client: AxiosInstance;
  private authToken: string | null = null;

  /**
   * Creates a new HttpClient instance
   * @param baseURL - Base URL for API requests
   * @param defaultHeaders - Default headers for all requests
   */
  constructor(
    baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000',
    defaultHeaders: Record<string, string> = { 'Content-Type': 'application/json' }
  ) {
    this.client = axios.create({
      baseURL,
      headers: defaultHeaders,
      withCredentials: true,
    });

    // Setup default request interceptor for auth token
    this.setRequestInterceptor((config) => {
      if (this.authToken) {
        config.headers = config.headers || {};
        config.headers.Authorization = `Bearer ${this.authToken}`;
      }
      return config;
    });

    // Setup default response interceptor for 401 handling
    this.setResponseInterceptor(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          // Clear token and redirect to login
          this.setAuthToken(null);
          if (typeof window !== 'undefined') {
            window.location.href = '/sign-in';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  /**
   * Performs a GET request
   * @param url - The URL to request
   * @param params - Query parameters
   * @param headers - Custom headers
   * @returns Promise with the response data
   */
  async get<T>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T> {
    const config: AxiosRequestConfig = { params, headers };
    const response = await this.client.get<T>(url, config);
    return response.data;
  }

  /**
   * Performs a POST request
   * @param url - The URL to request
   * @param data - The data to send
   * @param headers - Custom headers
   * @returns Promise with the response data
   */
  async post<T>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    const config: AxiosRequestConfig = { headers };
    const response = await this.client.post<T>(url, data, config);
    return response.data;
  }

  /**
   * Performs a PUT request
   * @param url - The URL to request
   * @param data - The data to send
   * @param headers - Custom headers
   * @returns Promise with the response data
   */
  async put<T>(
    url: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<T> {
    const config: AxiosRequestConfig = { headers };
    const response = await this.client.put<T>(url, data, config);
    return response.data;
  }

  /**
   * Performs a DELETE request
   * @param url - The URL to request
   * @param params - Query parameters
   * @param headers - Custom headers
   * @returns Promise with the response data
   */
  async delete<T>(
    url: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<T> {
    const config: AxiosRequestConfig = { params, headers };
    const response = await this.client.delete<T>(url, config);
    return response.data;
  }

  /**
   * Sets the authorization token for subsequent requests
   * @param token - The token to set
   */
  setAuthToken(token: string | null): void {
    this.authToken = token;
    
    // Also store in localStorage for persistence
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('authToken', token);
      } else {
        localStorage.removeItem('authToken');
      }
    }
  }

  /**
   * Gets the current authorization token
   * @returns The current token or null if not set
   */
  getAuthToken(): string | null {
    // If not set in memory, try to get from localStorage
    if (!this.authToken && typeof window !== 'undefined') {
      this.authToken = localStorage.getItem('authToken');
    }
    return this.authToken;
  }

  /**
   * Sets a request interceptor
   * @param interceptor - Function to intercept requests
   * @returns Function to remove the interceptor
   */
  setRequestInterceptor(
    interceptor: (config: any) => any | Promise<any>
  ): () => void {
    const interceptorId = this.client.interceptors.request.use(
      interceptor,
      (error) => Promise.reject(error)
    );
    return () => this.client.interceptors.request.eject(interceptorId);
  }

  /**
   * Sets a response interceptor
   * @param onFulfilled - Function to handle successful responses
   * @param onRejected - Function to handle errors
   * @returns Function to remove the interceptor
   */
  setResponseInterceptor(
    onFulfilled?: (response: any) => any | Promise<any>,
    onRejected?: (error: any) => any | Promise<any>
  ): () => void {
    const interceptorId = this.client.interceptors.response.use(
      onFulfilled,
      onRejected
    );
    return () => this.client.interceptors.response.eject(interceptorId);
  }
}

// Create a singleton instance for use throughout the app
export const httpClient = new HttpClient();