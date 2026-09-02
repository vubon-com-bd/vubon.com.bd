import React, { useState, useEffect, useCallback } from 'react';
import { AuthContext, AuthContextType, AuthProviderProps } from './AuthContext';
import { AuthUser, AuthTokens, RegisterDataIn } from '../client/auth.client';

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  authClient,
  onLogin,
  onLogout,
  onError,
}) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [tokens, setTokens] = useState<AuthTokens | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  const handleError = useCallback(
    (err: Error) => {
      setError(err);
      if (onError) {
        onError(err);
      }
    },
    [onError]
  );

  const loadUser = useCallback(async () => {
    try {
      const currentUser = await authClient.getCurrentUser();
      if (currentUser) {
        setUser(currentUser);
        const accessToken = authClient.getAccessToken();
        if (accessToken) {
          setTokens({
            accessToken,
            refreshToken: authClient.getRefreshToken() || '',
            expiresIn: 3600,
            tokenType: 'Bearer',
          });
        }
      }
    } catch (err) {
      console.error('Failed to load user:', err);
    } finally {
      setIsLoading(false);
    }
  }, [authClient]);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const login = useCallback(
    async (email: string, password: string) => {
      setIsLoading(true);
      clearError();
      try {
        const response = await authClient.login({ email, password });
        setUser(response.user);
        setTokens(response.tokens);
        if (onLogin) {
          onLogin(response.user);
        }
      } catch (err) {
        handleError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [authClient, clearError, handleError, onLogin]
  );

  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await authClient.logout();
      setUser(null);
      setTokens(null);
      if (onLogout) {
        onLogout();
      }
    } catch (err) {
      handleError(err as Error);
    } finally {
      setIsLoading(false);
    }
  }, [authClient, handleError, onLogout]);

  const register = useCallback(
    async (data: RegisterDataIn) => {
      setIsLoading(true);
      clearError();
      try {
        const response = await authClient.register(data);
        setUser(response.user);
        setTokens(response.tokens);
        if (onLogin) {
          onLogin(response.user);
        }
      } catch (err) {
        handleError(err as Error);
        throw err;
      } finally {
        setIsLoading(false);
      }
    },
    [authClient, clearError, handleError, onLogin]
  );

  const refreshToken = useCallback(async () => {
    try {
      const newTokens = await authClient.refreshToken();
      setTokens(newTokens);
    } catch (err) {
      handleError(err as Error);
      throw err;
    }
  }, [authClient, handleError]);

  const updateUser = useCallback((updatedUser: AuthUser) => {
    setUser(updatedUser);
  }, []);

  const value: AuthContextType = {
    user,
    tokens,
    isAuthenticated: !!user && !!tokens,
    isLoading,
    error,
    login,
    logout,
    register,
    refreshToken,
    updateUser,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
