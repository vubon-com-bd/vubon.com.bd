/**
 * Auth Provider - Authentication provider component
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-auth/shared-auth/src/react/AuthProvider
 * 
 * RULES:
 * ✅ ONLY auth provider logic - NO business logic
 * ✅ NO UI layout rendering, page rendering, routing structure
 * ✅ Pure authentication provider component
 * ✅ TypeScript strict
 */

import React from 'react';
import { AuthContext, type AuthContextValue, type RegisterFormData, type LoginCredentials, type PhoneLoginCredentials, type OtpLoginCredentials } from './AuthContext';
import type { AuthClient } from '../client/auth.client';

// ==================== Types ====================

export interface AuthProviderProps {
  children: React.ReactNode;
  authClient: AuthClient;
  loadingComponent?: React.ReactNode;
  onLoginSuccess?: (user: AuthContextValue['user']) => void;
  onLoginError?: (error: Error) => void;
  onRegisterSuccess?: () => void;
  onRegisterError?: (error: Error) => void;
  onLogout?: () => void;
  onError?: (error: Error) => void;
  onSessionExpired?: () => void;
}

// ==================== Provider ====================

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  authClient,
  loadingComponent,
  onLoginSuccess,
  onLoginError,
  onRegisterSuccess,
  onRegisterError,
  onLogout,
  onError,
  onSessionExpired,
}) => {
  const [state, setState] = React.useState(() => authClient.getState());
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  // Subscribe to auth client changes
  React.useEffect(() => {
    const unsubscribe = authClient.subscribe((newState) => {
      setState(newState);
    });
    
    // Initialize auth client
    authClient.initialize()
      .catch((error) => {
        console.error('Auth initialization error:', error);
        onError?.(error);
      })
      .finally(() => {
        setIsInitialized(true);
      });
    
    return unsubscribe;
  }, [authClient, onError]);

  // Set up session expiry callback
  React.useEffect(() => {
    if (onSessionExpired) {
      // This would be triggered by the auth client when session expires
      // Implementation depends on auth client event system
    }
  }, [onSessionExpired]);

  // Email login handler
  const login = React.useCallback(
    async (credentials: LoginCredentials) => {
      setIsLoggingIn(true);
      try {
        await authClient.login(credentials);
        onLoginSuccess?.(authClient.getCurrentUser());
      } catch (error) {
        const err = error as Error;
        onLoginError?.(err);
        onError?.(err);
        throw error;
      } finally {
        setIsLoggingIn(false);
      }
    },
    [authClient, onLoginSuccess, onLoginError, onError]
  );

  // Phone login handler (Bangladesh specific)
  const phoneLogin = React.useCallback(
    async (credentials: PhoneLoginCredentials) => {
      setIsLoggingIn(true);
      try {
        await authClient.phoneLogin(credentials.phoneNumber, credentials.password, credentials.rememberMe, credentials.deviceId);
        onLoginSuccess?.(authClient.getCurrentUser());
      } catch (error) {
        const err = error as Error;
        onLoginError?.(err);
        onError?.(err);
        throw error;
      } finally {
        setIsLoggingIn(false);
      }
    },
    [authClient, onLoginSuccess, onLoginError, onError]
  );

  // OTP login handler (Bangladesh specific)
  const otpLogin = React.useCallback(
    async (credentials: OtpLoginCredentials) => {
      setIsLoggingIn(true);
      try {
        await authClient.otpLogin(credentials.phoneNumber, credentials.otpCode, credentials.rememberMe, credentials.deviceId);
        onLoginSuccess?.(authClient.getCurrentUser());
      } catch (error) {
        const err = error as Error;
        onLoginError?.(err);
        onError?.(err);
        throw error;
      } finally {
        setIsLoggingIn(false);
      }
    },
    [authClient, onLoginSuccess, onLoginError, onError]
  );

  // Register handler
  const register = React.useCallback(
    async (data: RegisterFormData) => {
      setIsRegistering(true);
      try {
        await authClient.register(data);
        onRegisterSuccess?.();
      } catch (error) {
        const err = error as Error;
        onRegisterError?.(err);
        onError?.(err);
        throw error;
      } finally {
        setIsRegistering(false);
      }
    },
    [authClient, onRegisterSuccess, onRegisterError, onError]
  );

  // Logout handler
  const logout = React.useCallback(
    async (allDevices?: boolean) => {
      setIsLoggingOut(true);
      try {
        await authClient.logout(allDevices);
        onLogout?.();
      } catch (error) {
        const err = error as Error;
        onError?.(err);
      } finally {
        setIsLoggingOut(false);
      }
    },
    [authClient, onLogout, onError]
  );

  // Refresh session
  const refreshSession = React.useCallback(async () => {
    return authClient.refreshSession();
  }, [authClient]);

  // MFA verification
  const verifyMfa = React.useCallback(
    async (code: string, methodId?: string, trustDevice?: boolean) => {
      try {
        await authClient.verifyMfa(code, methodId, trustDevice);
        onLoginSuccess?.(authClient.getCurrentUser());
      } catch (error) {
        const err = error as Error;
        onError?.(err);
        throw error;
      }
    },
    [authClient, onLoginSuccess, onError]
  );

  // Role check (UX optimization only - NOT security boundary)
  const hasRole = React.useCallback(
    (role: string | string[]): boolean => {
      const userRole = state.user?.role;
      if (!userRole) return false;
      
      const roles = Array.isArray(role) ? role : [role];
      return roles.includes(userRole);
    },
    [state.user?.role]
  );

  // Check if user has any of the specified roles
  const hasAnyRole = React.useCallback(
    (roles: string[]): boolean => {
      const userRole = state.user?.role;
      if (!userRole) return false;
      return roles.includes(userRole);
    },
    [state.user?.role]
  );

  // Check if user has all specified roles
  const hasAllRoles = React.useCallback(
    (roles: string[]): boolean => {
      const userRole = state.user?.role;
      if (!userRole) return false;
      return roles.every((role) => role === userRole);
    },
    [state.user?.role]
  );

  // Permission check (UX optimization only - NOT security boundary)
  const hasPermission = React.useCallback(
    (permission: string): boolean => {
      const userRole = state.user?.role;
      if (!userRole) return false;
      
      // Super admin has all permissions
      if (userRole === 'super_admin') return true;
      
      // Admin has most permissions
      if (userRole === 'admin') {
        const adminPermissions = ['user:read', 'user:list', 'user:update', 'role:read', 'permission:read'];
        return adminPermissions.includes(permission);
      }
      
      // Seller permissions
      if (userRole === 'seller') {
        const sellerPermissions = ['product:create', 'product:read', 'product:update', 'product:delete', 'order:read', 'order:update', 'inventory:read', 'inventory:update'];
        return sellerPermissions.includes(permission);
      }
      
      // Customer permissions
      if (userRole === 'customer') {
        const customerPermissions = ['product:read', 'order:create', 'order:read', 'review:create'];
        return customerPermissions.includes(permission);
      }
      
      return false;
    },
    [state.user?.role]
  );

  // Check if user has any of the specified permissions
  const hasAnyPermission = React.useCallback(
    (permissions: string[]): boolean => {
      return permissions.some((p) => hasPermission(p));
    },
    [hasPermission]
  );

  // Compute derived values
  const displayName = state.user 
    ? state.user.displayName || `${state.user.firstName} ${state.user.lastName}` 
    : '';
  const userTier = state.user?.userTier || 'bronze';
  const isVerified = state.user?.emailVerified || false;

  const value: AuthContextValue = {
    ...state,
    isLoading: state.isLoading || !isInitialized,
    isLoggingIn,
    isRegistering,
    isLoggingOut,
    isMfaRequired: state.requiresMfa,
    login,
    phoneLogin,
    otpLogin,
    register,
    logout,
    refreshSession,
    verifyMfa,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    hasPermission,
    hasAnyPermission,
    displayName,
    userTier,
    isVerified,
  };

  // Show loading state while initializing
  if (!isInitialized && state.isLoading) {
    return loadingComponent ? <>{loadingComponent}</> : null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
