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
import { env } from '@vubon/shared-config/env';

// ==================== Constants ====================

// Session check interval (configurable via env, default: 60 seconds)
const SESSION_CHECK_INTERVAL_MS = env.SESSION_CHECK_INTERVAL_MS ? Number(env.SESSION_CHECK_INTERVAL_MS) : 60000;

// Helper: Normalize role/permission strings
const normalizeString = (value: string): string => value.toLowerCase().trim();

// Helper: Check if permission matches wildcard pattern (e.g., 'product:*')
const matchesWildcard = (permission: string, userPermission: string): boolean => {
  if (permission.endsWith(':*')) {
    const resource = permission.slice(0, -2);
    return userPermission.startsWith(`${resource}:`);
  }
  return false;
};

// Helper: Check if role matches wildcard pattern (e.g., 'admin:*')
const matchesRoleWildcard = (rolePattern: string, userRole: string): boolean => {
  if (rolePattern.endsWith(':*')) {
    const rolePrefix = rolePattern.slice(0, -2);
    return userRole.startsWith(rolePrefix);
  }
  return false;
};

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
        if (env.NODE_ENV === 'development') {
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
    }, SESSION_CHECK_INTERVAL_MS);

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

  // --- Role & Permission Helpers (UI only) - Enhanced with wildcard support and multi-role support ---
  const userRoles = React.useMemo(() => {
    const role = state.user?.role;
    // Support for multiple roles (if user has roles array, otherwise convert single role to array)
    if (state.user?.roles && Array.isArray(state.user.roles)) {
      return state.user.roles.map(normalizeString);
    }
    return role ? [normalizeString(role)] : [];
  }, [state.user?.role, state.user?.roles]);

  const userPermissions = React.useMemo(() => {
    return state.user?.permissions?.map(normalizeString) ?? [];
  }, [state.user?.permissions]);

  const hasRole = React.useCallback(
    (role: string | string[]): boolean => {
      if (userRoles.length === 0) return false;

      const rolesToCheck = Array.isArray(role) ? role : [role];
      const normalizedRoles = rolesToCheck.map(normalizeString);

      return normalizedRoles.some(requiredRole => {
        // Wildcard check (e.g., 'admin:*' matches 'admin', 'admin_super', 'admin_regular')
        if (requiredRole.endsWith(':*')) {
          const rolePrefix = requiredRole.slice(0, -2);
          return userRoles.some(userRole => userRole.startsWith(rolePrefix));
        }
        return userRoles.includes(requiredRole);
      });
    },
    [userRoles]
  );

  const hasAnyRole = React.useCallback(
    (roles: string[]): boolean => {
      if (userRoles.length === 0) return false;
      const normalizedRoles = roles.map(normalizeString);
      return normalizedRoles.some(requiredRole => {
        if (requiredRole.endsWith(':*')) {
          const rolePrefix = requiredRole.slice(0, -2);
          return userRoles.some(userRole => userRole.startsWith(rolePrefix));
        }
        return userRoles.includes(requiredRole);
      });
    },
    [userRoles]
  );

  const hasAllRoles = React.useCallback(
    (roles: string[]): boolean => {
      if (userRoles.length === 0) return false;
      const normalizedRoles = roles.map(normalizeString);
      return normalizedRoles.every(requiredRole => {
        if (requiredRole.endsWith(':*')) {
          const rolePrefix = requiredRole.slice(0, -2);
          return userRoles.some(userRole => userRole.startsWith(rolePrefix));
        }
        return userRoles.includes(requiredRole);
      });
    },
    [userRoles]
  );

  const hasPermission = React.useCallback(
    (permission: string | string[]): boolean => {
      if (userPermissions.length === 0) {
        // Fallback to role-based permission mapping only if no explicit permissions
        if (!userRoles.length) return false;

        // Role-based permission mapping (UX optimization only - NOT security boundary)
        const roleBasedPermissions: Record<string, string[]> = {
          super_admin: [],
          admin: ['user:read', 'user:list', 'user:update', 'role:read', 'permission:read'],
          seller: ['product:create', 'product:read', 'product:update', 'product:delete', 'order:read', 'order:update', 'inventory:read', 'inventory:update'],
          vendor: ['product:create', 'product:read', 'product:update', 'product:delete', 'order:read', 'inventory:read'],
          delivery_agent: ['order:read', 'order:update', 'delivery:update'],
          customer: ['product:read', 'order:create', 'order:read', 'review:create'],
        };

        // Super admin has all permissions
        if (userRoles.includes('super_admin')) return true;

        // Check role-based permissions
        let allowedPermissions: string[] = [];
        for (const role of userRoles) {
          if (roleBasedPermissions[role]) {
            allowedPermissions = [...allowedPermissions, ...roleBasedPermissions[role]];
          }
        }

        const permissionsToCheck = Array.isArray(permission) ? permission : [permission];
        const normalizedPermissions = permissionsToCheck.map(normalizeString);

        return normalizedPermissions.some(p => allowedPermissions.includes(p));
      }

      // Check against actual user permissions (from token)
      const permissionsToCheck = Array.isArray(permission) ? permission : [permission];
      const normalizedPermissions = permissionsToCheck.map(normalizeString);

      return normalizedPermissions.some(requiredPermission => {
        // Wildcard check (e.g., 'product:*' matches 'product:create', 'product:read', etc.)
        if (requiredPermission.endsWith(':*')) {
          const resource = requiredPermission.slice(0, -2);
          return userPermissions.some(userPerm => userPerm.startsWith(`${resource}:`));
        }
        return userPermissions.includes(requiredPermission);
      });
    },
    [userPermissions, userRoles]
  );

  const hasAnyPermission = React.useCallback(
    (permissions: string[]): boolean => {
      const normalizedPermissions = permissions.map(normalizeString);
      return normalizedPermissions.some(p => hasPermission(p));
    },
    [hasPermission]
  );

  const hasAllPermissions = React.useCallback(
    (permissions: string[]): boolean => {
      const normalizedPermissions = permissions.map(normalizeString);
      return normalizedPermissions.every(p => hasPermission(p));
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
