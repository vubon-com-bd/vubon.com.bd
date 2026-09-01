/**
 * Admin Role Types
 * Admin role definitions, hierarchies, and permission mappings
 */

import type { AdminPermission } from './admin-permission.types';

/**
 * Admin role type
 * Based on ADMIN_ROLES from constants
 */
export type AdminRole =
  | 'super_admin'
  | 'admin'
  | 'manager'
  | 'moderator'
  | 'editor'
  | 'viewer'
  | 'support_agent'
  | 'developer'
  | 'devops'
  | 'security_admin'
  | 'compliance_officer'
  | 'auditor'
  | 'analyst'
  | 'accountant'
  | 'hr_admin'
  | 'vendor_manager'
  | 'product_manager'
  | 'order_manager'
  | 'payment_manager';

/**
 * Admin role hierarchy level
 * Higher number = higher authority
 */
export type AdminRoleHierarchy = number;

/**
 * Admin role label mapping
 */
export type AdminRoleLabel = string;

/**
 * Admin role color mapping
 */
export type AdminRoleColor = string;

/**
 * Admin role with hierarchy information
 */
export interface AdminRoleWithHierarchy {
  /** Role name */
  role: AdminRole;
  /** Hierarchy level (higher = more authority) */
  hierarchy: AdminRoleHierarchy;
  /** Display label */
  label: AdminRoleLabel;
  /** Color for UI */
  color: AdminRoleColor;
  /** Permissions associated with this role */
  permissions: AdminPermission[];
}

/**
 * Admin role permissions mapping
 * Maps roles to their permission sets
 */
export interface AdminRolePermissions {
  /** Role name */
  role: AdminRole;
  /** List of permission strings for this role */
  permissions: string[];
}

/**
 * Admin role filter parameters
 */
export interface AdminRoleFilterParams {
  /** Filter by role names */
  roles?: AdminRole[];
  /** Filter by minimum hierarchy level */
  minHierarchy?: AdminRoleHierarchy;
  /** Filter by maximum hierarchy level */
  maxHierarchy?: AdminRoleHierarchy;
  /** Filter by permission (roles that have this permission) */
  hasPermission?: string;
}

/**
 * Admin role statistics
 */
export interface AdminRoleStatistics {
  /** Total number of roles */
  totalRoles: number;
  /** Roles by hierarchy level */
  rolesByHierarchy: Record<AdminRoleHierarchy, AdminRole[]>;
  /** Highest hierarchy role */
  highestRole: AdminRole | null;
  /** Lowest hierarchy role */
  lowestRole: AdminRole | null;
  /** Roles with permissions count */
  rolesWithPermissions: number;
}

/**
 * Get role hierarchy value
 */
export function getAdminRoleHierarchy(role: AdminRole): AdminRoleHierarchy {
  const hierarchyMap: Record<AdminRole, AdminRoleHierarchy> = {
    super_admin: 100,
    admin: 90,
    manager: 80,
    security_admin: 75,
    compliance_officer: 70,
    devops: 65,
    developer: 60,
    moderator: 50,
    editor: 40,
    product_manager: 45,
    order_manager: 45,
    payment_manager: 45,
    vendor_manager: 45,
    support_agent: 35,
    auditor: 30,
    analyst: 25,
    accountant: 25,
    hr_admin: 25,
    viewer: 10,
  };
  return hierarchyMap[role] || 0;
}

/**
 * Get role label
 */
export function getAdminRoleLabel(role: AdminRole): AdminRoleLabel {
  const labelMap: Record<AdminRole, AdminRoleLabel> = {
    super_admin: 'Super Admin',
    admin: 'Admin',
    manager: 'Manager',
    moderator: 'Moderator',
    editor: 'Editor',
    viewer: 'Viewer',
    support_agent: 'Support Agent',
    developer: 'Developer',
    devops: 'DevOps',
    security_admin: 'Security Admin',
    compliance_officer: 'Compliance Officer',
    auditor: 'Auditor',
    analyst: 'Analyst',
    accountant: 'Accountant',
    hr_admin: 'HR Admin',
    vendor_manager: 'Vendor Manager',
    product_manager: 'Product Manager',
    order_manager: 'Order Manager',
    payment_manager: 'Payment Manager',
  };
  return labelMap[role] || role;
}

/**
 * Get role color
 */
export function getAdminRoleColor(role: AdminRole): AdminRoleColor {
  const colorMap: Record<AdminRole, AdminRoleColor> = {
    super_admin: '#FF0000',
    admin: '#FF6B00',
    manager: '#FFA500',
    security_admin: '#8B0000',
    compliance_officer: '#800080',
    devops: '#2F4F4F',
    developer: '#006400',
    moderator: '#1E90FF',
    editor: '#4169E1',
    product_manager: '#FF8C00',
    order_manager: '#20B2AA',
    payment_manager: '#2E8B57',
    vendor_manager: '#9370DB',
    support_agent: '#48D1CC',
    auditor: '#708090',
    analyst: '#4682B4',
    accountant: '#556B2F',
    hr_admin: '#8B4513',
    viewer: '#A9A9A9',
  };
  return colorMap[role] || '#6C757D';
}

/**
 * Check if role has higher authority than another role
 */
export function hasAdminHigherAuthority(role1: AdminRole, role2: AdminRole): boolean {
  return getAdminRoleHierarchy(role1) > getAdminRoleHierarchy(role2);
}

/**
 * Check if role has equal or higher authority
 */
export function hasAdminEqualOrHigherAuthority(role1: AdminRole, role2: AdminRole): boolean {
  return getAdminRoleHierarchy(role1) >= getAdminRoleHierarchy(role2);
}

/**
 * Check if role has a specific permission
 */
export function adminRoleHasPermission(
  role: AdminRole,
  permission: string,
  rolePermissionsMap: Record<AdminRole, string[]>
): boolean {
  return rolePermissionsMap[role]?.includes(permission) || false;
}

/**
 * Get all roles with hierarchy information
 */
export function getAdminRolesWithHierarchy(): AdminRoleWithHierarchy[] {
  const roles: AdminRole[] = [
    'super_admin',
    'admin',
    'manager',
    'security_admin',
    'compliance_officer',
    'devops',
    'developer',
    'moderator',
    'editor',
    'product_manager',
    'order_manager',
    'payment_manager',
    'vendor_manager',
    'support_agent',
    'auditor',
    'analyst',
    'accountant',
    'hr_admin',
    'viewer',
  ];

  return roles.map((role) => ({
    role,
    hierarchy: getAdminRoleHierarchy(role),
    label: getAdminRoleLabel(role),
    color: getAdminRoleColor(role),
    permissions: [],
  }));
}

/**
 * Get roles by hierarchy range
 */
export function getAdminRolesByHierarchyRange(
  minLevel: AdminRoleHierarchy,
  maxLevel: AdminRoleHierarchy
): AdminRole[] {
  const allRoles: AdminRole[] = [
    'super_admin',
    'admin',
    'manager',
    'security_admin',
    'compliance_officer',
    'devops',
    'developer',
    'moderator',
    'editor',
    'product_manager',
    'order_manager',
    'payment_manager',
    'vendor_manager',
    'support_agent',
    'auditor',
    'analyst',
    'accountant',
    'hr_admin',
    'viewer',
  ];

  return allRoles.filter((role) => {
    const hierarchy = getAdminRoleHierarchy(role);
    return hierarchy >= minLevel && hierarchy <= maxLevel;
  });
}

/**
 * Get dropdown options for admin roles
 */
export function getAdminRoleDropdownOptions(): Array<{
  value: AdminRole;
  label: AdminRoleLabel;
  hierarchy: AdminRoleHierarchy;
  color: AdminRoleColor;
}> {
  const roles: AdminRole[] = [
    'super_admin',
    'admin',
    'manager',
    'security_admin',
    'compliance_officer',
    'devops',
    'developer',
    'moderator',
    'editor',
    'product_manager',
    'order_manager',
    'payment_manager',
    'vendor_manager',
    'support_agent',
    'auditor',
    'analyst',
    'accountant',
    'hr_admin',
    'viewer',
  ];

  return roles.map((role) => ({
    value: role,
    label: getAdminRoleLabel(role),
    hierarchy: getAdminRoleHierarchy(role),
    color: getAdminRoleColor(role),
  }));
}

/**
 * Create admin role statistics
 */
export function createAdminRoleStatistics(
  roles: AdminRole[],
  rolePermissionsMap: Record<AdminRole, string[]>
): AdminRoleStatistics {
  const stats: AdminRoleStatistics = {
    totalRoles: roles.length,
    rolesByHierarchy: {},
    highestRole: null,
    lowestRole: null,
    rolesWithPermissions: 0,
  };

  let highestHierarchy = -1;
  let lowestHierarchy = Infinity;

  roles.forEach((role) => {
    const hierarchy = getAdminRoleHierarchy(role);

    if (!stats.rolesByHierarchy[hierarchy]) {
      stats.rolesByHierarchy[hierarchy] = [];
    }
    stats.rolesByHierarchy[hierarchy].push(role);

    if (hierarchy > highestHierarchy) {
      highestHierarchy = hierarchy;
      stats.highestRole = role;
    }
    if (hierarchy < lowestHierarchy) {
      lowestHierarchy = hierarchy;
      stats.lowestRole = role;
    }

    if (rolePermissionsMap[role] && rolePermissionsMap[role].length > 0) {
      stats.rolesWithPermissions++;
    }
  });

  return stats;
}

/**
 * Validate if a string is a valid admin role
 */
export function isValidAdminRole(role: string): role is AdminRole {
  const validRoles: AdminRole[] = [
    'super_admin',
    'admin',
    'manager',
    'security_admin',
    'compliance_officer',
    'devops',
    'developer',
    'moderator',
    'editor',
    'product_manager',
    'order_manager',
    'payment_manager',
    'vendor_manager',
    'support_agent',
    'auditor',
    'analyst',
    'accountant',
    'hr_admin',
    'viewer',
  ];
  return validRoles.includes(role as AdminRole);
}
