/**
 * API Client for Customer App
 * Configures shared-api client with app-specific settings
 */

import { createApiClient, setupAllInterceptors } from '@vubon/auth-shared-api';
import { getToken } from './auth-token.js';

/**
 * Create and configure the API client for customer app
 * Uses environment variable for base URL
 */
export const apiClient = createApiClient(
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1',
);

/**
 * Setup interceptors with token management
 */
setupAllInterceptors(apiClient, getToken, {
  onUnauthorized: () => {
    // Handle unauthorized access - redirect to login
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  },
  onError: (error: unknown) => {
    console.error('API Error:', error);
  },
  enableLogging: process.env.NODE_ENV === 'development',
  extractData: true,
});

export default apiClient;
