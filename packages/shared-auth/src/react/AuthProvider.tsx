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
  /** Loading component to show while initializing */
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
  /** Callback when session is about to expire (e.g., 5 minutes before expiry) */
  onSessionExpiring?: (remainingSeconds: number) => void;
  /** Session check interval in milliseconds (default: 60000 - 1 minute) */
  sessionCheckIntervalMs?: number;
  /** Session expiry warning threshold in seconds (default: 300 - 5 minutes) */
  sessionExpiryWarningThresholdSeconds?: number;
}

// ==================== Constants ====================

const DEFAULT_SESSION_CHECK_INTERVAL_MS = 60000; // 1 minute
const DEFAULT_SESSION_EXPIRY_WARNING_THRESHOLD_SECONDS = 300; // 5 minutes

// ==================== Utility Functions ====================

/**
 * Format display name from user data
 * Pure function - no side effects
 */
const formatDisplayName = (user: AuthContextValue['user']): string => {
  if (user?.displayName) return user.displayName;
  if (user?.firstName && user?.lastName) return `${user.firstName} ${user.lastName}`.trim();
  if (user?.firstName) return user.firstName;
  if (user?.lastName) return user.lastName;
  if (user?.email) return user.email;
  return '';
};

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
  onSessionExpiring,
  sessionCheckIntervalMs = DEFAULT_SESSION_CHECK_INTERVAL_MS,
  sessionExpiryWarningThresholdSeconds = DEFAULT_SESSION_EXPIRY_WARNING_THRESHOLD_SECONDS,
}) => {
  const [state, setState] = React.useState(() => authClient.getState());
  const [isInitialized, setIsInitialized] = React.useState(false);
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);

  // Track previous lock status for callbacks
  const prevLockedRef = React.useRef(false);
  const prevRequiresMfaRef = React.useRef(false);
  const sessionCheckIntervalRef = React.useRef<NodeJS.Timeout | null>(null);

  // Subscribe to auth client changes
  React.useEffect(() => {
    const unsubscribe = authClient.subscribe((newState) => {
      // Check for account lock status change
      if (prevLockedRef.current !== newState.accountLocked && newState.accountLocked) {
        onAccountLocked?.(newState.remainingLockTimeSeconds || 0);
      }
      prevLockedRef.current = newState.accountLocked;
      
      // Check for MFA requirement change
      if (prevRequiresMfaRef.current !== newState.requiresMfa && newState.requiresMfa) {
        onMfaRequired?.();
      }
      prevRequiresMfaRef.current = newState.requiresMfa;
      
      setState(newState);
    });

    // Initialize auth client
    authClient.initialize()
      .catch((error) => {
        if (process.env.NODE_ENV === 'development') {
          console.error('Auth initialization error:', error);
        }
        onError?.(error);
      })
      .finally(() => {
        setIsInitialized(true);
      });

    return unsubscribe;
  }, [authClient, onError, onAccountLocked, onMfaRequired]);

  // Check MFA requirement after login attempts
  React.useEffect(() => {
    if (state.requiresMfa && isInitialized && !prevRequiresMfaRef.current) {
      onMfaRequired?.();
    }
  }, [state.requiresMfa, isInitialized, onMfaRequired]);

  // Check session expiry and expiring warning periodically
  React.useEffect(() => {
    if (!onSessionExpired && !onSessionExpiring) return;

    const checkSession = () => {
      if (!state.isAuthenticated) return;
      
      const remainingSeconds = authClient.getSessionRemainingTime?.() ?? 0;
      
      // Check if session is expired
      if (remainingSeconds <= 0 && authClient.isAuthenticated && !authClient.isAuthenticated()) {
        onSessionExpired?.();
        return;
      }
      
      // Check if session is about to expire (warning)
      if (onSessionExpiring && remainingSeconds > 0 && remainingSeconds <= sessionExpiryWarningThresholdSeconds) {
        onSessionExpiring(remainingSeconds);
      }
    };

    sessionCheckIntervalRef.current = setInterval(checkSession, sessionCheckIntervalMs);
    
    // Initial check
    checkSession();

    return () => {
      if (sessionCheckIntervalRef.current) {
        clearInterval(sessionCheckIntervalRef.current);
        sessionCheckIntervalRef.current = null;
      }
    };
  }, [state.isAuthenticated, authClient, onSessionExpired, onSessionExpiring, sessionCheckIntervalMs, sessionExpiryWarningThresholdSeconds]);

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

  // --- Role & Permission Helpers (UI only) - With Multi-role support ---
  const userRoles = React.useMemo(() => {
    const role = state.user?.role;
    // Support both single role (string) and multiple roles (array)
    if (Array.isArray(role)) return role;
    if (role) return [role];
    return [];
  }, [state.user?.role]);
  
  const userPermissions = React.useMemo(() => {
    return state.user?.permissions ?? [];
  }, [state.user?.permissions]);

  const hasRole = React.useCallback(
    (role: string | string[]): boolean => {
      if (userRoles.length === 0) return false;
      const rolesToCheck = Array.isArray(role) ? role : [role];
      return rolesToCheck.some(r => userRoles.includes(r));
    },
    [userRoles]
  );

  const hasAnyRole = React.useCallback(
    (roles: string[]): boolean => {
      if (userRoles.length === 0) return false;
      return roles.some(r => userRoles.includes(r));
    },
    [userRoles]
  );

  const hasAllRoles = React.useCallback(
    (roles: string[]): boolean => {
      if (userRoles.length === 0) return false;
      return roles.every(r => userRoles.includes(r));
    },
    [userRoles]
  );

  // Check if permission matches wildcard pattern (e.g., 'product:*' matches 'product:create')
  const matchesWildcard = (permissionPattern: string, actualPermission: string): boolean => {
    if (!permissionPattern.endsWith(':*')) return false;
    const resource = permissionPattern.slice(0, -2);
    return actualPermission.startsWith(`${resource}:`);
  };

  const hasPermission = React.useCallback(
    (permission: string | string[]): boolean => {
      const permissionsToCheck = Array.isArray(permission) ? permission : [permission];
      
      // Check explicit permissions from token (including wildcards)
      for (const required of permissionsToCheck) {
        let hasMatch = false;
        
        for (const userPerm of userPermissions) {
          // Direct match
          if (userPerm === required) {
            hasMatch = true;
            break;
          }
          // Wildcard match (user has 'product:*', required is 'product:create')
          if (matchesWildcard(userPerm, required)) {
            hasMatch = true;
            break;
          }
          // Required is wildcard, user has any matching permission
          if (matchesWildcard(required, userPerm)) {
            hasMatch = true;
            break;
          }
        }
        
        if (!hasMatch) return false;
      }
      
      return true;
    },
    [userPermissions]
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
  const displayName = formatDisplayName(state.user);
  const userTier = state.user?.userTier || 'bronze';
  const isEmailVerified = state.user?.emailVerified ?? false;
  const isPhoneVerified = state.user?.phoneVerified ?? false;
  const isVerified = isEmailVerified && isPhoneVerified;
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
    // Role & Permission helpers
    hasRole,
    hasAnyRole,
    hasAllRoles,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    // User info
    displayName,
    userTier,
    isVerified,
    isEmailVerified,
    isPhoneVerified,
  };

  // Show loading state while initializing
  if (!isInitialized && state.isLoading) {
    return loadingFallback ? <>{loadingFallback}</> : null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
