/**
 * Axios Client Setup
 * Configures HTTP client with base URL and default headers
 */

import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

/**
 * Create and configure Axios instance
 * @param baseURL - Base URL for API requests
 * @param config - Additional axios configuration
 * @returns Configured Axios instance
 */
export function createApiClient(
  baseURL: string = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
  config?: AxiosRequestConfig,
): AxiosInstance {
  const client = axios.create({
    baseURL,
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    withCredentials: true,
    ...config,
  });

  return client;
}

/**
 * Default API client instance
 */
export const apiClient = createApiClient();

/**
 * Create an authenticated API client with token
 * @param token - Authentication token
 * @returns Configured Axios instance with auth header
 */
export function createAuthApiClient(token: string): AxiosInstance {
  const client = createApiClient();
  client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  return client;
}

/**
 * Update API client base URL
 * @param client - Axios instance
 * @param baseURL - New base URL
 */
export function setApiBaseUrl(client: AxiosInstance, baseURL: string): void {
  client.defaults.baseURL = baseURL;
}

/**
 * Update API client default headers
 * @param client - Axios instance
 * @param headers - Headers to merge
 */
export function setApiHeaders(client: AxiosInstance, headers: Record<string, string>): void {
  Object.entries(headers).forEach(([key, value]) => {
    client.defaults.headers.common[key] = value;
  });
}
