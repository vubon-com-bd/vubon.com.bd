/**
 * Axios Interceptors
 * Handles request/response interception for auth tokens and errors
 */

import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

const isDevelopment = process.env.NODE_ENV === 'development';

/**
 * Request interceptor to add auth token
 */
export function setupAuthInterceptor(client: AxiosInstance, getToken: () => string | null): void {
  client.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
}

/**
 * Response interceptor for error handling
 */
export function setupErrorInterceptor(
  client: AxiosInstance,
  onUnauthorized?: () => void,
  onError?: (error: AxiosError) => void,
): void {
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        if (onUnauthorized) {
          onUnauthorized();
        }
        return Promise.reject(error);
      }

      if (error.response?.status === 403) {
        if (isDevelopment) {
          console.warn('Forbidden access:', error.response.data);
        }
        return Promise.reject(error);
      }

      if (error.response?.status && error.response.status >= 500) {
        console.error('Server error:', error.response.data);
        return Promise.reject(error);
      }

      if (!error.response) {
        console.error('Network error - please check your connection');
        return Promise.reject(error);
      }

      if (onError) {
        onError(error);
      }

      return Promise.reject(error);
    },
  );
}

/**
 * Response interceptor for data extraction
 */
export function setupDataExtractionInterceptor(client: AxiosInstance): void {
  client.interceptors.response.use(
    (response) => response.data,
    (error) => {
      return Promise.reject(error);
    },
  );
}

/**
 * Logging interceptor for debugging
 */
export function setupLoggingInterceptor(
  client: AxiosInstance,
  enabled: boolean = isDevelopment,
): void {
  if (!enabled) return;

  client.interceptors.request.use(
    (config) => {
      console.warn(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
      if (config.data) {
        console.warn('📦 Request data:', config.data);
      }
      return config;
    },
    (error) => {
      console.error('❌ Request error:', error);
      return Promise.reject(error);
    },
  );

  client.interceptors.response.use(
    (response) => {
      console.warn(`✅ ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.error('❌ Response error:', error);
      return Promise.reject(error);
    },
  );
}

/**
 * Setup all interceptors
 */
export function setupAllInterceptors(
  client: AxiosInstance,
  getToken: () => string | null,
  options?: {
    onUnauthorized?: () => void;
    onError?: (error: AxiosError) => void;
    enableLogging?: boolean;
    extractData?: boolean;
  },
): void {
  setupAuthInterceptor(client, getToken);
  setupErrorInterceptor(client, options?.onUnauthorized, options?.onError);
  if (options?.extractData !== false) {
    setupDataExtractionInterceptor(client);
  }
  if (options?.enableLogging) {
    setupLoggingInterceptor(client, options.enableLogging);
  }
}
