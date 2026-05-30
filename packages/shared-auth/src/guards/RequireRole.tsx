/**
 * Require Role Guard - Role-based route protection
 * UX optimization ONLY - Backend MUST enforce authorization
 * 
 * @module shared-auth/src/guards/RequireRole
 * 
 * RULES:
 * ✅ ONLY UI role guard - NOT a security boundary
 * ✅ Backend MUST enforce authorization
 * ✅ Pure React guard component
 * ✅ TypeScript strict
 */

import React from 'react';
import { useAuth } from '../react/useAuth';
import { usePermission } from '../react/usePermission';

// ==================== Types ====================

export interface RequireRoleProps {
  children: React.ReactNode;
  roles: string | string[];
  match?: 'all' | 'any';
  fallback?: React.ReactNode;
  redirectTo?: string;
  loadingFallback?: React.ReactNode;
  /**
   * If true, doesn't redirect but just shows fallback
   * Useful for hiding UI elements without redirect
   */
  noRedirect?: boolean;
}

// ==================== Helper Functions ====================

/**
 * Normalize role string (case-insensitive comparison)
 */
const normalizeRole = (role: string): string => role.toLowerCase().trim();

/**
 * Check if user has required roles
 */
const checkRoleAccess = (
  userRoles: string[],
  requiredRoles: string[],
  match: 'all' | 'any',
  isSuperAdmin: boolean
): boolean => {
  // Super admin bypass (for UI only)
  if (isSuperAdmin) return true;
  
  const normalizedUserRoles = userRoles.map(normalizeRole);
  const normalizedRequired = requiredRoles.map(normalizeRole);
  
  if (match === 'all') {
    return normalizedRequired.every(role => normalizedUserRoles.includes(role));
  }
  
  // match === 'any'
  return normalizedRequired.some(role => normalizedUserRoles.includes(role));
};

// ==================== Guard Component ====================

/**
 * Guard component that requires specific role(s)
 * For UI optimization only - NOT a security boundary
 * 
 * WARNING: This does NOT enforce authorization.
 * Backend MUST verify roles for all sensitive operations.
 * 
 * @example
 * // Require admin role
 * <RequireRole roles="admin">
 *   <AdminPanel />
 * </RequireRole>
 * 
 * @example
 * // Require any of the specified roles
 * <RequireRole roles={['admin', 'seller']}>
 *   <Dashboard />
 * </RequireRole>
 * 
 * @example
 * // Require all specified roles (match="all")
 * <RequireRole roles={['admin', 'verified']} match="all">
 *   <SuperAdminPanel />
 * </RequireRole>
 */
export const RequireRole: React.FC<RequireRoleProps> = ({
  children,
  roles,
  match = 'any',
  fallback = null,
  redirectTo,
  loadingFallback = null,
  noRedirect = false,
}) => {
  const { isLoading: authLoading, isAuthenticated } = useAuth();
  const { user, isSuperAdmin } = usePermission();
  
  const isLoading = authLoading;
  
  // Get user roles from context
  const userRoles = React.useMemo(() => {
    const role = user?.role;
    // Support for multiple roles (if user has roles array)
    if (user?.roles && Array.isArray(user.roles)) {
      return user.roles;
    }
    return role ? [role] : [];
  }, [user?.role, user?.roles]);
  
  // Show loading state
  if (isLoading) {
    return <>{loadingFallback}</>;
  }
  
  // Check authentication
  if (!isAuthenticated) {
    if (!noRedirect && redirectTo && typeof window !== 'undefined') {
      window.location.href = redirectTo;
    }
    return <>{fallback}</>;
  }
  
  // Prepare required roles list
  const roleList = Array.isArray(roles) ? roles : [roles];
  
  // Check role access
  const hasAccess = checkRoleAccess(userRoles, roleList, match, isSuperAdmin);
  
  // Development warning
  if (process.env.NODE_ENV === 'development' && !hasAccess) {
    console.warn(`[RequireRole] Access denied. Required roles: ${roleList.join(', ')}. User roles: ${userRoles.join(', ') || 'none'}`);
  }
  
  if (!hasAccess) {
    if (!noRedirect && redirectTo && typeof window !== 'undefined') {
      window.location.href = redirectTo;
    }
    return <>{fallback}</>;
  }
  
  return <>{children}</>;
};

// ==================== Higher-Order Component ====================

/**
 * Higher-order component for requiring role
 * Wraps a component with RequireRole guard
 * 
 * @example
 * const AdminDashboard = withRole(AdminComponent, 'admin');
 * const SellerArea = withRole(SellerComponent, ['seller', 'admin']);
 */
export const withRole = <P extends object>(
  Component: React.ComponentType<P>,
  roles: string | string[],
  options?: Omit<RequireRoleProps, 'children' | 'roles'>
): React.FC<P> => {
  const WrappedComponent: React.FC<P> = (props) => (
    <RequireRole roles={roles} {...options}>
      <Component {...props} />
    </RequireRole>
  );
  
  WrappedComponent.displayName = `withRole(${Component.displayName || Component.name || 'Component'})`;
  
  return WrappedComponent;
};

// ==================== Conditional Render Component ====================

/**
 * Component that conditionally renders based on role
 * Doesn't redirect, just shows/hides content
 * Useful for buttons and UI elements
 * 
 * @example
 * <IfRole role="admin">
 *   <AdminButton />
 * </IfRole>
 */
export const IfRole: React.FC<{
  roles: string | string[];
  match?: 'all' | 'any';
  fallback?: React.ReactNode;
  children: React.ReactNode;
}> = ({ roles, match = 'any', fallback = null, children }) => {
  const { user, isSuperAdmin } = usePermission();
  
  const userRoles = React.useMemo(() => {
    const role = user?.role;
    if (user?.roles && Array.isArray(user.roles)) {
      return user.roles;
    }
    return role ? [role] : [];
  }, [user?.role, user?.roles]);
  
  const roleList = Array.isArray(roles) ? roles : [roles];
  
  const hasAccess = checkRoleAccess(userRoles, roleList, match, isSuperAdmin);
  
  return <>{hasAccess ? children : fallback}</>;
};

// ==================== Type Exports ====================

export type { RequireRoleProps };
