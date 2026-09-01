/**
 * Admin Permission Schema
 * Zod schemas for admin permission definitions
 */

import { z } from 'zod';
import { ADMIN_PERMISSION_CATEGORY, ADMIN_PERMISSION_ACTION } from '@vubon/shared-constants';

/**
 * Admin permission category enum schema (from constants)
 */
export const adminPermissionCategorySchema = z.enum([
  'user',
  'admin',
  'vendor',
  'product',
  'category',
  'brand',
  'order',
  'payment',
  'shipment',
  'inventory',
  'warehouse',
  'supplier',
  'coupon',
  'promotion',
  'flash_sale',
  'deal',
  'review',
  'rating',
  'comment',
  'settings',
  'config',
  'template',
  'report',
  'analytics',
  'notification',
  'log',
  'audit',
  'session',
  'device',
  'verification',
  'backup',
  'integration',
  'webhook',
  'api_key',
  'system',
]);

/**
 * Admin permission action enum schema (from constants)
 */
export const adminPermissionActionSchema = z.enum([
  'create',
  'read',
  'update',
  'delete',
  'approve',
  'reject',
  'suspend',
  'unsuspend',
  'lock',
  'unlock',
  'verify',
  'unverify',
  'block',
  'unblock',
  'reset',
  'restore',
  'archive',
  'unarchive',
  'export',
  'import',
  'sync',
  'backup',
  'restore_backup',
  'generate',
  'configure',
  'assign',
  'unassign',
  'promote',
  'demote',
  'transfer',
  'terminate',
  'view',
  'execute',
  'run',
  'publish',
  'draft',
  'review',
  'validate',
  'process',
  'schedule',
  'dispatch',
  'receive',
  'allocate',
  'full',
  'super',
]);

/**
 * Admin permission level schema (0, 10, 20, 30, 40, 50, 100)
 */
export const adminPermissionLevelSchema = z.union([
  z.literal(0),
  z.literal(10),
  z.literal(20),
  z.literal(30),
  z.literal(40),
  z.literal(50),
  z.literal(100),
]);

/**
 * Admin permission string schema (format: "category:action")
 * Validates that the string matches the format and uses valid categories/actions
 */
export const adminPermissionStringSchema = z
  .string()
  .regex(/^[a-z_]+:[a-z_]+$/)
  .refine(
    (val) => {
      const [category, action] = val.split(':');
      const validCategories = Object.values(ADMIN_PERMISSION_CATEGORY) as string[];
      const validActions = Object.values(ADMIN_PERMISSION_ACTION) as string[];
      return validCategories.includes(category) && validActions.includes(action);
    },
    {
      message: 'Invalid permission format or unknown category/action',
    }
  );

/**
 * Admin permission object schema
 */
export const adminPermissionSchema = z.object({
  category: adminPermissionCategorySchema,
  action: adminPermissionActionSchema,
  permission: adminPermissionStringSchema,
  label: z.string(),
  level: adminPermissionLevelSchema,
});

/**
 * Admin permission group schema
 */
export const adminPermissionGroupSchema = z.object({
  category: adminPermissionCategorySchema,
  label: z.string(),
  permissions: z.array(adminPermissionSchema),
});

/**
 * Admin permission set schema
 */
export const adminPermissionSetSchema = z.object({
  name: z.string(),
  label: z.string(),
  permissions: z.array(adminPermissionStringSchema),
});

/**
 * Type inference from schemas
 */
export type AdminPermissionCategorySchema = z.infer<typeof adminPermissionCategorySchema>;
export type AdminPermissionActionSchema = z.infer<typeof adminPermissionActionSchema>;
export type AdminPermissionLevelSchema = z.infer<typeof adminPermissionLevelSchema>;
export type AdminPermissionStringSchema = z.infer<typeof adminPermissionStringSchema>;
export type AdminPermissionSchema = z.infer<typeof adminPermissionSchema>;
export type AdminPermissionGroupSchema = z.infer<typeof adminPermissionGroupSchema>;
export type AdminPermissionSetSchema = z.infer<typeof adminPermissionSetSchema>;

/**
 * Helper function to build admin permission string
 */
export function buildAdminPermissionString(
  category: AdminPermissionCategorySchema,
  action: AdminPermissionActionSchema
): AdminPermissionStringSchema {
  return `${category}:${action}` as AdminPermissionStringSchema;
}

/**
 * Helper function to parse admin permission string
 */
export function parseAdminPermissionString(permission: AdminPermissionStringSchema): {
  category: AdminPermissionCategorySchema;
  action: AdminPermissionActionSchema;
} {
  const [category, action] = permission.split(':');
  return {
    category: category as AdminPermissionCategorySchema,
    action: action as AdminPermissionActionSchema,
  };
}

/**
 * Helper function to get permission category from string
 */
export function getAdminPermissionCategoryFromString(
  permission: AdminPermissionStringSchema
): AdminPermissionCategorySchema {
  return permission.split(':')[0] as AdminPermissionCategorySchema;
}

/**
 * Helper function to get permission action from string
 */
export function getAdminPermissionActionFromString(
  permission: AdminPermissionStringSchema
): AdminPermissionActionSchema {
  return permission.split(':')[1] as AdminPermissionActionSchema;
}

/**
 * Helper function to get permission label
 */
export function getAdminPermissionLabel(permission: AdminPermissionStringSchema): string {
  const { category, action } = parseAdminPermissionString(permission);
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const actionLabelMap: Record<AdminPermissionActionSchema, string> = {
    create: 'Create',
    read: 'Read',
    update: 'Update',
    delete: 'Delete',
    approve: 'Approve',
    reject: 'Reject',
    suspend: 'Suspend',
    unsuspend: 'Unsuspend',
    lock: 'Lock',
    unlock: 'Unlock',
    verify: 'Verify',
    unverify: 'Unverify',
    block: 'Block',
    unblock: 'Unblock',
    reset: 'Reset',
    restore: 'Restore',
    archive: 'Archive',
    unarchive: 'Unarchive',
    export: 'Export',
    import: 'Import',
    sync: 'Sync',
    backup: 'Backup',
    restore_backup: 'Restore Backup',
    generate: 'Generate',
    configure: 'Configure',
    assign: 'Assign',
    unassign: 'Unassign',
    promote: 'Promote',
    demote: 'Demote',
    transfer: 'Transfer',
    terminate: 'Terminate',
    view: 'View',
    execute: 'Execute',
    run: 'Run',
    publish: 'Publish',
    draft: 'Draft',
    review: 'Review',
    validate: 'Validate',
    process: 'Process',
    schedule: 'Schedule',
    dispatch: 'Dispatch',
    receive: 'Receive',
    allocate: 'Allocate',
    full: 'Full Access',
    super: 'Super Access',
  };
  const actionLabel = actionLabelMap[action] || action;
  return `${categoryLabel} ${actionLabel}`;
}

/**
 * Helper function to get permission level from action
 */
export function getAdminPermissionLevelFromAction(
  action: AdminPermissionActionSchema
): AdminPermissionLevelSchema {
  const levelMap: Record<AdminPermissionActionSchema, AdminPermissionLevelSchema> = {
    view: 10,
    read: 10,
    create: 20,
    update: 30,
    delete: 40,
    approve: 30,
    reject: 30,
    suspend: 30,
    unsuspend: 30,
    lock: 30,
    unlock: 30,
    verify: 30,
    unverify: 30,
    block: 30,
    unblock: 30,
    reset: 30,
    restore: 40,
    archive: 30,
    unarchive: 30,
    export: 20,
    import: 20,
    sync: 20,
    backup: 20,
    restore_backup: 40,
    generate: 20,
    configure: 30,
    assign: 30,
    unassign: 30,
    promote: 40,
    demote: 40,
    transfer: 30,
    terminate: 40,
    execute: 30,
    run: 30,
    publish: 30,
    draft: 20,
    review: 20,
    validate: 20,
    process: 20,
    schedule: 20,
    dispatch: 20,
    receive: 20,
    allocate: 20,
    full: 50,
    super: 100,
  };
  return levelMap[action] || 0;
}

/**
 * Helper function to check if permission string is valid
 */
export function isValidAdminPermission(permission: string): boolean {
  const parts = permission.split(':');
  if (parts.length !== 2) return false;

  const [category, action] = parts;
  const validCategories = Object.values(ADMIN_PERMISSION_CATEGORY) as string[];
  const validActions = Object.values(ADMIN_PERMISSION_ACTION) as string[];
  return validCategories.includes(category) && validActions.includes(action);
}

/**
 * Helper function to get permission level label
 */
export function getAdminPermissionLevelLabel(level: AdminPermissionLevelSchema): string {
  const labels: Record<AdminPermissionLevelSchema, string> = {
    0: 'No Access',
    10: 'Read Only',
    20: 'Create',
    30: 'Update',
    40: 'Delete',
    50: 'Full Access',
    100: 'Super Access',
  };
  return labels[level] || 'Unknown';
}

/**
 * Helper function to get permission level color
 */
export function getAdminPermissionLevelColor(level: AdminPermissionLevelSchema): string {
  const colors: Record<AdminPermissionLevelSchema, string> = {
    0: '#6C757D',
    10: '#17A2B8',
    20: '#28A745',
    30: '#007BFF',
    40: '#DC3545',
    50: '#FFC107',
    100: '#6F42C1',
  };
  return colors[level] || '#6C757D';
}

/**
 * Helper function to check if permission level is sufficient
 */
export function hasAdminPermissionLevel(
  currentLevel: AdminPermissionLevelSchema,
  requiredLevel: AdminPermissionLevelSchema
): boolean {
  return currentLevel >= requiredLevel;
}

/**
 * Export schemas as an object for convenient access
 */
export const adminPermissionSchemas = {
  category: adminPermissionCategorySchema,
  action: adminPermissionActionSchema,
  level: adminPermissionLevelSchema,
  permissionString: adminPermissionStringSchema,
  permission: adminPermissionSchema,
  group: adminPermissionGroupSchema,
  set: adminPermissionSetSchema,
  buildString: buildAdminPermissionString,
  parseString: parseAdminPermissionString,
  getCategory: getAdminPermissionCategoryFromString,
  getAction: getAdminPermissionActionFromString,
  getLabel: getAdminPermissionLabel,
  getLevelFromAction: getAdminPermissionLevelFromAction,
  isValid: isValidAdminPermission,
  getLevelLabel: getAdminPermissionLevelLabel,
  getLevelColor: getAdminPermissionLevelColor,
  hasLevel: hasAdminPermissionLevel,
};

export default adminPermissionSchemas;
