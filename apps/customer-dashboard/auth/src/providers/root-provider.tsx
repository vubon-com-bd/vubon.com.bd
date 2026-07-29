'use client';

import React from 'react';
import { AuthProvider } from '@vubon/auth-shared-auth';
import { AuthClient } from '@vubon/auth-shared-auth';
import { getToken, setToken, removeToken } from '../lib/auth-token.js';

// Create AuthClient instance with custom config
const authClient = new AuthClient({
  onUnauthorized: () => {
    removeToken();
    if (typeof window !== 'undefined') {
      window.location.href = '/auth/login';
    }
  },
  onError: (error: unknown) => {
    console.error('Auth error:', error);
  },
});

// Restore session if token exists
if (typeof window !== 'undefined') {
  const token = getToken();
  if (token) {
    authClient.restoreSession();
  }
}

interface RootProviderProps {
  children: React.ReactNode;
}

export function RootProvider({ children }: RootProviderProps): React.ReactElement {
  return <AuthProvider authClient={authClient}>{children}</AuthProvider>;
}
