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

// ==================== Types ====================

export interface RequireMFAProps {
  children: React.ReactNode;
  fallback ? : React.ReactNode;
  redirectTo ? : string;
  mfaStatusPath ? : string;
  loadingFallback ? : React.ReactNode;
  /** Whether MFA is optional or required */
  required ? : boolean;
  /** Specific MFA methods required (e.g., ['totp', 'sms']) */
  requiredMethods ? : string[];
}

export interface UseMFAStatusReturn {
  hasMFAEnabled: boolean;
  hasMfaVerified: boolean;
  availableMethods: string[];
  primaryMethod: string | null;
  isLoading: boolean;
  isRequired: boolean;
}

// ==================== Hook ====================

/**
 * Hook to check MFA status (UX optimization only)
 * Real MFA verification MUST happen on backend
 */
export const useMFAStatus = (): UseMFAStatusReturn => {
  const { user, isAuthenticated } = useAuth();
  const [hasMFAEnabled, setHasMFAEnabled] = React.useState(false);
  const [hasMfaVerified, setHasMfaVerified] = React.useState(false);
  const [availableMethods, setAvailableMethods] = React.useState < string[] > ([]);
  const [primaryMethod, setPrimaryMethod] = React.useState < string | null > (null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isRequired, setIsRequired] = React.useState(false);
  
  React.useEffect(() => {
    if (!isAuthenticated) {
      setIsLoading(false);
      return;
    }
    
    const checkMFAStatus = async () => {
      setIsLoading(true);
      try {
        // This should call your backend MFA status endpoint
        // For now, using placeholder logic based on user data
        const hasMfa = false; // Replace with actual API call
        setHasMFAEnabled(hasMfa);
        setHasMfaVerified(hasMfa);
        
        // Check if MFA is required for this user (based on role or settings)
        const mfaRequired = user?.role === 'admin' || user?.role === 'super_admin';
        setIsRequired(mfaRequired);
        
        // Available methods would come from backend
        setAvailableMethods(['totp', 'sms']);
        setPrimaryMethod(null);
      } catch (error) {
        console.error('Failed to check MFA status:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    checkMFAStatus();
  }, [isAuthenticated, user?.role]);
  
  return {
    hasMFAEnabled,
    hasMfaVerified,
    availableMethods,
    primaryMethod,
    isLoading,
    isRequired,
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
 */
export const RequireMFA: React.FC < RequireMFAProps > = ({
  children,
  fallback = null,
  redirectTo = '/mfa/setup',
  loadingFallback = null,
  required = true,
  requiredMethods,
}) => {
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { hasMFAEnabled, isLoading: mfaLoading, isRequired, availableMethods } = useMFAStatus();
  
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
