/**
 * Auth Context for Customer App
 * Extends shared-auth AuthProvider with app-specific configuration
 */

'use client';

import React from 'react';
import {
  AuthProvider as SharedAuthProvider,
  type AuthProviderProps as SharedAuthProviderProps,
  useAuth,
} from '@vubon/auth-shared-auth';

/**
 * Extended AuthProvider with customer app specific configuration
 */
export function AuthProvider({
  children,
  authClient,
  ...props
}: SharedAuthProviderProps): React.ReactElement {
  // Add app-specific configuration here
  // For example: custom session restoration, analytics tracking, etc.

  return (
    <SharedAuthProvider authClient={authClient} {...props}>
      {children}
    </SharedAuthProvider>
  );
}

export type AuthProviderProps = SharedAuthProviderProps;

// Re-export useAuth hook for convenience
export { useAuth };
