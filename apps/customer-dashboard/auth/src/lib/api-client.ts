/**
 * API Client for Customer App
 * Configures shared API client with app-specific settings
 */

import { createApiClient, setupAllInterceptors } from '@vubon/auth-shared-api';
import { getToken, setToken, removeToken } from './auth-token.js';

// Create base API client with environment URL
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api/v1';

export const apiClient = createApiClient(API_BASE_URL, {
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Setup interceptors with token management
setupAllInterceptors(apiClient, getToken, {
  onUnauthorized: () => {
    // Clear token and redirect to login
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  },
  onError: (error) => {
    console.error('API Error:', error);
  },
  enableLogging: process.env.NODE_ENV === 'development',
  extractData: true,
});

// Export convenience methods
export { apiClient as default };
