/**
 * Admin Role Constants
 * Admin role definitions, hierarchies, and permissions
 */

import { ADMIN_PERMISSIONS } from './admin.constants';

/**
 * Admin roles with hierarchical levels
 */
export const ADMIN_ROLES = {
  /** Super Admin - Full system access */
  SUPER_ADMIN: 'super_admin',
  /** Admin - Administrative access */
  ADMIN: 'admin',
  /** Manager - Management access */
  MANAGER: 'manager',
  /** Moderator - Content moderation access */
  MODERATOR: 'moderator',
  /** Editor - Content editing access */
  EDITOR: 'editor',
  /** Viewer - Read-only access */
  VIEWER: 'viewer',
  /** Support Agent - Customer support access */
  SUPPORT_AGENT: 'support_agent',
  /** Developer - Technical access */
  DEVELOPER: 'developer',
  /** DevOps - System operations access */
  DEVOPS: 'devops',
  /** Security Admin - Security management access */
  SECURITY_ADMIN: 'security_admin',
  /** Compliance Officer - Compliance management access */
  COMPLIANCE_OFFICER: 'compliance_officer',
  /** Auditor - Audit access */
  AUDITOR: 'auditor',
  /** Analyst - Analytics access */
  ANALYST: 'analyst',
  /** Accountant - Financial access */
  ACCOUNTANT: 'accountant',
  /** HR Admin - Human resources access */
  HR_ADMIN: 'hr_admin',
  /** Vendor Manager - Vendor management access */
  VENDOR_MANAGER: 'vendor_manager',
  /** Product Manager - Product management access */
  PRODUCT_MANAGER: 'product_manager',
  /** Order Manager - Order management access */
  ORDER_MANAGER: 'order_manager',
  /** Payment Manager - Payment management access */
  PAYMENT_MANAGER: 'payment_manager',
} as const;

/**
 * Admin role hierarchy (higher number = higher authority)
 */
export const ADMIN_ROLE_HIERARCHY: Record<string, number> = {
  [ADMIN_ROLES.SUPER_ADMIN]: 100,
  [ADMIN_ROLES.ADMIN]: 90,
  [ADMIN_ROLES.MANAGER]: 80,
  [ADMIN_ROLES.SECURITY_ADMIN]: 75,
  [ADMIN_ROLES.COMPLIANCE_OFFICER]: 70,
  [ADMIN_ROLES.DEVOPS]: 65,
  [ADMIN_ROLES.DEVELOPER]: 60,
  [ADMIN_ROLES.MODERATOR]: 50,
  [ADMIN_ROLES.EDITOR]: 40,
  [ADMIN_ROLES.PRODUCT_MANAGER]: 45,
  [ADMIN_ROLES.ORDER_MANAGER]: 45,
  [ADMIN_ROLES.PAYMENT_MANAGER]: 45,
  [ADMIN_ROLES.VENDOR_MANAGER]: 45,
  [ADMIN_ROLES.SUPPORT_AGENT]: 35,
  [ADMIN_ROLES.AUDITOR]: 30,
  [ADMIN_ROLES.ANALYST]: 25,
  [ADMIN_ROLES.ACCOUNTANT]: 25,
  [ADMIN_ROLES.HR_ADMIN]: 25,
  [ADMIN_ROLES.VIEWER]: 10,
};

/**
 * Admin role labels
 */
export const ADMIN_ROLE_LABEL: Record<string, string> = {
  [ADMIN_ROLES.SUPER_ADMIN]: 'Super Admin',
  [ADMIN_ROLES.ADMIN]: 'Admin',
  [ADMIN_ROLES.MANAGER]: 'Manager',
  [ADMIN_ROLES.MODERATOR]: 'Moderator',
  [ADMIN_ROLES.EDITOR]: 'Editor',
  [ADMIN_ROLES.VIEWER]: 'Viewer',
  [ADMIN_ROLES.SUPPORT_AGENT]: 'Support Agent',
  [ADMIN_ROLES.DEVELOPER]: 'Developer',
  [ADMIN_ROLES.DEVOPS]: 'DevOps',
  [ADMIN_ROLES.SECURITY_ADMIN]: 'Security Admin',
  [ADMIN_ROLES.COMPLIANCE_OFFICER]: 'Compliance Officer',
  [ADMIN_ROLES.AUDITOR]: 'Auditor',
  [ADMIN_ROLES.ANALYST]: 'Analyst',
  [ADMIN_ROLES.ACCOUNTANT]: 'Accountant',
  [ADMIN_ROLES.HR_ADMIN]: 'HR Admin',
  [ADMIN_ROLES.VENDOR_MANAGER]: 'Vendor Manager',
  [ADMIN_ROLES.PRODUCT_MANAGER]: 'Product Manager',
  [ADMIN_ROLES.ORDER_MANAGER]: 'Order Manager',
  [ADMIN_ROLES.PAYMENT_MANAGER]: 'Payment Manager',
};

/**
 * Admin role colors
 */
export const ADMIN_ROLE_COLOR: Record<string, string> = {
  [ADMIN_ROLES.SUPER_ADMIN]: '#FF0000',
  [ADMIN_ROLES.ADMIN]: '#FF6B00',
  [ADMIN_ROLES.MANAGER]: '#FFA500',
  [ADMIN_ROLES.SECURITY_ADMIN]: '#8B0000',
  [ADMIN_ROLES.COMPLIANCE_OFFICER]: '#800080',
  [ADMIN_ROLES.DEVOPS]: '#2F4F4F',
  [ADMIN_ROLES.DEVELOPER]: '#006400',
  [ADMIN_ROLES.MODERATOR]: '#1E90FF',
  [ADMIN_ROLES.EDITOR]: '#4169E1',
  [ADMIN_ROLES.PRODUCT_MANAGER]: '#FF8C00',
  [ADMIN_ROLES.ORDER_MANAGER]: '#20B2AA',
  [ADMIN_ROLES.PAYMENT_MANAGER]: '#2E8B57',
  [ADMIN_ROLES.VENDOR_MANAGER]: '#9370DB',
  [ADMIN_ROLES.SUPPORT_AGENT]: '#48D1CC',
  [ADMIN_ROLES.AUDITOR]: '#708090',
  [ADMIN_ROLES.ANALYST]: '#4682B4',
  [ADMIN_ROLES.ACCOUNTANT]: '#556B2F',
  [ADMIN_ROLES.HR_ADMIN]: '#8B4513',
  [ADMIN_ROLES.VIEWER]: '#A9A9A9',
};

/**
 * Role-specific permissions mapping
 */
export const ADMIN_ROLE_PERMISSIONS: Record<string, string[]> = {
  // Super Admin has all permissions
  [ADMIN_ROLES.SUPER_ADMIN]: Object.values(ADMIN_PERMISSIONS),

  // Admin has most permissions except system maintenance
  [ADMIN_ROLES.ADMIN]: [
    ADMIN_PERMISSIONS.USER_VIEW,
    ADMIN_PERMISSIONS.USER_CREATE,
    ADMIN_PERMISSIONS.USER_UPDATE,
    ADMIN_PERMISSIONS.USER_DELETE,
    ADMIN_PERMISSIONS.USER_SUSPEND,
    ADMIN_PERMISSIONS.USER_VERIFY,
    ADMIN_PERMISSIONS.ADMIN_VIEW,
    ADMIN_PERMISSIONS.ADMIN_CREATE,
    ADMIN_PERMISSIONS.ADMIN_UPDATE,
    ADMIN_PERMISSIONS.VENDOR_VIEW,
    ADMIN_PERMISSIONS.VENDOR_CREATE,
    ADMIN_PERMISSIONS.VENDOR_UPDATE,
    ADMIN_PERMISSIONS.VENDOR_VERIFY,
    ADMIN_PERMISSIONS.VENDOR_SUSPEND,
    ADMIN_PERMISSIONS.PRODUCT_VIEW,
    ADMIN_PERMISSIONS.PRODUCT_CREATE,
    ADMIN_PERMISSIONS.PRODUCT_UPDATE,
    ADMIN_PERMISSIONS.PRODUCT_APPROVE,
    ADMIN_PERMISSIONS.PRODUCT_REJECT,
    ADMIN_PERMISSIONS.ORDER_VIEW,
    ADMIN_PERMISSIONS.ORDER_UPDATE,
    ADMIN_PERMISSIONS.ORDER_CANCEL,
    ADMIN_PERMISSIONS.ORDER_REFUND,
    ADMIN_PERMISSIONS.PAYMENT_VIEW,
    ADMIN_PERMISSIONS.PAYMENT_REFUND,
    ADMIN_PERMISSIONS.SETTINGS_VIEW,
    ADMIN_PERMISSIONS.SETTINGS_UPDATE,
    ADMIN_PERMISSIONS.REPORT_VIEW,
    ADMIN_PERMISSIONS.REPORT_GENERATE,
    ADMIN_PERMISSIONS.ANALYTICS_VIEW,
  ],

  // Manager has department-level permissions
  [ADMIN_ROLES.MANAGER]: [
    ADMIN_PERMISSIONS.USER_VIEW,
    ADMIN_PERMISSIONS.USER_UPDATE,
    ADMIN_PERMISSIONS.VENDOR_VIEW,
    ADMIN_PERMISSIONS.PRODUCT_VIEW,
    ADMIN_PERMISSIONS.PRODUCT_UPDATE,
    ADMIN_PERMISSIONS.ORDER_VIEW,
    ADMIN_PERMISSIONS.ORDER_UPDATE,
    ADMIN_PERMISSIONS.REPORT_VIEW,
    ADMIN_PERMISSIONS.REPORT_GENERATE,
  ],

  // Moderator has content moderation permissions
  [ADMIN_ROLES.MODERATOR]: [
    ADMIN_PERMISSIONS.USER_VIEW,
    ADMIN_PERMISSIONS.USER_SUSPEND,
    ADMIN_PERMISSIONS.PRODUCT_VIEW,
    ADMIN_PERMISSIONS.PRODUCT_APPROVE,
    ADMIN_PERMISSIONS.PRODUCT_REJECT,
    ADMIN_PERMISSIONS.ORDER_VIEW,
    ADMIN_PERMISSIONS.REPORT_VIEW,
  ],

  // Viewer has read-only permissions
  [ADMIN_ROLES.VIEWER]: [
    ADMIN_PERMISSIONS.USER_VIEW,
    ADMIN_PERMISSIONS.VENDOR_VIEW,
    ADMIN_PERMISSIONS.PRODUCT_VIEW,
    ADMIN_PERMISSIONS.ORDER_VIEW,
    ADMIN_PERMISSIONS.PAYMENT_VIEW,
    ADMIN_PERMISSIONS.REPORT_VIEW,
    ADMIN_PERMISSIONS.ANALYTICS_VIEW,
  ],
};

/**
 * Check if role has higher authority than another role
 */
export function hasHigherAuthority(
  role1: keyof typeof ADMIN_ROLES,
  role2: keyof typeof ADMIN_ROLES
): boolean {
  const hierarchy1 = ADMIN_ROLE_HIERARCHY[ADMIN_ROLES[role1]] || 0;
  const hierarchy2 = ADMIN_ROLE_HIERARCHY[ADMIN_ROLES[role2]] || 0;
  return hierarchy1 > hierarchy2;
}

/**
 * Check if role has equal or higher authority
 */
export function hasEqualOrHigherAuthority(
  role1: keyof typeof ADMIN_ROLES,
  role2: keyof typeof ADMIN_ROLES
): boolean {
  const hierarchy1 = ADMIN_ROLE_HIERARCHY[ADMIN_ROLES[role1]] || 0;
  const hierarchy2 = ADMIN_ROLE_HIERARCHY[ADMIN_ROLES[role2]] || 0;
  return hierarchy1 >= hierarchy2;
}

/**
 * Get role hierarchy level
 */
export function getRoleHierarchy(role: keyof typeof ADMIN_ROLES): number {
  return ADMIN_ROLE_HIERARCHY[ADMIN_ROLES[role]] || 0;
}

/**
 * Get role label
 */
export function getRoleLabel(role: keyof typeof ADMIN_ROLES): string {
  return ADMIN_ROLE_LABEL[ADMIN_ROLES[role]] || role;
}

/**
 * Get role color
 */
export function getRoleColor(role: keyof typeof ADMIN_ROLES): string {
  return ADMIN_ROLE_COLOR[ADMIN_ROLES[role]] || '#6C757D';
}

/**
 * Get permissions for a role
 */
export function getRolePermissions(role: keyof typeof ADMIN_ROLES): string[] {
  return ADMIN_ROLE_PERMISSIONS[ADMIN_ROLES[role]] || [];
}

/**
 * Check if role has a specific permission
 */
export function roleHasPermission(role: keyof typeof ADMIN_ROLES, permission: string): boolean {
  const permissions = getRolePermissions(role);
  return permissions.includes(permission);
}

/**
 * Check if role has any of the permissions
 */
export function roleHasAnyPermission(
  role: keyof typeof ADMIN_ROLES,
  permissions: string[]
): boolean {
  const rolePermissions = getRolePermissions(role);
  return permissions.some((p) => rolePermissions.includes(p));
}

/**
 * Check if role has all permissions
 */
export function roleHasAllPermissions(
  role: keyof typeof ADMIN_ROLES,
  permissions: string[]
): boolean {
  const rolePermissions = getRolePermissions(role);
  return permissions.every((p) => rolePermissions.includes(p));
}

/**
 * Get roles that have a specific permission
 */
export function getRolesWithPermission(permission: string): string[] {
  return Object.keys(ADMIN_ROLE_PERMISSIONS).filter((role) =>
    ADMIN_ROLE_PERMISSIONS[role].includes(permission)
  );
}

/**
 * Get roles by hierarchy level range
 */
export function getRolesByHierarchyRange(minLevel: number, maxLevel: number): string[] {
  return Object.keys(ADMIN_ROLE_HIERARCHY).filter(
    (role) => ADMIN_ROLE_HIERARCHY[role] >= minLevel && ADMIN_ROLE_HIERARCHY[role] <= maxLevel
  );
}

/**
 * Get all role labels for dropdown
 */
export function getRoleDropdownOptions(): Array<{
  value: string;
  label: string;
}> {
  return Object.values(ADMIN_ROLES).map((role) => ({
    value: role,
    label: ADMIN_ROLE_LABEL[role] || role,
  }));
}
