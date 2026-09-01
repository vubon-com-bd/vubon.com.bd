/**
 * Admin Role Schema
 * Zod schemas for admin role definitions, hierarchies, and permissions
 */

import { z } from 'zod';
import { adminPermissionStringSchema } from './admin-permission.schema';

/**
 * Admin role enum schema (from constants)
 */
export const adminRoleSchema = z.enum([
  'super_admin',
  'admin',
  'manager',
  'moderator',
  'editor',
  'viewer',
  'support_agent',
  'developer',
  'devops',
  'security_admin',
  'compliance_officer',
  'auditor',
  'analyst',
  'accountant',
  'hr_admin',
  'vendor_manager',
  'product_manager',
  'order_manager',
  'payment_manager',
]);

/**
 * Admin role hierarchy schema (number, higher = more authority)
 */
export const adminRoleHierarchySchema = z.number().int().min(0).max(100);

/**
 * Admin role label schema
 */
export const adminRoleLabelSchema = z.string().min(1).max(50);

/**
 * Admin role color schema (hex color code)
 */
export const adminRoleColorSchema = z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/);

/**
 * Admin role with hierarchy information schema
 */
export const adminRoleWithHierarchySchema = z.object({
  role: adminRoleSchema,
  hierarchy: adminRoleHierarchySchema,
  label: adminRoleLabelSchema,
  color: adminRoleColorSchema,
  permissions: z.array(adminPermissionStringSchema).default([]),
});

/**
 * Admin role permissions mapping schema
 */
export const adminRolePermissionsSchema = z.object({
  role: adminRoleSchema,
  permissions: z.array(adminPermissionStringSchema),
});

/**
 * Admin role filter parameters schema
 */
export const adminRoleFilterParamsSchema = z.object({
  roles: z.array(adminRoleSchema).optional(),
  minHierarchy: adminRoleHierarchySchema.optional(),
  maxHierarchy: adminRoleHierarchySchema.optional(),
  hasPermission: adminPermissionStringSchema.optional(),
});

/**
 * Admin role statistics schema
 */
export const adminRoleStatisticsSchema = z.object({
  totalRoles: z.number().int().min(0),
  rolesByHierarchy: z.record(z.string(), z.array(adminRoleSchema)),
  highestRole: adminRoleSchema.nullable(),
  lowestRole: adminRoleSchema.nullable(),
  rolesWithPermissions: z.number().int().min(0),
});

/**
 * Type inference from schemas
 */
export type AdminRoleSchema = z.infer<typeof adminRoleSchema>;
export type AdminRoleHierarchySchema = z.infer<typeof adminRoleHierarchySchema>;
export type AdminRoleLabelSchema = z.infer<typeof adminRoleLabelSchema>;
export type AdminRoleColorSchema = z.infer<typeof adminRoleColorSchema>;
export type AdminRoleWithHierarchySchema = z.infer<typeof adminRoleWithHierarchySchema>;
export type AdminRolePermissionsSchema = z.infer<typeof adminRolePermissionsSchema>;
export type AdminRoleFilterParamsSchema = z.infer<typeof adminRoleFilterParamsSchema>;
export type AdminRoleStatisticsSchema = z.infer<typeof adminRoleStatisticsSchema>;

/**
 * Helper function to get role hierarchy value
 */
export function getAdminRoleHierarchy(role: AdminRoleSchema): AdminRoleHierarchySchema {
  const hierarchyMap: Record<AdminRoleSchema, AdminRoleHierarchySchema> = {
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
 * Helper function to get role label
 */
export function getAdminRoleLabel(role: AdminRoleSchema): AdminRoleLabelSchema {
  const labelMap: Record<AdminRoleSchema, AdminRoleLabelSchema> = {
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
 * Helper function to get role color
 */
export function getAdminRoleColor(role: AdminRoleSchema): AdminRoleColorSchema {
  const colorMap: Record<AdminRoleSchema, AdminRoleColorSchema> = {
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
 * Helper function to check if role has higher authority than another role
 */
export function hasAdminHigherAuthority(role1: AdminRoleSchema, role2: AdminRoleSchema): boolean {
  return getAdminRoleHierarchy(role1) > getAdminRoleHierarchy(role2);
}

/**
 * Helper function to check if role has equal or higher authority
 */
export function hasAdminEqualOrHigherAuthority(
  role1: AdminRoleSchema,
  role2: AdminRoleSchema
): boolean {
  return getAdminRoleHierarchy(role1) >= getAdminRoleHierarchy(role2);
}

/**
 * Helper function to get all roles with hierarchy information
 */
export function getAdminRolesWithHierarchy(): AdminRoleWithHierarchySchema[] {
  const roles: AdminRoleSchema[] = [
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
 * Helper function to get roles by hierarchy range
 */
export function getAdminRolesByHierarchyRange(
  minLevel: AdminRoleHierarchySchema,
  maxLevel: AdminRoleHierarchySchema
): AdminRoleSchema[] {
  const allRoles: AdminRoleSchema[] = [
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
 * Helper function to get dropdown options for admin roles
 */
export function getAdminRoleDropdownOptions(): Array<{
  value: AdminRoleSchema;
  label: AdminRoleLabelSchema;
  hierarchy: AdminRoleHierarchySchema;
  color: AdminRoleColorSchema;
}> {
  const roles: AdminRoleSchema[] = [
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
 * Helper function to validate if a string is a valid admin role
 */
export function isValidAdminRole(role: string): role is AdminRoleSchema {
  const validRoles: AdminRoleSchema[] = [
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
  return validRoles.includes(role as AdminRoleSchema);
}

/**
 * Export schemas as an object for convenient access
 */
export const adminRoleSchemas = {
  role: adminRoleSchema,
  hierarchy: adminRoleHierarchySchema,
  label: adminRoleLabelSchema,
  color: adminRoleColorSchema,
  withHierarchy: adminRoleWithHierarchySchema,
  permissions: adminRolePermissionsSchema,
  filter: adminRoleFilterParamsSchema,
  statistics: adminRoleStatisticsSchema,
  getHierarchy: getAdminRoleHierarchy,
  getLabel: getAdminRoleLabel,
  getColor: getAdminRoleColor,
  hasHigherAuthority: hasAdminHigherAuthority,
  hasEqualOrHigherAuthority: hasAdminEqualOrHigherAuthority,
  getAllWithHierarchy: getAdminRolesWithHierarchy,
  getByHierarchyRange: getAdminRolesByHierarchyRange,
  getDropdownOptions: getAdminRoleDropdownOptions,
  isValid: isValidAdminRole,
};

export default adminRoleSchemas;
