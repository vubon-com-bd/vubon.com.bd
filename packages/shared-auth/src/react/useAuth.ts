/**
 * useAuth Hook - Authentication hook for React components
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-auth/auth-shared/src/react/useAuth
 * 
 * RULES:
 * ✅ ONLY authentication hook abstraction - NO business logic
 * ✅ NO permission calculation engine, backend authorization
 * ✅ Pure React hooks for auth state access
 * ✅ TypeScript strict
 */

import { useMemo } from 'react';
import { useAuthContext } from './AuthContext';
import type { AuthContextValue, LoginCredentials, PhoneLoginCredentials, OtpLoginCredentials, RegisterFormData } from './AuthContext';

// ==================== Main Auth Hook ====================

/**
 * Hook for accessing authentication state and methods
 * For UX optimization only - NOT a security boundary
 * 
 * @returns Auth context value with all auth methods and state
 * 
 * @example
 * const { login, user, isAuthenticated, hasRole } = useAuth();
 */
export const useAuth = (): AuthContextValue => {
  return useAuthContext();
};

// ==================== State Hooks ====================

/**
 * Hook for checking if user is authenticated (optimization only)
 * Real authorization MUST happen on backend
 * 
 * @returns True if user is authenticated
 */
export const useIsAuthenticated = (): boolean => {
  const { isAuthenticated } = useAuthContext();
  return isAuthenticated;
};

/**
 * Hook for getting current user (optimization only)
 * 
 * @returns Current user object or null
 */
export const useCurrentUser = () => {
  const { user } = useAuthContext();
  return user;
};

/**
 * Hook for getting auth loading state
 * 
 * @returns True if auth is loading
 */
export const useAuthLoading = (): boolean => {
  const { isLoading } = useAuthContext();
  return isLoading;
};

/**
 * Hook for user display name
 * 
 * @returns User's display name
 */
export const useUserDisplayName = (): string => {
  const { displayName } = useAuthContext();
  return displayName;
};

/**
 * Hook for user tier (Bangladesh specific loyalty program)
 * 
 * @returns User tier (bronze, silver, gold, platinum, diamond)
 */
export const useUserTier = (): string => {
  const { userTier } = useAuthContext();
  return userTier;
};

/**
 * Hook for verification status
 * 
 * @returns True if user is verified (email or phone verified)
 */
export const useIsVerified = (): boolean => {
  const { isVerified } = useAuthContext();
  return isVerified;
};

// ==================== Role Hooks ====================

/**
 * Hook for getting user role
 * 
 * @returns User role or null
 */
export const useUserRole = (): string | null => {
  const { user } = useAuthContext();
  return user?.role || null;
};

/**
 * Hook for checking user role (UX optimization only)
 * 
 * @param role - Single role or array of roles to check
 * @returns True if user has the specified role
 * 
 * @example
 * const isAdmin = useHasRole('admin');
 * const isAdminOrManager = useHasRole(['admin', 'manager']);
 */
export const useHasRole = (role: string | string[]): boolean => {
  const { hasRole } = useAuthContext();
  return hasRole(role);
};

/**
 * Hook for checking any of the specified roles
 * 
 * @param roles - Array of roles to check
 * @returns True if user has any of the specified roles
 */
export const useHasAnyRole = (roles: string[]): boolean => {
  const { hasAnyRole } = useAuthContext();
  return hasAnyRole(roles);
};

/**
 * Hook for checking if user has all specified roles
 * 
 * @param roles - Array of roles required
 * @returns True if user has all specified roles
 */
export const useHasAllRoles = (roles: string[]): boolean => {
  const { hasAllRoles } = useAuthContext();
  return hasAllRoles(roles);
};

// ==================== Permission Hooks ====================

/**
 * Hook for checking permission (UX optimization only)
 * Real authorization MUST happen on backend
 * Supports single permission, array of permissions, and wildcard (*)
 * 
 * @param permission - Permission string, array of permissions, or wildcard (e.g., 'product:*')
 * @returns True if user has the permission(s)
 * 
 * @example
 * const canEdit = useHasPermission('product:update');
 * const canManage = useHasPermission('product:*');
 * const canAll = useHasPermission(['product:create', 'product:update', 'product:delete']);
 */
export const useHasPermission = (permission: string | string[]): boolean => {
  const { hasPermission } = useAuthContext();
  return hasPermission(permission);
};

/**
 * Hook for checking any of the specified permissions
 * 
 * @param permissions - Array of permissions to check
 * @returns True if user has any of the specified permissions
 */
export const useHasAnyPermission = (permissions: string[]): boolean => {
  const { hasAnyPermission } = useAuthContext();
  return hasAnyPermission(permissions);
};

/**
 * Hook for checking multiple permissions with memoized results
 * 
 * @param permissions - Array of permissions to check
 * @returns Object with permission check results
 * 
 * @example
 * const perms = usePermissions(['product:create', 'product:update', 'product:delete']);
 * if (perms['product:create']) { ... }
 */
export const usePermissions = (permissions: string[]): Record<string, boolean> => {
  const { hasPermission } = useAuthContext();
  
  return useMemo(() => {
    const results: Record<string, boolean> = {};
    for (const permission of permissions) {
      results[permission] = hasPermission(permission);
    }
    return results;
  }, [permissions, hasPermission]);
};

// ==================== Action Hooks ====================

/**
 * Hook for login function
 * 
 * @returns Login function that accepts email/password credentials
 * 
 * @example
 * const login = useLogin();
 * await login({ email: 'user@example.com', password: 'password123' });
 */
export const useLogin = () => {
  const { login } = useAuthContext();
  return login;
};

/**
 * Hook for phone login (Bangladesh specific)
 * 
 * @returns Phone login function
 * 
 * @example
 * const phoneLogin = usePhoneLogin();
 * await phoneLogin({ 
 *   phoneNumber: '01712345678', 
 *   password: 'password123',
 *   mobileOperator: 'gp'
 * });
 */
export const usePhoneLogin = () => {
  const { phoneLogin } = useAuthContext();
  return phoneLogin;
};

/**
 * Hook for OTP login (Bangladesh specific)
 * 
 * @returns OTP login function
 */
export const useOtpLogin = () => {
  const { otpLogin } = useAuthContext();
  return otpLogin;
};

/**
 * Hook for logout function
 * 
 * @returns Logout function
 */
export const useLogout = () => {
  const { logout } = useAuthContext();
  return logout;
};

/**
 * Hook for register function
 * 
 * @returns Register function
 */
export const useRegister = () => {
  const { register } = useAuthContext();
  return register;
};

/**
 * Hook for refreshing session
 * 
 * @returns Refresh session function
 */
export const useRefreshSession = () => {
  const { refreshSession } = useAuthContext();
  return refreshSession;
};

/**
 * Hook for all authentication actions
 * Useful when you need multiple auth methods in a component
 * 
 * @returns Object with all auth action functions
 * 
 * @example
 * const { login, logout, register } = useAuthActions();
 */
export const useAuthActions = () => {
  const { login, phoneLogin, otpLogin, register, logout, refreshSession } = useAuthContext();
  return { login, phoneLogin, otpLogin, register, logout, refreshSession };
};

// ==================== MFA Hooks ====================

/**
 * Hook for MFA verification
 * 
 * @returns MFA verify function
 */
export const useVerifyMfa = () => {
  const { verifyMfa } = useAuthContext();
  return verifyMfa;
};

/**
 * Hook for MFA required status
 * 
 * @returns True if MFA is required
 */
export const useIsMfaRequired = (): boolean => {
  const { isMfaRequired } = useAuthContext();
  return isMfaRequired;
};

/**
 * Hook for MFA methods
 * 
 * @returns Array of MFA methods
 */
export const useMfaMethods = () => {
  const { mfaMethods, getMfaMethods } = useAuthContext();
  return { mfaMethods, getMfaMethods };
};

/**
 * Hook for setting up MFA
 * 
 * @returns Setup MFA function
 */
export const useSetupMfa = () => {
  const { setupMfa } = useAuthContext();
  return setupMfa;
};

// ==================== Account Lock Hooks ====================

/**
 * Hook for account lock status and methods
 * 
 * @returns Account lock object with status, remaining time, and unlock function
 */
export const useAccountLock = () => {
  const { isAccountLocked, getRemainingLockTime, unlockAccount } = useAuthContext();
  return { isAccountLocked, getRemainingLockTime, unlockAccount };
};

/**
 * Hook for checking if account is locked
 * 
 * @returns True if account is locked
 */
export const useIsAccountLocked = (): boolean => {
  const { isAccountLocked } = useAuthContext();
  return isAccountLocked;
};

/**
 * Hook for getting remaining lock time
 * 
 * @returns Remaining lock time in seconds (0 if not locked)
 */
export const useRemainingLockTime = (): number => {
  const { getRemainingLockTime } = useAuthContext();
  return getRemainingLockTime();
};

// ==================== Loading State Hooks ====================

/**
 * Hook for login loading state
 * 
 * @returns True if login is in progress
 */
export const useIsLoggingIn = (): boolean => {
  const { isLoggingIn } = useAuthContext();
  return isLoggingIn;
};

/**
 * Hook for register loading state
 * 
 * @returns True if registration is in progress
 */
export const useIsRegistering = (): boolean => {
  const { isRegistering } = useAuthContext();
  return isRegistering;
};

/**
 * Hook for logout loading state
 * 
 * @returns True if logout is in progress
 */
export const useIsLoggingOut = (): boolean => {
  const { isLoggingOut } = useAuthContext();
  return isLoggingOut;
};

// ==================== Type Exports ====================

export type { LoginCredentials, PhoneLoginCredentials, OtpLoginCredentials, RegisterFormData };
