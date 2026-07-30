/**
 * Root Provider for Customer App
 * Wraps the application with all required providers
 */

'use client';

import React from 'react';
import { AuthProvider, AuthClient } from '@vubon/auth-shared-auth';
import { apiClient } from '../lib/api-client.js';

/**
 * Create Auth Client instance with configuration
 */
const authClient = new AuthClient({
  onUnauthorized: () => {
    // Redirect to login on unauthorized
    window.location.href = '/auth/login';
  },
  onError: (error: unknown) => {
    console.error('Auth error:', error);
  },
});

// Restore session if token exists
if (typeof window !== 'undefined') {
  authClient.restoreSession();
}

export interface RootProviderProps {
  children: React.ReactNode;
}

/**
 * Root Provider Component
 * Wraps the app with AuthProvider and other providers
 */
export function RootProvider({ children }: RootProviderProps): React.ReactElement {
  return <AuthProvider authClient={authClient}>{children}</AuthProvider>;
}

export default RootProvider;
