/**
 * Auth Context - React authentication state abstraction
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 *
 * @module shared-auth/react/AuthContext
 *
 * RULES:
 * ✅ ONLY React context abstraction - NO business logic
 * ✅ NO API implementation, raw axios, business rules, role engine
 * ✅ Pure context state management
 * ✅ TypeScript strict
 */

import React, { useCallback, useMemo } from 'react';
import type { AuthState, User, AuthClient, MFAProvider, MFASetupResponse, MFAMethod } from '../client/auth.client';

// ==================== Types ====================

export interface RegisterFormData {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
  phoneNumber?: string;
  acceptTerms: boolean;
  marketingConsent?: boolean;
  referrerCode?: string;
}

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
  deviceId?: string;
}

export interface PhoneLoginCredentials {
  phoneNumber: string;
  password: string;
  rememberMe?: boolean;
  deviceId?: string;
  mobileOperator?: 'gp' | 'robi' | 'banglalink' | 'teletalk';
}

export interface OtpLoginCredentials {
  phoneNumber: string;
  otpCode: string;
  rememberMe?: boolean;
  deviceId?: string;
}

export interface MfaVerificationParams {
  code: string;
  methodId?: string;
  trustDevice?: boolean;
  challengeId?: string;
}

export interface AuthContextValue extends AuthState {
  // Authentication methods
  login: (credentials: LoginCredentials) => Promise<void>;
  phoneLogin: (credentials: PhoneLoginCredentials) => Promise<void>;
  otpLogin: (credentials: OtpLoginCredentials) => Promise<void>;
  register: (data: RegisterFormData) => Promise<void>;
  logout: (allDevices?: boolean) => Promise<void>;
  refreshSession: () => Promise<boolean>;

  // MFA methods
  verifyMfa: (params: MfaVerificationParams) => Promise<void>;
  /** Setup MFA for a provider (TOTP, SMS, WhatsApp, bKash PIN, etc.) */
  setupMfa: (provider: MFAProvider, identifier?: string, label?: string) => Promise<MFASetupResponse>;
  /** Get all MFA methods for current user */
  getMfaMethods: () => Promise<MFAMethod[]>;
  isMfaRequired: boolean;
  mfaMethods?: Array<{ id: string; provider: MFAProvider; isPrimary: boolean }>;

  // Account lock methods
  /** Check if account is locked */
  isAccountLocked: () => boolean;
  /** Get remaining lock time in seconds */
  getRemainingLockTime: () => number;
  /** Unlock account using backup code, OTP, or verification code */
  unlockAccount: (data: { email?: string; phoneNumber?: string; backupCode?: string; verificationCode?: string; otpCode?: string }) => Promise<{ success: boolean; message: string }>;

  // Permission helpers (UI only - NOT security boundary)
  /** Check if user has specific role (case-insensitive) */
  hasRole: (role: string | string[]) => boolean;
  /** Check if user has any of the specified roles */
  hasAnyRole: (roles: string[]) => boolean;
  /** Check if user has all of the specified roles */
  hasAllRoles: (roles: string[]) => boolean;
  /** Check if user has specific permission (case-insensitive) */
  hasPermission: (permission: string | string[]) => boolean;
  /** Check if user has any of the specified permissions */
  hasAnyPermission: (permissions: string[]) => boolean;
  /** Check if user has all of the specified permissions */
  hasAllPermissions: (permissions: string[]) => boolean;

  // User info helpers
  displayName: string;
  userTier: string;
  /** Check if user is fully verified (email + phone) */
  isVerified: boolean;
  /** Check if email is verified */
  isEmailVerified: boolean;
  /** Check if phone is verified */
  isPhoneVerified: boolean;

  // Loading states (for UI feedback)
  isLoggingIn: boolean;
  isRegistering: boolean;
  isLoggingOut: boolean;
  isRefreshing: boolean;
}

// ==================== Helper Functions ====================

const normalizeRole = (role: string): string => role.toLowerCase().trim();
const normalizePermission = (permission: string): string => permission.toLowerCase().trim();

// Simple logger that can be replaced with proper logging solution
const logError = (error: unknown): void => {
  if (process.env.NODE_ENV === 'development') {
    console.error('[AuthContext] Initialization error:', error);
  }
};

// ==================== Context ====================

export const AuthContext = React.createContext<AuthContextValue | null>(null);

AuthContext.displayName = 'AuthContext';

// ==================== Provider Component Props ====================

export interface AuthProviderProps {
  children: React.ReactNode;
  authClient: AuthClient;
  loadingFallback?: React.ReactNode;
}

// ==================== Auth Provider Component ====================

export const AuthProvider: React.FC<AuthProviderProps> = ({ 
  children, 
  authClient, 
  loadingFallback
}) => {
  const [state, setState] = React.useState<AuthState>(authClient.getState());
  const [isLoggingIn, setIsLoggingIn] = React.useState(false);
  const [isRegistering, setIsRegistering] = React.useState(false);
  const [isLoggingOut, setIsLoggingOut] = React.useState(false);
  const [isRefreshing, setIsRefreshing] = React.useState(false);

  // Subscribe to auth client state changes
  React.useEffect(() => {
    const unsubscribe = authClient.subscribe((newState) => {
      setState(newState);
    });

    // Initialize client
    authClient.initialize().catch(logError);

    return () => {
      unsubscribe();
    };
  }, [authClient]);

  // ==================== Authentication Methods ====================

  const login = useCallback(async (credentials: LoginCredentials): Promise<void> => {
    setIsLoggingIn(true);
    try {
      await authClient.login(credentials);
    } finally {
      setIsLoggingIn(false);
    }
  }, [authClient]);

  const phoneLogin = useCallback(async (credentials: PhoneLoginCredentials): Promise<void> => {
    setIsLoggingIn(true);
    try {
      await authClient.phoneLogin(
        credentials.phoneNumber,
        credentials.password,
        credentials.rememberMe,
        credentials.deviceId,
        credentials.mobileOperator
      );
    } finally {
      setIsLoggingIn(false);
    }
  }, [authClient]);

  const otpLogin = useCallback(async (credentials: OtpLoginCredentials): Promise<void> => {
    setIsLoggingIn(true);
    try {
      await authClient.otpLogin(
        credentials.phoneNumber,
        credentials.otpCode,
        credentials.rememberMe,
        credentials.deviceId
      );
    } finally {
      setIsLoggingIn(false);
    }
  }, [authClient]);

  const register = useCallback(async (data: RegisterFormData): Promise<void> => {
    setIsRegistering(true);
    try {
      await authClient.register(data);
    } finally {
      setIsRegistering(false);
    }
  }, [authClient]);

  const logout = useCallback(async (allDevices?: boolean): Promise<void> => {
    setIsLoggingOut(true);
    try {
      await authClient.logout(allDevices);
    } finally {
      setIsLoggingOut(false);
    }
  }, [authClient]);

  const refreshSession = useCallback(async (): Promise<boolean> => {
    setIsRefreshing(true);
    try {
      return await authClient.refreshSession();
    } finally {
      setIsRefreshing(false);
    }
  }, [authClient]);

  const verifyMfa = useCallback(async (params: MfaVerificationParams): Promise<void> => {
    await authClient.verifyMfa(params.code, params.methodId, params.trustDevice, params.challengeId);
  }, [authClient]);

  const setupMfa = useCallback(async (provider: MFAProvider, identifier?: string, label?: string): Promise<MFASetupResponse> => {
    return authClient.setupMFA(provider, identifier, label);
  }, [authClient]);

  const getMfaMethods = useCallback(async (): Promise<MFAMethod[]> => {
    return authClient.getMFAMethods();
  }, [authClient]);

  const isAccountLocked = useCallback((): boolean => {
    return authClient.isAccountLocked();
  }, [authClient]);

  const getRemainingLockTime = useCallback((): number => {
    return authClient.getRemainingLockTime();
  }, [authClient]);

  const unlockAccount = useCallback(async (data: { email?: string; phoneNumber?: string; backupCode?: string; verificationCode?: string; otpCode?: string }) => {
    return authClient.unlockAccount(data);
  }, [authClient]);

  // ==================== Permission Helpers (Memoized for performance) ====================

  const userRoles = useMemo(() => {
    const role = state.user?.role;
    return role ? [normalizeRole(role)] : [];
  }, [state.user?.role]);

  const userPermissions = useMemo(() => {
    return state.user?.permissions?.map(normalizePermission) ?? [];
  }, [state.user?.permissions]);

  const hasRole = useCallback((role: string | string[]): boolean => {
    const rolesToCheck = Array.isArray(role) ? role : [role];
    const normalizedRolesToCheck = rolesToCheck.map(normalizeRole);
    return normalizedRolesToCheck.some(r => userRoles.includes(r));
  }, [userRoles]);

  const hasAnyRole = useCallback((roles: string[]): boolean => {
    const normalizedRoles = roles.map(normalizeRole);
    return normalizedRoles.some(r => userRoles.includes(r));
  }, [userRoles]);

  const hasAllRoles = useCallback((roles: string[]): boolean => {
    const normalizedRoles = roles.map(normalizeRole);
    return normalizedRoles.every(r => userRoles.includes(r));
  }, [userRoles]);

  const hasPermission = useCallback((permission: string | string[]): boolean => {
    const permissionsToCheck = Array.isArray(permission) ? permission : [permission];
    const normalizedPermissions = permissionsToCheck.map(normalizePermission);
    return normalizedPermissions.some(p => userPermissions.includes(p));
  }, [userPermissions]);

  const hasAnyPermission = useCallback((permissions: string[]): boolean => {
    const normalizedPermissions = permissions.map(normalizePermission);
    return normalizedPermissions.some(p => userPermissions.includes(p));
  }, [userPermissions]);

  const hasAllPermissions = useCallback((permissions: string[]): boolean => {
    const normalizedPermissions = permissions.map(normalizePermission);
    return normalizedPermissions.every(p => userPermissions.includes(p));
  }, [userPermissions]);

  // ==================== User Info Helpers ====================

  const displayName = state.user?.displayName || state.user?.firstName || state.user?.email || '';
  const userTier = state.user?.userTier || 'bronze';
  const isEmailVerified = state.user?.emailVerified ?? false;
  const isPhoneVerified = state.user?.phoneVerified ?? false;
  const isVerified = isEmailVerified && isPhoneVerified;

  // ==================== Context Value ====================

  const contextValue: AuthContextValue = useMemo(() => ({
    ...state,
    // Methods
    login,
    phoneLogin,
    otpLogin,
    register,
    logout,
    refreshSession,
    verifyMfa,
    setupMfa,
    getMfaMethods,
    isAccountLocked,
    getRemainingLockTime,
    unlockAccount,
    // MFA
    isMfaRequired: state.requiresMfa,
    mfaMethods: state.mfaMethods,
    // Permission helpers
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
    // Loading states
    isLoggingIn,
    isRegistering,
    isLoggingOut,
    isRefreshing,
  }), [
    state,
    login,
    phoneLogin,
    otpLogin,
    register,
    logout,
    refreshSession,
    verifyMfa,
    setupMfa,
    getMfaMethods,
    isAccountLocked,
    getRemainingLockTime,
    unlockAccount,
    hasRole,
    hasAnyRole,
    hasAllRoles,
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    displayName,
    userTier,
    isVerified,
    isEmailVerified,
    isPhoneVerified,
    isLoggingIn,
    isRegistering,
    isLoggingOut,
    isRefreshing,
  ]);

  // Loading state while initializing
  if (state.isLoading && loadingFallback !== undefined) {
    return <>{loadingFallback}</>;
  }

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

// ==================== Hook ====================

/**
 * Hook to use auth context
 * Throws error if used outside AuthProvider
 */
export const useAuthContext = (): AuthContextValue => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error('useAuthContext must be used within AuthProvider');
  }
  return context;
};

// ==================== Type Exports ====================

export type { AuthContextValue, MfaVerificationParams };
