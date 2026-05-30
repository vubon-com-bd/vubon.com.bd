/**
 * Require Permission Guard - Permission-based route protection
 * UX optimization ONLY - Backend MUST enforce authorization
 *
 * @module shared-auth/src/guards/RequirePermission
 *
 * RULES:
 * ✅ ONLY UI permission guard - NOT a security boundary
 * ✅ Backend MUST enforce authorization
 * ✅ Pure React guard component
 * ✅ TypeScript strict
 */

import React from 'react';
import { usePermission } from '../react/usePermission';
import { RequireAuth } from './RequireAuth';

// ==================== Types ====================

export interface RequirePermissionProps {
  children: React.ReactNode;
  permissions: string | string[];
  match?: 'all' | 'any';
  fallback?: React.ReactNode;
  redirectTo?: string;
  loadingFallback?: React.ReactNode;
  /**
   * If true, doesn't redirect but just shows fallback
   * Useful for hiding UI elements without redirect
   */
  noRedirect?: boolean;
  /**
   * Custom message for access denied (shown in development)
   */
  deniedMessage?: string;
  /**
   * If true, shows denied message as console.error instead of console.warn
   */
  useErrorLevel?: boolean;
}

// ==================== Helper Functions ====================

const logAccessDenied = (message: string, useErrorLevel: boolean): void => {
  if (process.env.NODE_ENV !== 'development') return;

  if (useErrorLevel) {
    console.error(`[RequirePermission] Access denied: ${message}`);
  } else {
    console.warn(`[RequirePermission] Access denied: ${message}`);
  }
};

// ==================== Guard Component ====================

/**
 * Guard component that requires specific permission(s)
 * For UI optimization only - NOT a security boundary
 *
 * WARNING: This does NOT enforce authorization.
 * Backend MUST verify permissions for all sensitive operations.
 *
 * @example
 * // Require any of the specified permissions
 * <RequirePermission permissions={['product:create', 'product:update']}>
 *   <AdminPanel />
 * </RequirePermission>
 *
 * @example
 * // Require all specified permissions
 * <RequirePermission permissions={['user:read', 'user:update']} match="all">
 *   <UserManagement />
 * </RequirePermission>
 *
 * @example
 * // Show fallback without redirect
 * <RequirePermission permissions="admin:access" fallback={<AccessDenied />} noRedirect>
 *   <AdminArea />
 * </RequirePermission>
 */
export const RequirePermission: React.FC<RequirePermissionProps> = ({
  children,
  permissions,
  match = 'any',
  fallback = null,
  redirectTo,
  loadingFallback = null,
  noRedirect = false,
  deniedMessage,
  useErrorLevel = false,
}) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, isSuperAdmin } = usePermission();

  // Memoized access check for performance
  const hasAccess = React.useMemo(() => {
    // Super admin has access to everything (for UI)
    if (isSuperAdmin) return true;

    const perms = Array.isArray(permissions) ? permissions : [permissions];

    if (perms.length === 0) {
      logAccessDenied('No permissions specified - denying access', useErrorLevel);
      return false;
    }

    if (match === 'all') {
      return hasAllPermissions(perms);
    }
    return hasAnyPermission(perms);
  }, [permissions, match, hasAllPermissions, hasAnyPermission, isSuperAdmin, useErrorLevel]);

  // Development warning
  if (!hasAccess && deniedMessage) {
    logAccessDenied(deniedMessage, useErrorLevel);
  }

  // Permission check passed - render children with auth guard
  const renderChildren = hasAccess ? <>{children}</> : <>{fallback}</>;

  // If no redirect, just show auth guard without redirect
  if (noRedirect) {
    return (
      <RequireAuth redirectTo={redirectTo} loadingFallback={loadingFallback}>
        {renderChildren}
      </RequireAuth>
    );
  }

  return (
    <RequireAuth redirectTo={redirectTo} loadingFallback={loadingFallback}>
      {renderChildren}
    </RequireAuth>
  );
};

/**
 * Higher-order component for requiring permission
 * Wraps a component with RequirePermission guard
 *
 * @example
 * const AdminPanel = withPermission(AdminComponent, 'admin:access');
 * const ProductManager = withPermission(ProductComponent, ['product:create', 'product:update'], { match: 'any' });
 */
export const withPermission = <P extends object>(
  Component: React.ComponentType<P>,
  permissions: string | string[],
  options?: Omit<RequirePermissionProps, 'children' | 'permissions'>
): React.FC<P> => {
  const displayName = Component.displayName || Component.name || 'Component';

  const WrappedComponent: React.FC<P> = (props) => (
    <RequirePermission permissions={permissions} {...options}>
      <Component {...props} />
    </RequirePermission>
  );

  WrappedComponent.displayName = `withPermission(${displayName})`;

  return WrappedComponent;
};

/**
 * Component that conditionally renders based on permission
 * Doesn't redirect, just shows/hides content
 * Useful for buttons and UI elements
 *
 * @example
 * <Can permissions="product:create">
 *   <CreateProductButton />
 * </Can>
 */
export const Can: React.FC<{
  permissions: string | string[];
  match?: 'all' | 'any';
  fallback?: React.ReactNode;
  children: React.ReactNode;
}> = ({ permissions, match = 'any', fallback = null, children }) => {
  const { hasPermission, hasAnyPermission, hasAllPermissions, isSuperAdmin } = usePermission();

  const hasAccess = React.useMemo(() => {
    if (isSuperAdmin) return true;

    const perms = Array.isArray(permissions) ? permissions : [permissions];

    if (perms.length === 0) return false;

    if (match === 'all') {
      return hasAllPermissions(perms);
    }
    return hasAnyPermission(perms);
  }, [permissions, match, hasAllPermissions, hasAnyPermission, isSuperAdmin]);

  return <>{hasAccess ? children : fallback}</>;
};

/**
 * Component that conditionally renders based on role
 * Doesn't redirect, just shows/hides content
 *
 * @example
 * <CanRole role="admin">
 *   <AdminButton />
 * </CanRole>
 */
export const CanRole: React.FC<{
  role: string | string[];
  match?: 'all' | 'any';
  fallback?: React.ReactNode;
  children: React.ReactNode;
}> = ({ role, match = 'any', fallback = null, children }) => {
  const { hasRole, hasAnyRole, hasAllRoles, isSuperAdmin } = usePermission();

  const hasAccess = React.useMemo(() => {
    if (isSuperAdmin) return true;

    const roles = Array.isArray(role) ? role : [role];

    if (roles.length === 0) return false;

    if (match === 'all') {
      return hasAllRoles(roles);
    }
    return hasAnyRole(roles);
  }, [role, match, hasAllRoles, hasAnyRole, isSuperAdmin]);

  return <>{hasAccess ? children : fallback}</>;
};

// ==================== Optimized Components ====================

/**
 * Memoized version of Can component to prevent unnecessary re-renders
 */
export const CanMemo = React.memo(Can);

/**
 * Memoized version of CanRole component to prevent unnecessary re-renders
 */
export const CanRoleMemo = React.memo(CanRole);

// ==================== Type Exports ====================

export type { RequirePermissionProps };
