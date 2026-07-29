/**
 * Root Provider
 * Wraps the entire application with required providers
 */

'use client';

import React, { ReactNode } from 'react';
import { AuthProvider } from '@vubon/auth-shared-auth';
import { AuthClient, createAuthClient } from '@vubon/auth-shared-auth';
import { apiClient } from '../lib/api-client.js';

// Create AuthClient instance with API client
const authClient = createAuthClient({
  onUnauthorized: () => {
    // Handle unauthorized access
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  },
  onError: (error) => {
    console.error('Auth error:', error);
  },
});

// Restore session on initialization
if (typeof window !== 'undefined') {
  authClient.restoreSession();
}

interface RootProviderProps {
  children: ReactNode;
}

export function RootProvider({ children }: RootProviderProps): React.ReactElement {
  return <AuthProvider authClient={authClient}>{children}</AuthProvider>;
}

// Export authClient for use in other parts of the app
export { authClient };
