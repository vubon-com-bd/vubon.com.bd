/**
 * Require MFA Guard - MFA route protection
 * Enterprise Grade for vubon.com.bd - Bangladesh's #1 E-commerce
 * 
 * @module shared-auth/src/guards/RequireMFA
 * 
 * RULES:
 * ✅ ONLY MFA route protection - NO business logic
 * ✅ NO MFA verification engine, TOTP generation
 * ✅ Pure React guard component
 * ✅ TypeScript strict
 */

import React from 'react';
import { useAuth } from '../react/useAuth';
import { RequireAuth } from './RequireAuth';

// Import from shared-api and shared-utils
import { createMfaEndpoints } from '@vubon/shared-api';
import { withRetry, DEFAULT_RETRY_CONFIG } from '@vubon/shared-api/client/retry';
import { getAxiosClient } from '@vubon/shared-api/client/axios';
import { env } from '@vubon/shared-config/env';

// ==================== Types ====================

export interface RequireMFAProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  mfaStatusPath?: string;
  loadingFallback?: React.ReactNode;
  /** Whether MFA is optional or required */
  required?: boolean;
  /** Specific MFA methods required (e.g., ['totp', 'sms']) */
  requiredMethods?: string[];
}

export interface UseMFAStatusReturn {
  hasMFAEnabled: boolean;
  hasMfaVerified: boolean;
  availableMethods: string[];
  primaryMethod: string | null;
  isLoading: boolean;
  isRequired: boolean;
  /** Refresh MFA status manually */
  refreshStatus: () => Promise<void>;
}

// ==================== Helpers ====================

// Simple logger that can be replaced with proper logging solution
const logError = (error: unknown, context: string): void => {
  if (env.NODE_ENV === 'development') {
    console.error(`[RequireMFA] ${context}:`, error);
  }
};

// Helper function to extract data from API response
const extractData = <T>(response: { data?: { data?: T } }): T | undefined => {
  return response.data?.data;
};

// Helper function for idempotent GET requests with retry
const withIdempotentRetry = async <T>(requestFn: () => Promise<T>): Promise<T> => {
  return withRetry(requestFn, DEFAULT_RETRY_CONFIG);
};

/**
 * Hook to check MFA status (UX optimization only)
 * Real MFA verification MUST happen on backend
 */
export const useMFAStatus = (): UseMFAStatusReturn => {
  const { user, isAuthenticated } = useAuth();
  const [hasMFAEnabled, setHasMFAEnabled] = React.useState(false);
  const [hasMfaVerified, setHasMfaVerified] = React.useState(false);
  const [availableMethods, setAvailableMethods] = React.useState<string[]>([]);
  const [primaryMethod, setPrimaryMethod] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRequired, setIsRequired] = React.useState(false);

  // Create API client once
  const mfaApi = React.useMemo(() => {
    const client = getAxiosClient({ baseURL: env.API_URL });
    return createMfaEndpoints(client);
  }, []);

  const fetchMFAStatus = React.useCallback(async () => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      // API call to get MFA status with retry support
      const response = await withIdempotentRetry(() => mfaApi.getStatus());
      const status = extractData(response);

      setHasMFAEnabled(status?.enabled || false);
      setHasMfaVerified(status?.enabled || false);
      setAvailableMethods(status?.methods?.map((m: { provider: string }) => m.provider) || []);
      setPrimaryMethod(status?.defaultMethod || null);

      // Check if MFA is required for this user (based on role or settings)
      const mfaRequired = status?.requiredForRole || status?.requiredForAction || false;
      setIsRequired(mfaRequired);
    } catch (error) {
      logError(error, 'Failed to fetch MFA status');
      // Fallback to role-based check if API fails
      const fallbackRequired = user?.role === 'admin' || user?.role === 'super_admin';
      setIsRequired(fallbackRequired);
    } finally {
      setIsLoading(false);
    }
  }, [isAuthenticated, mfaApi, user?.role]);

  // Load status on mount
  React.useEffect(() => {
    fetchMFAStatus();
  }, [fetchMFAStatus]);

  const refreshStatus = React.useCallback(async () => {
    await fetchMFAStatus();
  }, [fetchMFAStatus]);

  return {
    hasMFAEnabled,
    hasMfaVerified,
    availableMethods,
    primaryMethod,
    isLoading,
    isRequired,
    refreshStatus,
  };
};

// ==================== Guard Component ====================

/**
 * Guard component that requires MFA to be enabled
 * Redirects to MFA setup if not enabled
 * 
 * @example
 * // Protect sensitive routes requiring MFA
 * <RequireMFA redirectTo="/mfa/setup">
 *   <AdminDashboard />
 * </RequireMFA>
 * 
 * @example
 * // Make MFA optional but recommended
 * <RequireMFA required={false}>
 *   <SettingsPage />
 * </RequireMFA>
 * 
 * @example
 * // Require specific MFA methods
 * <RequireMFA requiredMethods={['totp', 'sms']}>
 *   <PaymentPage />
 * </RequireMFA>
 */
export const RequireMFA: React.FC<RequireMFAProps> = ({
  children,
  fallback = null,
  redirectTo = '/mfa/setup',
  loadingFallback = null,
  required = true,
  requiredMethods,
}) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { hasMFAEnabled, isLoading: mfaLoading, isRequired, availableMethods, refreshStatus } = useMFAStatus();
  
  const isLoading = authLoading || mfaLoading;
  
  // Check if MFA is effectively required
  const effectivelyRequired = required && isRequired;
  
  // Check if user has required methods
  const hasRequiredMethods = React.useMemo(() => {
    if (!requiredMethods || requiredMethods.length === 0) {
      return hasMFAEnabled;
    }
    return requiredMethods.every((method) => availableMethods.includes(method));
  }, [requiredMethods, availableMethods, hasMFAEnabled]);
  
  // Show loading state
  if (isLoading) {
    return <>{loadingFallback}</>;
  }
  
  // Must be authenticated first
  if (!isAuthenticated) {
    return <RequireAuth redirectTo="/login">{null}</RequireAuth>;
  }
  
  // If MFA is required but not enabled, redirect
  if (effectivelyRequired && !hasRequiredMethods && redirectTo && typeof window !== 'undefined') {
    window.location.href = redirectTo;
    return null;
  }
  
  // If MFA is required but user doesn't have required methods
  if (requiredMethods && requiredMethods.length > 0 && !hasRequiredMethods) {
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

/**
 * Higher-order component for requiring MFA
 * Wraps a component with RequireMFA guard
 * 
 * @example
 * const AdminPanel = withMFA(AdminComponent, { redirectTo: '/mfa/setup' });
 */
export const withMFA = <P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<RequireMFAProps, 'children'>
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => (
    <RequireMFA {...options}>
      <Component {...props} />
    </RequireMFA>
  );
  
  WrappedComponent.displayName = `withMFA(${Component.displayName || Component.name || 'Component'})`;
  
  return WrappedComponent;
};

// ==================== Type Exports ====================

export type { RequireMFAProps, UseMFAStatusReturn };
