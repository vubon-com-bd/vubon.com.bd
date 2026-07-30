/**
 * Auth Provider
 * Provides authentication state and functions to children
 */

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { AuthContext, type AuthContextValue } from './AuthContext.js';
import { AuthClient, createAuthClient } from '../client/auth.client.js';
import type { User } from '@vubon/auth-shared-types';

export interface AuthProviderProps {
  children: React.ReactNode;
  authClient?: AuthClient;
  onUnauthorized?: () => void;
  onError?: (error: unknown) => void;
}

export function AuthProvider({
  children,
  authClient: externalClient,
  onUnauthorized,
  onError,
}: AuthProviderProps): React.ReactElement {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const authClient = useMemo(() => {
    if (externalClient) {
      return externalClient;
    }
    return createAuthClient({
      onUnauthorized: () => {
        setUser(null);
        onUnauthorized?.();
      },
      onError: (err) => {
        setError(err instanceof Error ? err : new Error(String(err)));
        onError?.(err);
      },
    });
  }, [externalClient, onUnauthorized, onError]);

  useEffect(() => {
    const restoreSession = async () => {
      setLoading(true);
      try {
        if (authClient.restoreSession()) {
          try {
            const userData = await authClient.getProfile();
            setUser(userData);
          } catch {
            authClient.clearSession();
          }
        }
      } catch {
        // Failed to restore session
      } finally {
        setLoading(false);
      }
    };

    void restoreSession();
  }, [authClient]);

  const register = useCallback(
    async (data: {
      email: string;
      password: string;
      firstName: string;
      lastName: string;
      phone?: string | null;
    }) => {
      setError(null);
      setLoading(true);
      try {
        const session = await authClient.register(data);
        setUser(session.user);
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        throw errorObj;
      } finally {
        setLoading(false);
      }
    },
    [authClient],
  );

  const login = useCallback(
    async (data: { email: string; password: string }) => {
      setError(null);
      setLoading(true);
      try {
        const session = await authClient.login(data);
        setUser(session.user);
      } catch (err) {
        const errorObj = err instanceof Error ? err : new Error(String(err));
        setError(errorObj);
        throw errorObj;
      } finally {
        setLoading(false);
      }
    },
    [authClient],
  );

  const logout = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      await authClient.logout();
      setUser(null);
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      throw errorObj;
    } finally {
      setLoading(false);
    }
  }, [authClient]);

  const refresh = useCallback(async () => {
    setError(null);
    try {
      const token = await authClient.refresh();
      return token;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      throw errorObj;
    }
  }, [authClient]);

  const getProfile = useCallback(async () => {
    setError(null);
    try {
      const userData = await authClient.getProfile();
      setUser(userData);
      return userData;
    } catch (err) {
      const errorObj = err instanceof Error ? err : new Error(String(err));
      setError(errorObj);
      throw errorObj;
    }
  }, [authClient]);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const contextValue: AuthContextValue = useMemo(
    () => ({
      user,
      isAuthenticated: !!user && !!authClient.token,
      loading,
      error,
      authClient,
      register,
      login,
      logout,
      refresh,
      getProfile,
      clearError,
    }),
    [user, loading, error, authClient, register, login, logout, refresh, getProfile, clearError],
  );

  return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
}
