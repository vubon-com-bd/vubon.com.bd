/**
 * Auth Provider - Authentication provider component
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/src/react/AuthProvider
 *
 * RULES:
 * ✅ ONLY auth provider logic - NO business logic
 * ✅ NO UI layout rendering, page rendering, routing structure
 * ✅ Pure authentication provider component
 * ✅ TypeScript strict
 */

import React from 'react';
import { AuthContext, type AuthContextValue, type RegisterFormData, type LoginCredentials, type PhoneLoginCredentials, type OtpLoginCredentials } from './AuthContext';
import type { AuthClient, MFAProvider } from '../client/auth.client';

// ==================== Types ====================

export interface AuthProviderProps {
  children: React.ReactNode;
  authClient: AuthClient;
  /** Loading component to show while initializing (renamed from loadingComponent for consistency with AuthContext) */
  loadingFallback?: React.ReactNode;
  onLoginSuccess?: (user: AuthContextValue['user']) => void;
  onLoginError?: (error: Error) => void;
  onRegisterSuccess?: () => void;
  onRegisterError?: (error: Error) => void;
  onLogout?: () => void;
  onError?: (error: Error) => void;
  onSessionExpired?: () => void;
  onMfaRequired?: () => void;
  onAccountLocked?: (remainingTimeSeconds: number) => void;
}

// ==================== Provider ====================

export const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
  authClient,
  loadingFallback,
  onLoginSuccess,
  onLoginError,
  onRegisterSuccess,
  onRegisterError,
  onLogout,
  onError,
  onSessionExpired,
  onMfaRequired,
  onAccountLocked,
}) => {
  const [state, setState] = React.useState(() => authClient.getState());
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  // Track previous lock status for callbacks
  const prevLockedRef = React.useRef(false);

  // Subscribe to auth client changes
  React.useEffect(() => {
    const unsubscribe = authClient.subscribe((newState) => {
      // Check for account lock status change
      if (prevLockedRef.current !== newState.accountLocked && newState.accountLocked) {
        onAccountLocked?.(newState.remainingLockTimeSeconds || 0);
      }
      prevLockedRef.current = newState.accountLocked;
      setState(newState);
    });

    // Initialize auth client
    authClient.initialize()
      .catch((error) => {
        // Use a more sophisticated logger in production
        if (process.env.NODE_ENV === 'development') {
          console.error('Auth initialization error:', error);
        }
        onError?.(error);
      })
      .finally(() => {
        setIsInitialized(true);
      });

    return unsubscribe;
  }, [authClient, onError, onAccountLocked]);

  // Check MFA requirement after login attempts
  React.useEffect(() => {
    if (state.requiresMfa && isInitialized) {
      onMfaRequired?.();
    }
  }, [state.requiresMfa, isInitialized, onMfaRequired]);

  // Check session expiry periodically
  React.useEffect(() => {
    if (!onSessionExpired) return;

    const checkInterval = setInterval(() => {
      if (state.isAuthenticated && authClient.isAuthenticated && !authClient.isAuthenticated()) {
        onSessionExpired();
      }
    }, 60000); // Check every minute

    return () => clearInterval(checkInterval);
  }, [state.isAuthenticated, authClient, onSessionExpired]);

  // --- Authentication Methods ---
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

  const phoneLogin = React.useCallback(
    async (credentials: PhoneLoginCredentials) => {
      setIsLoggingIn(true);
      try {
        await authClient.phoneLogin(
          credentials.phoneNumber,
          credentials.password,
          credentials.rememberMe,
          credentials.deviceId,
          credentials.mobileOperator
        );
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

  const refreshSession = React.useCallback(async () => {
    return authClient.refreshSession();
  }, [authClient]);

  // --- MFA Methods ---
  const verifyMfa = React.useCallback(
    async (code: string, methodId?: string, trustDevice?: boolean, challengeId?: string) => {
      try {
        await authClient.verifyMfa(code, methodId, trustDevice, challengeId);
        onLoginSuccess?.(authClient.getCurrentUser());
      } catch (error) {
        const err = error as Error;
        onError?.(err);
        throw error;
      }
    },
    [authClient, onLoginSuccess, onError]
  );

  const setupMfa = React.useCallback(
    async (provider: MFAProvider, identifier?: string, label?: string) => {
      return authClient.setupMFA(provider, identifier, label);
    },
    [authClient]
  );

  const getMfaMethods = React.useCallback(async () => {
    return authClient.getMFAMethods();
  }, [authClient]);

  // --- Account Lock Methods ---
  const unlockAccount = React.useCallback(
    async (data: { email?: string; phoneNumber?: string; backupCode?: string; verificationCode?: string; otpCode?: string }) => {
      return authClient.unlockAccount(data);
    },
    [authClient]
  );

  const isAccountLocked = React.useCallback(() => {
    return authClient.isAccountLocked();
  }, [authClient]);

  const getRemainingLockTime = React.useCallback(() => {
    return authClient.getRemainingLockTime();
  }, [authClient]);

  // --- Role & Permission Helpers (UI only) ---
  const userRole = state.user?.role;
  const userPermissions = state.user?.permissions;

  const hasRole = React.useCallback(
    (role: string | string[]): boolean => {
      if (!userRole) return false;
      const rolesToCheck = Array.isArray(role) ? role : [role];
      return rolesToCheck.includes(userRole);
    },
    [userRole]
  );

  const hasAnyRole = React.useCallback(
    (roles: string[]): boolean => {
      if (!userRole) return false;
      return roles.includes(userRole);
    },
    [userRole]
  );

  const hasAllRoles = React.useCallback(
    (roles: string[]): boolean => {
      // Note: This assumes a user can have only one role. If a user can have multiple roles, this logic needs to be updated.
      if (!userRole) return false;
      return roles.every((role) => role === userRole);
    },
    [userRole]
  );

  const hasPermission = React.useCallback(
    (permission: string): boolean => {
      // Check for explicit permissions from token first
      if (userPermissions?.includes(permission)) {
        return true;
      }

      if (!userRole) return false;

      // Role-based permission mapping (UX optimization only)
      switch (userRole) {
        case 'super_admin':
          return true;
        case 'admin':
          return ['user:read', 'user:list', 'user:update', 'role:read', 'permission:read'].includes(permission);
        case 'seller':
          return ['product:create', 'product:read', 'product:update', 'product:delete', 'order:read', 'order:update', 'inventory:read', 'inventory:update'].includes(permission);
        case 'vendor':
          return ['product:create', 'product:read', 'product:update', 'product:delete', 'order:read', 'inventory:read'].includes(permission);
        case 'delivery_agent':
          return ['order:read', 'order:update', 'delivery:update'].includes(permission);
        case 'customer':
          return ['product:read', 'order:create', 'order:read', 'review:create'].includes(permission);
        default:
          return false;
      }
    },
    [userRole, userPermissions]
  );

  const hasAnyPermission = React.useCallback(
    (permissions: string[]): boolean => {
      return permissions.some((p) => hasPermission(p));
    },
    [hasPermission]
  );

  const hasAllPermissions = React.useCallback(
    (permissions: string[]): boolean => {
      return permissions.every((p) => hasPermission(p));
    },
    [hasPermission]
  );

  // --- Derived Values ---
  const displayName = state.user?.displayName || `${state.user?.firstName || ''} ${state.user?.lastName || ''}`.trim() || '';
  const userTier = state.user?.userTier || 'bronze';
  const isVerified = !!(state.user?.emailVerified || state.user?.phoneVerified);
  const isMfaRequired = state.requiresMfa;
  const isAccountLockedState = state.accountLocked;
  const remainingLockTime = state.remainingLockTimeSeconds;

  // --- Context Value ---
  const value: AuthContextValue = {
    ...state,
    isLoading: state.isLoading || !isInitialized,
    isLoggingIn,
    isRegistering,
    isLoggingOut,
    isMfaRequired,
    isAccountLocked: isAccountLockedState,
    remainingLockTime,
    login,
    phoneLogin,
    otpLogin,
    register,
    logout,
    refreshSession,
    verifyMfa,
    setupMfa,
    getMfaMethods,
    unlockAccount,
    getRemainingLockTime,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    displayName,
    userTier,
    isVerified,
  };

  // Show loading state while initializing
  if (!isInitialized && state.isLoading) {
    return loadingFallback ? <>{loadingFallback}</> : null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
