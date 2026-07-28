/**
 * Axios Interceptors
 * Handles request/response interception for auth tokens and errors
 */

import { AxiosInstance, AxiosError, InternalAxiosRequestConfig } from 'axios';

/**
 * Request interceptor to add auth token
 * @param client - Axios instance
 * @param getToken - Function to retrieve token
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
 * @param client - Axios instance
 * @param onUnauthorized - Callback for 401 errors
 * @param onError - Callback for other errors
 */
export function setupErrorInterceptor(
  client: AxiosInstance,
  onUnauthorized?: () => void,
  onError?: (error: AxiosError) => void,
): void {
  client.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      // Handle 401 Unauthorized
      if (error.response?.status === 401) {
        if (onUnauthorized) {
          onUnauthorized();
        }
        return Promise.reject(error);
      }

      // Handle 403 Forbidden
      if (error.response?.status === 403) {
        // Could trigger permission error handling
        console.error('Forbidden access:', error.response.data);
        return Promise.reject(error);
      }

      // Handle 500 Server Error
      if (error.response?.status && error.response.status >= 500) {
        console.error('Server error:', error.response.data);
        // Could trigger error reporting service
        return Promise.reject(error);
      }

      // Handle network errors
      if (!error.response) {
        console.error('Network error - please check your connection');
        return Promise.reject(error);
      }

      // Handle other errors
      if (onError) {
        onError(error);
      }

      return Promise.reject(error);
    },
  );
}

/**
 * Response interceptor for data extraction
 * Extracts data from response for cleaner API usage
 */
export function setupDataExtractionInterceptor(client: AxiosInstance): void {
  client.interceptors.response.use(
    (response) => response.data,
    (error) => {
      // Error response interceptor will handle this
      return Promise.reject(error);
    },
  );
}

/**
 * Logging interceptor for debugging
 * @param client - Axios instance
 * @param enabled - Enable/disable logging
 */
export function setupLoggingInterceptor(
  client: AxiosInstance,
  enabled: boolean = process.env.NODE_ENV === 'development',
): void {
  if (!enabled) return;

  client.interceptors.request.use(
    (config) => {
      console.log(`🚀 ${config.method?.toUpperCase()} ${config.url}`);
      if (config.data) {
        console.log('📦 Request data:', config.data);
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
      console.log(`✅ ${response.status} ${response.config.url}`);
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
 * @param client - Axios instance
 * @param getToken - Function to retrieve token
 * @param options - Optional callbacks
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
  // Setup auth interceptor
  setupAuthInterceptor(client, getToken);

  // Setup error interceptor
  setupErrorInterceptor(client, options?.onUnauthorized, options?.onError);

  // Setup data extraction
  if (options?.extractData !== false) {
    setupDataExtractionInterceptor(client);
  }

  // Setup logging
  if (options?.enableLogging) {
    setupLoggingInterceptor(client, options.enableLogging);
  }
}
