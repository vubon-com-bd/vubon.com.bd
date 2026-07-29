/**
 * Auth Context for Customer App
 * Extends shared-auth with app-specific configurations
 */

'use client';

import React, { ReactNode } from 'react';
import { AuthProvider } from '@vubon/auth-shared-auth';
import { authClient } from '../providers/root-provider.js';

interface AuthContextProviderProps {
  children: ReactNode;
}

/**
 * App-specific Auth Provider
 * Uses shared AuthProvider with app-specific client
 */
export function AuthContextProvider({ children }: AuthContextProviderProps): React.ReactElement {
  return <AuthProvider authClient={authClient}>{children}</AuthProvider>;
}

// Re-export useAuth hook from shared-auth for convenience
export { useAuth } from '@vubon/auth-shared-auth';
