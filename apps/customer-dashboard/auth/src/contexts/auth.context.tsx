'use client';

import React from 'react';
import { AuthProvider } from '@vubon/auth-shared-auth';
import { AuthClient } from '@vubon/auth-shared-auth';
import { getToken, setToken, removeToken } from '../lib/auth-token.js';

// Re-export AuthProvider with app-specific config
export { AuthProvider } from '@vubon/auth-shared-auth';
export { useAuth } from '@vubon/auth-shared-auth';

// Create app-specific AuthClient
export function createCustomerAuthClient(): AuthClient {
  return new AuthClient({
    onUnauthorized: () => {
      removeToken();
      if (typeof window !== 'undefined') {
        window.location.href = '/auth/login';
      }
    },
    onError: (error: unknown) => {
      console.error('Customer app auth error:', error);
    },
  });
}

// Default auth client instance
export const customerAuthClient = createCustomerAuthClient();

// Customer app specific auth provider wrapper
interface CustomerAuthProviderProps {
  children: React.ReactNode;
}

export function CustomerAuthProvider({ children }: CustomerAuthProviderProps): React.ReactElement {
  return <AuthProvider authClient={customerAuthClient}>{children}</AuthProvider>;
}
