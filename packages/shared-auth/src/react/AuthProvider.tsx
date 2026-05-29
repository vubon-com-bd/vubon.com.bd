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
  loadingComponent?: React.ReactNode;
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
  loadingComponent,
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
        console.error('Auth initialization error:', error);
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

  // MFA setup
  const setupMfa = React.useCallback(
    async (provider: MFAProvider, identifier?: string, label?: string) => {
      return authClient.setupMFA(provider, identifier, label);
    },
    [authClient]
  );

  // Get MFA methods
  const getMfaMethods = React.useCallback(async () => {
    return authClient.getMFAMethods();
  }, [authClient]);

  // Unlock account
  const unlockAccount = React.useCallback(
    async (data: { email?: string; phoneNumber?: string; backupCode?: string; verificationCode?: string; otpCode?: string }) => {
      return authClient.unlockAccount(data);
    },
    [authClient]
  );

  // Check if account is locked
  const isAccountLocked = React.useCallback(() => {
    return authClient.isAccountLocked();
  }, [authClient]);

  // Get remaining lock time
  const getRemainingLockTime = React.useCallback(() => {
    return authClient.getRemainingLockTime();
  }, [authClient]);

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
      const userPermissions = state.user?.permissions;
      
      // Check if user has explicit permissions from token
      if (userPermissions?.includes(permission)) {
        return true;
      }
      
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
      
      // Vendor permissions (Bangladesh specific)
      if (userRole === 'vendor') {
        const vendorPermissions = ['product:create', 'product:read', 'product:update', 'product:delete', 'order:read', 'inventory:read'];
        return vendorPermissions.includes(permission);
      }
      
      // Delivery agent permissions (Bangladesh specific)
      if (userRole === 'delivery_agent') {
        const deliveryPermissions = ['order:read', 'order:update', 'delivery:update'];
        return deliveryPermissions.includes(permission);
      }
      
      // Customer permissions
      if (userRole === 'customer') {
        const customerPermissions = ['product:read', 'order:create', 'order:read', 'review:create'];
        return customerPermissions.includes(permission);
      }
      
      return false;
    },
    [state.user?.role, state.user?.permissions]
  );

  // Check if user has any of the specified permissions
  const hasAnyPermission = React.useCallback(
    (permissions: string[]): boolean => {
      return permissions.some((p) => hasPermission(p));
    },
    [hasPermission]
  );

  // Check if user has all specified permissions
  const hasAllPermissions = React.useCallback(
    (permissions: string[]): boolean => {
      return permissions.every((p) => hasPermission(p));
    },
    [hasPermission]
  );

  // Compute derived values
  const displayName = state.user 
    ? state.user.displayName || `${state.user.firstName} ${state.user.lastName}` 
    : '';
  const userTier = state.user?.userTier || 'bronze';
  const isVerified = state.user?.emailVerified || false;
  const isMfaRequired = state.requiresMfa;
  const isAccountLockedState = state.accountLocked;
  const remainingLockTime = state.remainingLockTimeSeconds;

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
    isAccountLocked: isAccountLockedState,
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
    return loadingComponent ? <>{loadingComponent}</> : null;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
