/**
 * Role-Based Access Control (RBAC)
 * @module shared-constants/common/rbac
 *
 * Admin-এর single source of truth।
 * এই ফাইলই বলে দেয় কোন role কী করতে পারবে।
 */

import { ROLE, type RoleType } from './role.constants';
import { PERMISSION, type PermissionType } from './permission.constants';

/**
 * Role → Permission mapping
 * প্রতিটা role কী কী permission পাবে।
 */
export const ROLE_PERMISSIONS: Record<RoleType, readonly PermissionType[]> = {
  // ═══════════════════════════════════════
  // 🔴 Admin Roles
  // ═══════════════════════════════════════

  [ROLE.SUPER_ADMIN]: [PERMISSION.ADMIN_MANAGE],

  [ROLE.ADMIN]: [
    PERMISSION.USER_VIEW,
    PERMISSION.USER_CREATE,
    PERMISSION.USER_UPDATE,
    PERMISSION.USER_DELETE,
    PERMISSION.PRODUCT_VIEW,
    PERMISSION.PRODUCT_CREATE,
    PERMISSION.PRODUCT_UPDATE,
    PERMISSION.PRODUCT_DELETE,
    PERMISSION.ORDER_VIEW,
    PERMISSION.ORDER_UPDATE,
    PERMISSION.ORDER_CANCEL,
    PERMISSION.PAYMENT_VIEW,
    PERMISSION.PAYMENT_REFUND,
    PERMISSION.REPORT_VIEW,
    PERMISSION.REPORT_EXPORT,
  ],

  [ROLE.MODERATOR]: [
    PERMISSION.USER_VIEW,
    PERMISSION.PRODUCT_VIEW,
    PERMISSION.ORDER_VIEW,
    PERMISSION.SUPPORT_VIEW,
  ],

  // ═══════════════════════════════════════
  // 🟢 Business Roles
  // ═══════════════════════════════════════

  [ROLE.VENDOR]: [
    PERMISSION.PRODUCT_VIEW,
    PERMISSION.PRODUCT_CREATE,
    PERMISSION.PRODUCT_UPDATE,
    PERMISSION.ORDER_VIEW,
    PERMISSION.REPORT_VIEW,
  ],

  [ROLE.CUSTOMER]: [
    PERMISSION.PRODUCT_VIEW,
    PERMISSION.ORDER_VIEW,
    PERMISSION.ORDER_CREATE,
    PERMISSION.CART_VIEW,
    PERMISSION.CART_MANAGE,
  ],

  [ROLE.GUEST]: [PERMISSION.PRODUCT_VIEW],

  [ROLE.SUPPORT_AGENT]: [PERMISSION.SUPPORT_VIEW, PERMISSION.SUPPORT_MANAGE, PERMISSION.ORDER_VIEW],

  [ROLE.SUPPORT_MANAGER]: [
    PERMISSION.SUPPORT_VIEW,
    PERMISSION.SUPPORT_MANAGE,
    PERMISSION.ORDER_VIEW,
    PERMISSION.USER_VIEW,
  ],

  [ROLE.LOGISTICS_MANAGER]: [
    PERMISSION.LOGISTICS_VIEW,
    PERMISSION.LOGISTICS_MANAGE,
    PERMISSION.ORDER_VIEW,
  ],

  [ROLE.LOGISTICS_AGENT]: [PERMISSION.LOGISTICS_VIEW, PERMISSION.ORDER_VIEW],

  [ROLE.DELIVERY_DRIVER]: [PERMISSION.LOGISTICS_VIEW],

  [ROLE.WAREHOUSE_MANAGER]: [PERMISSION.LOGISTICS_VIEW, PERMISSION.LOGISTICS_MANAGE],

  [ROLE.VENDOR_MANAGER]: [
    PERMISSION.PRODUCT_VIEW,
    PERMISSION.PRODUCT_UPDATE,
    PERMISSION.ORDER_VIEW,
  ],

  [ROLE.VENDOR_STAFF]: [PERMISSION.PRODUCT_VIEW, PERMISSION.ORDER_VIEW],
} as const;

/**
 * Role hierarchy
 * super_admin > admin > moderator > vendor > customer > guest
 */
export const ROLE_HIERARCHY: Record<RoleType, number> = {
  [ROLE.SUPER_ADMIN]: 100,
  [ROLE.ADMIN]: 90,
  [ROLE.MODERATOR]: 70,
  [ROLE.SUPPORT_MANAGER]: 60,
  [ROLE.SUPPORT_AGENT]: 55,
  [ROLE.LOGISTICS_MANAGER]: 55,
  [ROLE.LOGISTICS_AGENT]: 50,
  [ROLE.WAREHOUSE_MANAGER]: 50,
  [ROLE.DELIVERY_DRIVER]: 45,
  [ROLE.VENDOR]: 20,
  [ROLE.VENDOR_MANAGER]: 25,
  [ROLE.VENDOR_STAFF]: 22,
  [ROLE.CUSTOMER]: 1,
  [ROLE.GUEST]: 0,
} as const;

/**
 * Check if a role has a specific permission
 */
export function hasPermission(role: RoleType, permission: PermissionType): boolean {
  const permissions = ROLE_PERMISSIONS[role] ?? [];
  return permissions.includes(permission);
}

/**
 * Check if user role is higher or equal to required role
 */
export function hasHigherOrEqualRole(userRole: RoleType, requiredRole: RoleType): boolean {
  return ROLE_HIERARCHY[userRole] >= ROLE_HIERARCHY[requiredRole];
}

/**
 * Get all permissions for a role
 */
export function getPermissionsForRole(role: RoleType): readonly PermissionType[] {
  return ROLE_PERMISSIONS[role] ?? [];
}

export type RolePermissionsType = typeof ROLE_PERMISSIONS;
export type RoleHierarchyType = typeof ROLE_HIERARCHY;
