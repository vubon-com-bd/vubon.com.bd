/**
 * usePermission Hook - Permission abstraction for UI
 * IMPORTANT: This is for UX optimization ONLY
 * Real authorization MUST be enforced on backend
 * 
 * @module shared-auth/src/react/usePermission
 * 
 * RULES:
 * ✅ ONLY UI permission helpers - NO security boundary
 * ✅ Real authorization MUST be on backend
 * ✅ Pure React hooks for permission checking
 * ✅ TypeScript strict
 */

import { useMemo } from 'react';
import { useAuthContext } from './AuthContext';
import type { AuthContextValue } from './AuthContext';

// ==================== Types ====================

export interface UsePermissionReturn {
  /** Check if user has a specific permission */
  hasPermission: (permission: string) => boolean;
  /** Check if user has any of the specified permissions */
  hasAnyPermission: (permissions: string[]) => boolean;
  /** Check if user has all of the specified permissions */
  hasAllPermissions: (permissions: string[]) => boolean;
  /** Check if user has a specific role (or any of the roles) */
  hasRole: (role: string | string[]) => boolean;
  /** Check if user has any of the specified roles */
  hasAnyRole: (roles: string[]) => boolean;
  /** Check if user has all of the specified roles */
  hasAllRoles: (roles: string[]) => boolean;
  /** Check if user is super admin (bypasses all permission checks) */
  isSuperAdmin: boolean;
  /** Check if user is admin (including super admin) */
  isAdmin: boolean;
  /** Check if user is seller/vendor */
  isSeller: boolean;
  /** Check if user is customer */
  isCustomer: boolean;
  /** ⚠️ উন্নতি: Check if user is guest (unauthenticated) */
  isGuest: boolean;
  /** ⚠️ উন্নতি: Check if user is delivery agent */
  isDeliveryAgent: boolean;
  /** ⚠️ উন্নতি: Check if user is support agent */
  isSupportAgent: boolean;
}

// ==================== Helper Functions ====================

/** ⚠️ উন্নতি: নরমালাইজেশন হেল্পার (কেস-ইনসেনসিটিভ চেকের জন্য) */
const normalizeRole = (role: string): string => role.toLowerCase().trim();

// ==================== Main Permission Hook ====================

/**
 * Hook for checking permissions (UX optimization only)
 * WARNING: Do NOT use this for security-sensitive operations
 * Real authorization MUST be enforced on backend
 * 
 * @returns Permission helper functions
 * 
 * @example
 * const { hasPermission, hasRole, isAdmin } = usePermission();
 * 
 * // Conditional rendering based on permission
 * {hasPermission('product:create') && <CreateProductButton />}
 * 
 * // Role-based UI
 * {isAdmin && <AdminPanel />}
 */
export const usePermission = (): UsePermissionReturn => {
  const { hasPermission: authHasPermission, hasRole: authHasRole, hasAnyRole: authHasAnyRole, hasAllRoles: authHasAllRoles, user } = useAuthContext();
  
  const hasAnyPermission = (permissions: string[]): boolean => {
    return permissions.some((p) => authHasPermission(p));
  };
  
  const hasAllPermissions = (permissions: string[]): boolean => {
    return permissions.every((p) => authHasPermission(p));
  };
  
  /** ⚠️ উন্নতি: মেমোয়াইজড রোল ভ্যালু – বারবার রিকম্পিউট এড়ায় */
  const roleInfo = useMemo(() => {
    const userRole = user?.role || 'guest';
    const normalizedRole = normalizeRole(userRole);
    
    return {
      userRole,
      normalizedRole,
      isSuperAdmin: normalizedRole === 'super_admin',
      isAdmin: normalizedRole === 'admin' || normalizedRole === 'super_admin',
      isSeller: normalizedRole === 'seller' || normalizedRole === 'vendor',
      isCustomer: normalizedRole === 'customer' || normalizedRole === 'premium_customer',
      isGuest: normalizedRole === 'guest' || !user,
      isDeliveryAgent: normalizedRole === 'delivery_agent' || normalizedRole === 'delivery_manager',
      isSupportAgent: normalizedRole === 'support_agent' || normalizedRole === 'support_supervisor',
    };
  }, [user?.role]);
  
  return {
    hasPermission: authHasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole: authHasRole,
    hasAnyRole: authHasAnyRole,
    hasAllRoles: authHasAllRoles,
    ...roleInfo,
  };
};

// ==================== Individual Permission Hooks ====================

/**
 * Hook for checking a single permission (UX optimization only)
 * 
 * @param permission - Permission string to check (e.g., 'product:create')
 * @returns True if user has the permission
 * 
 * @example
 * const canCreateProduct = useHasPermission('product:create');
 */
export const useHasPermission = (permission: string): boolean => {
  const { hasPermission } = useAuthContext();
  return hasPermission(permission);
};

/**
 * Hook for checking multiple permissions (memoized for performance)
 * 
 * @param permissions - Array of permissions to check
 * @returns Record of permission check results
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

/**
 * Hook for checking any of the specified permissions
 * 
 * @param permissions - Array of permissions to check
 * @returns True if user has any of the permissions
 * 
 * @example
 * const canManageProducts = useHasAnyPermission(['product:create', 'product:update', 'product:delete']);
 */
export const useHasAnyPermission = (permissions: string[]): boolean => {
  const { hasPermission } = useAuthContext();
  return permissions.some((p) => hasPermission(p));
};

/**
 * Hook for checking all of the specified permissions
 * 
 * @param permissions - Array of permissions to check
 * @returns True if user has all of the permissions
 */
export const useHasAllPermissions = (permissions: string[]): boolean => {
  const { hasPermission } = useAuthContext();
  return permissions.every((p) => hasPermission(p));
};

/**
 * Hook for checking a role (UX optimization only)
 * 
 * @param role - Single role or array of roles to check
 * @returns True if user has the specified role
 * 
 * @example
 * const isAdmin = useHasRole('admin');
 * const isAdminOrSeller = useHasRole(['admin', 'seller']);
 */
export const useHasRole = (role: string | string[]): boolean => {
  const { hasRole } = useAuthContext();
  return hasRole(role);
};

/**
 * Hook for checking any of the specified roles
 * 
 * @param roles - Array of roles to check
 * @returns True if user has any of the roles
 */
export const useHasAnyRole = (roles: string[]): boolean => {
  const { hasAnyRole } = useAuthContext();
  return hasAnyRole(roles);
};

/**
 * Hook for checking all of the specified roles
 * 
 * @param roles - Array of roles to check
 * @returns True if user has all of the roles
 */
export const useHasAllRoles = (roles: string[]): boolean => {
  const { hasAllRoles } = useAuthContext();
  return hasAllRoles(roles);
};

// ==================== Role-specific Hooks ====================

/**
 * Hook for checking if user is super admin
 */
export const useIsSuperAdmin = (): boolean => {
  const { user } = useAuthContext();
  return user?.role === 'super_admin';
};

/**
 * Hook for checking if user is admin (including super admin)
 */
export const useIsAdmin = (): boolean => {
  const { user } = useAuthContext();
  const role = user?.role;
  return role === 'admin' || role === 'super_admin';
};

/**
 * Hook for checking if user is seller/vendor
 */
export const useIsSeller = (): boolean => {
  const { user } = useAuthContext();
  const role = user?.role;
  return role === 'seller' || role === 'vendor';
};

/**
 * Hook for checking if user is customer
 */
export const useIsCustomer = (): boolean => {
  const { user } = useAuthContext();
  const role = user?.role;
  return role === 'customer' || role === 'premium_customer';
};

/**
 * ⚠️ উন্নতি: Hook for checking if user is guest (unauthenticated)
 */
export const useIsGuest = (): boolean => {
  const { user } = useAuthContext();
  return !user || user.role === 'guest';
};

/**
 * ⚠️ উন্নতি: Hook for checking if user is delivery agent
 */
export const useIsDeliveryAgent = (): boolean => {
  const { user } = useAuthContext();
  const role = user?.role;
  return role === 'delivery_agent' || role === 'delivery_manager';
};

/**
 * ⚠️ উন্নতি: Hook for checking if user is support agent
 */
export const useIsSupportAgent = (): boolean => {
  const { user } = useAuthContext();
  const role = user?.role;
  return role === 'support_agent' || role === 'support_supervisor';
};

// ==================== Type Exports ====================

export type { UsePermissionReturn };
