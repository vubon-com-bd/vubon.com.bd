/**
 * Require Device Trust Guard - Device trust route protection
 * UX optimization ONLY - Backend MUST enforce device trust validation

 * @module shared-auth/src/guards/RequireDeviceTrust

 * RULES:
 * ✅ ONLY UI device trust guard - NOT a security boundary
 * ✅ Backend MUST validate device trust for sensitive operations
 * ✅ Pure React guard component
 * ✅ TypeScript strict
 */

import React from 'react';
import { useAuth } from '../react/useAuth';
import { useDeviceTrust } from '../react/useDeviceTrust';
import { RequireAuth } from './RequireAuth';

// ==================== Types ====================

export interface RequireDeviceTrustProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
  loadingFallback?: React.ReactNode;
  /**
   * If true, doesn't redirect but just shows fallback
   * Useful for hiding UI elements without redirect
   */
  noRedirect?: boolean;
  /**
   * Minimum trust level required
   * 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust'
   */
  minTrustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  /**
   * Whether to check if device is trusted for current session
   * Default: true
   */
  checkSessionTrust?: boolean;
}

// ==================== Helper Functions ====================

/**
 * Check if trust level meets minimum requirement
 */
const meetsMinTrustLevel = (
  currentLevel: string,
  minLevel: string
): boolean => {
  const levels: Record<string, number> = {
    untrusted: 0,
    standard: 1,
    trusted: 2,
    high_trust: 3,
    maximum_trust: 4,
  };

  const currentScore = levels[currentLevel] ?? 0;
  const minScore = levels[minLevel] ?? 0;

  return currentScore >= minScore;
};

// ==================== Guard Component ====================

/**
 * Guard component that requires device to be trusted
 * For UI optimization only - NOT a security boundary

 * WARNING: This does NOT enforce device trust.
 * Backend MUST validate device trust for all sensitive operations.

 * @example
 * // Require trusted device (minimum trust level: trusted)
 * <RequireDeviceTrust>
 *   <PaymentPage />
 * </RequireDeviceTrust>

 * @example
 * // Require high trust level for sensitive operations
 * <RequireDeviceTrust minTrustLevel="high_trust" redirectTo="/device/verify">
 *   <WithdrawPage />
 * </RequireDeviceTrust>

 * @example
 * // Show fallback without redirect
 * <RequireDeviceTrust fallback={<DeviceNotTrusted />} noRedirect>
 *   <SensitiveAction />
 * </RequireDeviceTrust>
 */
export const RequireDeviceTrust: React.FC<RequireDeviceTrustProps> = ({
  children,
  fallback = null,
  redirectTo = '/device/verify',
  loadingFallback = null,
  noRedirect = false,
  minTrustLevel = 'trusted',
  checkSessionTrust = true,
}) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const {
    isTrusted,
    trustLevel,
    isSessionTrusted,
    isLoading: trustLoading,
    refreshStatus,
  } = useDeviceTrust();

  const isLoading = authLoading || trustLoading;

  // Check if device meets trust requirements
  const hasRequiredTrust = React.useMemo(() => {
    // Check if device is trusted based on trust level
    const meetsLevel = meetsMinTrustLevel(trustLevel, minTrustLevel);

    // Check session trust if required
    if (checkSessionTrust) {
      return meetsLevel && isSessionTrusted;
    }

    return meetsLevel;
  }, [trustLevel, minTrustLevel, checkSessionTrust, isSessionTrusted]);

  // Show loading state
  if (isLoading) {
    return <>{loadingFallback}</>;
  }

  // Must be authenticated first
  if (!isAuthenticated) {
    return <RequireAuth redirectTo="/login">{null}</RequireAuth>;
  }

  // If device doesn't meet trust requirements
  if (!hasRequiredTrust) {
    // Refresh trust status (in case it changed)
    refreshStatus();

    // Redirect or show fallback
    if (!noRedirect && redirectTo && typeof window !== 'undefined') {
      window.location.href = redirectTo;
    }
    return <>{fallback}</>;
  }

  return <>{children}</>;
};

// ==================== Higher-Order Component ====================

/**
 * Higher-order component for requiring device trust
 * Wraps a component with RequireDeviceTrust guard

 * @example
 * const PaymentPage = withDeviceTrust(PaymentComponent, { minTrustLevel: 'trusted' });
 */
export const withDeviceTrust = <P extends object>(
  Component: React.ComponentType<P>,
  options?: Omit<RequireDeviceTrustProps, 'children'>
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => (
    <RequireDeviceTrust {...options}>
      <Component {...props} />
    </RequireDeviceTrust>
  );

  WrappedComponent.displayName = `withDeviceTrust(${Component.displayName || Component.name || 'Component'})`;

  return WrappedComponent;
};

// ==================== Conditional Render Component ====================

/**
 * Component that conditionally renders based on device trust
 * Doesn't redirect, just shows/hides content
 * Useful for buttons and UI elements

 * @example
 * <IfDeviceTrust>
 *   <TrustedDeviceOnlyButton />
 * </IfDeviceTrust>

 * @example
 * <IfDeviceTrust minTrustLevel="high_trust" fallback={<RequireVerification />}>
 *   <HighSecurityAction />
 * </IfDeviceTrust>
 */
export const IfDeviceTrust: React.FC<{
  children: React.ReactNode;
  fallback?: React.ReactNode;
  minTrustLevel?: 'untrusted' | 'standard' | 'trusted' | 'high_trust' | 'maximum_trust';
  checkSessionTrust?: boolean;
}> = ({
  children,
  fallback = null,
  minTrustLevel = 'trusted',
  checkSessionTrust = true,
}) => {
  const { trustLevel, isSessionTrusted, isLoading } = useDeviceTrust();

  if (isLoading) {
    return <>{fallback}</>;
  }

  const meetsLevel = meetsMinTrustLevel(trustLevel, minTrustLevel);
  const hasTrust = checkSessionTrust ? meetsLevel && isSessionTrusted : meetsLevel;

  return <>{hasTrust ? children : fallback}</>;
};

/**
 * Memoized version of IfDeviceTrust to prevent unnecessary re-renders
 */
export const IfDeviceTrustMemo = React.memo(IfDeviceTrust);

// ==================== Type Exports ====================

export type { RequireDeviceTrustProps };
