/**
 * useAuth Hook
 * Custom hook for accessing authentication context
 */

import { useContext } from 'react';
import { AuthContext, type AuthContextValue } from './AuthContext.js';

/**
 * Custom hook to access authentication context
 * Must be used within AuthProvider
 *
 * @returns AuthContextValue
 * @throws Error if used outside AuthProvider
 */
export function useAuth(): AuthContextValue {
  const context = useContext(AuthContext);

  if (!context.authClient) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
