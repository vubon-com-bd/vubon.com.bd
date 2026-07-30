/**
 * Auth Context
 * React context for authentication state and functions
 */

import { createContext, useContext } from 'react';
import type { User } from '@vubon/auth-shared-types';
import type { AuthClient } from '../client/auth.client.js';

export interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  error: Error | null;
  authClient: AuthClient | null;
  register: (data: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    phone?: string | null;
  }) => Promise<void>;
  login: (data: { email: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<string>;
  getProfile: () => Promise<User>;
  clearError: () => void;
}

/**
 * Default context value
 */
export const defaultAuthContextValue: AuthContextValue = {
  user: null,
  isAuthenticated: false,
  loading: false,
  error: null,
  authClient: null,
  register: async () => {
    throw new Error('AuthProvider not initialized');
  },
  login: async () => {
    throw new Error('AuthProvider not initialized');
  },
  logout: async () => {
    throw new Error('AuthProvider not initialized');
  },
  refresh: async () => {
    throw new Error('AuthProvider not initialized');
  },
  getProfile: async () => {
    throw new Error('AuthProvider not initialized');
  },
  clearError: () => {
    throw new Error('AuthProvider not initialized');
  },
};

/**
 * Auth Context
 */
export const AuthContext = createContext<AuthContextValue>(defaultAuthContextValue);
AuthContext.displayName = 'AuthContext';

/**
 * Hook to use Auth Context
 * Must be used within AuthProvider
 */
export function useAuthContext(): AuthContextValue {
  const context = useContext(AuthContext);
  if (!context.authClient) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
}
