/**
 * Admin Permission Constants
 * Granular permissions for admin operations
 */

import { ADMIN_RESOURCE, ADMIN_ACTION } from './admin.constants';

/**
 * Permission categories
 */
export const ADMIN_PERMISSION_CATEGORY = {
  /** User management permissions */
  USER: 'user',
  /** Admin management permissions */
  ADMIN: 'admin',
  /** Vendor management permissions */
  VENDOR: 'vendor',
  /** Product management permissions */
  PRODUCT: 'product',
  /** Category management permissions */
  CATEGORY: 'category',
  /** Brand management permissions */
  BRAND: 'brand',
  /** Order management permissions */
  ORDER: 'order',
  /** Payment management permissions */
  PAYMENT: 'payment',
  /** Shipment management permissions */
  SHIPMENT: 'shipment',
  /** Inventory management permissions */
  INVENTORY: 'inventory',
  /** Warehouse management permissions */
  WAREHOUSE: 'warehouse',
  /** Supplier management permissions */
  SUPPLIER: 'supplier',
  /** Coupon management permissions */
  COUPON: 'coupon',
  /** Promotion management permissions */
  PROMOTION: 'promotion',
  /** Flash sale management permissions */
  FLASH_SALE: 'flash_sale',
  /** Deal management permissions */
  DEAL: 'deal',
  /** Review management permissions */
  REVIEW: 'review',
  /** Rating management permissions */
  RATING: 'rating',
  /** Comment management permissions */
  COMMENT: 'comment',
  /** Settings management permissions */
  SETTINGS: 'settings',
  /** Configuration management permissions */
  CONFIG: 'config',
  /** Template management permissions */
  TEMPLATE: 'template',
  /** Report management permissions */
  REPORT: 'report',
  /** Analytics management permissions */
  ANALYTICS: 'analytics',
  /** Notification management permissions */
  NOTIFICATION: 'notification',
  /** Log management permissions */
  LOG: 'log',
  /** Audit management permissions */
  AUDIT: 'audit',
  /** Session management permissions */
  SESSION: 'session',
  /** Device management permissions */
  DEVICE: 'device',
  /** Verification management permissions */
  VERIFICATION: 'verification',
  /** Backup management permissions */
  BACKUP: 'backup',
  /** Integration management permissions */
  INTEGRATION: 'integration',
  /** Webhook management permissions */
  WEBHOOK: 'webhook',
  /** API key management permissions */
  API_KEY: 'api_key',
  /** System management permissions */
  SYSTEM: 'system',
} as const;

export type AdminPermissionCategory =
  (typeof ADMIN_PERMISSION_CATEGORY)[keyof typeof ADMIN_PERMISSION_CATEGORY];

/**
 * Permission action types
 */
export const ADMIN_PERMISSION_ACTION = {
  ...ADMIN_ACTION,
  /** View/Read action */
  VIEW: 'view',
  /** Read action */
  READ: 'read',
  /** Create action */
  CREATE: 'create',
  /** Update action */
  UPDATE: 'update',
  /** Delete action */
  DELETE: 'delete',
  /** Execute action */
  EXECUTE: 'execute',
  /** Run action */
  RUN: 'run',
  /** Publish action */
  PUBLISH: 'publish',
  /** Draft action */
  DRAFT: 'draft',
  /** Review action */
  REVIEW: 'review',
  /** Validate action */
  VALIDATE: 'validate',
  /** Process action */
  PROCESS: 'process',
  /** Schedule action */
  SCHEDULE: 'schedule',
  /** Dispatch action */
  DISPATCH: 'dispatch',
  /** Receive action */
  RECEIVE: 'receive',
  /** Transfer action */
  TRANSFER: 'transfer',
  /** Allocate action */
  ALLOCATE: 'allocate',
  /** Full access (all operations) */
  FULL: 'full',
  /** Super access (all operations + system) */
  SUPER: 'super',
} as const;

export type AdminPermissionAction =
  (typeof ADMIN_PERMISSION_ACTION)[keyof typeof ADMIN_PERMISSION_ACTION];

/**
 * Permission levels
 */
export const ADMIN_PERMISSION_LEVEL = {
  /** No access */
  NONE: 0,
  /** Read-only access */
  READ: 10,
  /** Create access */
  CREATE: 20,
  /** Update access */
  UPDATE: 30,
  /** Delete access */
  DELETE: 40,
  /** Full access (all operations) */
  FULL: 50,
  /** Super access (all operations + system) */
  SUPER: 100,
} as const;

export type AdminPermissionLevel =
  (typeof ADMIN_PERMISSION_LEVEL)[keyof typeof ADMIN_PERMISSION_LEVEL];

/**
 * Build admin permission string
 */
export function buildAdminPermission(
  category: AdminPermissionCategory,
  action: AdminPermissionAction
): string {
  return `${category}:${action}`;
}

/**
 * Parse admin permission string
 */
export function parseAdminPermission(permission: string): { category: string; action: string } {
  const [category, action] = permission.split(':');
  return { category, action };
}

/**
 * Get admin permission category from permission string
 */
export function getAdminPermissionCategory(permission: string): string {
  return permission.split(':')[0];
}

/**
 * Get admin permission action from permission string
 */
export function getAdminPermissionAction(permission: string): string {
  return permission.split(':')[1] || '';
}

/**
 * Check if admin permission is for a specific category
 */
export function isAdminPermissionForCategory(
  permission: string,
  category: AdminPermissionCategory
): boolean {
  return getAdminPermissionCategory(permission) === category;
}

/**
 * Check if admin permission has a specific action
 */
export function isAdminPermissionWithAction(
  permission: string,
  action: AdminPermissionAction
): boolean {
  return getAdminPermissionAction(permission) === action;
}

/**
 * Get admin permission level from actions
 */
export function getAdminPermissionLevel(permissions: string[]): AdminPermissionLevel {
  let maxLevel: AdminPermissionLevel = ADMIN_PERMISSION_LEVEL.NONE;
  const actionLevelMap: Record<string, AdminPermissionLevel> = {
    [ADMIN_PERMISSION_ACTION.VIEW]: ADMIN_PERMISSION_LEVEL.READ,
    [ADMIN_PERMISSION_ACTION.READ]: ADMIN_PERMISSION_LEVEL.READ,
    [ADMIN_PERMISSION_ACTION.CREATE]: ADMIN_PERMISSION_LEVEL.CREATE,
    [ADMIN_PERMISSION_ACTION.UPDATE]: ADMIN_PERMISSION_LEVEL.UPDATE,
    [ADMIN_PERMISSION_ACTION.DELETE]: ADMIN_PERMISSION_LEVEL.DELETE,
    [ADMIN_PERMISSION_ACTION.FULL]: ADMIN_PERMISSION_LEVEL.FULL,
    [ADMIN_PERMISSION_ACTION.SUPER]: ADMIN_PERMISSION_LEVEL.SUPER,
  };

  for (const permission of permissions) {
    const action = getAdminPermissionAction(permission) as AdminPermissionAction;
    const level = actionLevelMap[action] || ADMIN_PERMISSION_LEVEL.NONE;
    if (level > maxLevel) {
      maxLevel = level;
    }
  }

  return maxLevel;
}

/**
 * Check if admin permission level is sufficient
 */
export function hasAdminPermissionLevel(
  permissions: string[],
  requiredLevel: AdminPermissionLevel
): boolean {
  return getAdminPermissionLevel(permissions) >= requiredLevel;
}

/**
 * Group admin permissions by category
 */
export function groupAdminPermissionsByCategory(permissions: string[]): Record<string, string[]> {
  const grouped: Record<string, string[]> = {};
  for (const permission of permissions) {
    const category = getAdminPermissionCategory(permission);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(permission);
  }
  return grouped;
}

/**
 * Get all admin permissions for a category
 */
export function getAdminCategoryPermissions(
  category: AdminPermissionCategory,
  actions: AdminPermissionAction[]
): string[] {
  return actions.map((action) => buildAdminPermission(category, action));
}

/**
 * Common permission sets for different admin types
 */
export const ADMIN_PERMISSION_SETS = {
  /** Super admin - all permissions */
  SUPER_ADMIN: Object.values(ADMIN_RESOURCE).flatMap((resource) =>
    Object.values(ADMIN_PERMISSION_ACTION).map((action) => `${resource}:${action}`)
  ),

  /** Admin - most permissions except system */
  ADMIN: Object.values(ADMIN_RESOURCE)
    .filter((r) => r !== ADMIN_RESOURCE.SYSTEM)
    .flatMap((resource) =>
      Object.values(ADMIN_PERMISSION_ACTION)
        .filter((a) => a !== ADMIN_PERMISSION_ACTION.SUPER)
        .map((action) => `${resource}:${action}`)
    ),

  /** Manager - management permissions */
  MANAGER: [
    ...getAdminCategoryPermissions(ADMIN_PERMISSION_CATEGORY.USER, [
      ADMIN_PERMISSION_ACTION.VIEW,
      ADMIN_PERMISSION_ACTION.UPDATE,
    ]),
    ...getAdminCategoryPermissions(ADMIN_PERMISSION_CATEGORY.VENDOR, [
      ADMIN_PERMISSION_ACTION.VIEW,
      ADMIN_PERMISSION_ACTION.UPDATE,
    ]),
    ...getAdminCategoryPermissions(ADMIN_PERMISSION_CATEGORY.PRODUCT, [
      ADMIN_PERMISSION_ACTION.VIEW,
      ADMIN_PERMISSION_ACTION.UPDATE,
      ADMIN_PERMISSION_ACTION.APPROVE,
    ]),
    ...getAdminCategoryPermissions(ADMIN_PERMISSION_CATEGORY.ORDER, [
      ADMIN_PERMISSION_ACTION.VIEW,
      ADMIN_PERMISSION_ACTION.UPDATE,
    ]),
    ...getAdminCategoryPermissions(ADMIN_PERMISSION_CATEGORY.REPORT, [
      ADMIN_PERMISSION_ACTION.VIEW,
      ADMIN_PERMISSION_ACTION.GENERATE,
    ]),
  ],

  /** Moderator - content moderation */
  MODERATOR: [
    ...getAdminCategoryPermissions(ADMIN_PERMISSION_CATEGORY.USER, [
      ADMIN_PERMISSION_ACTION.VIEW,
      ADMIN_PERMISSION_ACTION.SUSPEND,
    ]),
    ...getAdminCategoryPermissions(ADMIN_PERMISSION_CATEGORY.PRODUCT, [
      ADMIN_PERMISSION_ACTION.VIEW,
      ADMIN_PERMISSION_ACTION.APPROVE,
      ADMIN_PERMISSION_ACTION.REJECT,
    ]),
    ...getAdminCategoryPermissions(ADMIN_PERMISSION_CATEGORY.REVIEW, [
      ADMIN_PERMISSION_ACTION.VIEW,
      ADMIN_PERMISSION_ACTION.UPDATE,
      ADMIN_PERMISSION_ACTION.DELETE,
    ]),
    ...getAdminCategoryPermissions(ADMIN_PERMISSION_CATEGORY.COMMENT, [
      ADMIN_PERMISSION_ACTION.VIEW,
      ADMIN_PERMISSION_ACTION.UPDATE,
      ADMIN_PERMISSION_ACTION.DELETE,
    ]),
  ],

  /** Viewer - read-only */
  VIEWER: Object.values(ADMIN_RESOURCE)
    .filter((r) => r !== ADMIN_RESOURCE.SYSTEM)
    .map((resource) => `${resource}:${ADMIN_PERMISSION_ACTION.VIEW}`),
};

/**
 * Validate admin permission string format
 */
export function isValidAdminPermission(permission: string): boolean {
  const parts = permission.split(':');
  if (parts.length !== 2) {
    return false;
  }
  const [category, action] = parts;
  const allResources: string[] = Object.values(ADMIN_RESOURCE);
  const allActions: string[] = Object.values(ADMIN_PERMISSION_ACTION);
  return allResources.includes(category) && allActions.includes(action);
}

/**
 * Get missing admin permissions
 */
export function getMissingAdminPermissions(
  currentPermissions: string[],
  requiredPermissions: string[]
): string[] {
  return requiredPermissions.filter((p) => !currentPermissions.includes(p));
}

/**
 * Check if admin has all required permissions
 */
export function adminHasAllPermissions(
  currentPermissions: string[],
  requiredPermissions: string[]
): boolean {
  return requiredPermissions.every((p) => currentPermissions.includes(p));
}

/**
 * Check if admin has any required permissions
 */
export function adminHasAnyPermission(
  currentPermissions: string[],
  requiredPermissions: string[]
): boolean {
  return requiredPermissions.some((p) => currentPermissions.includes(p));
}

/**
 * Get admin permission label
 */
export function getAdminPermissionLabel(permission: string): string {
  const labels: Record<string, string> = {
    view: 'View',
    read: 'Read',
    create: 'Create',
    update: 'Update',
    delete: 'Delete',
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
    transfer: 'Transfer',
    allocate: 'Allocate',
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
    terminate: 'Terminate',
    full: 'Full Access',
    super: 'Super Access',
  };
  const action = getAdminPermissionAction(permission);
  const category = getAdminPermissionCategory(permission);
  const actionLabel = labels[action] || action;
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  return `${categoryLabel} ${actionLabel}`;
}

/**
 * Get admin permission level label
 */
export function getAdminPermissionLevelLabel(level: AdminPermissionLevel): string {
  const labels: Record<AdminPermissionLevel, string> = {
    [ADMIN_PERMISSION_LEVEL.NONE]: 'No Access',
    [ADMIN_PERMISSION_LEVEL.READ]: 'Read Only',
    [ADMIN_PERMISSION_LEVEL.CREATE]: 'Create',
    [ADMIN_PERMISSION_LEVEL.UPDATE]: 'Update',
    [ADMIN_PERMISSION_LEVEL.DELETE]: 'Delete',
    [ADMIN_PERMISSION_LEVEL.FULL]: 'Full Access',
    [ADMIN_PERMISSION_LEVEL.SUPER]: 'Super Access',
  };
  return labels[level] || 'Unknown';
}

/**
 * Get admin permission level color
 */
export function getAdminPermissionLevelColor(level: AdminPermissionLevel): string {
  const colors: Record<AdminPermissionLevel, string> = {
    [ADMIN_PERMISSION_LEVEL.NONE]: '#6C757D',
    [ADMIN_PERMISSION_LEVEL.READ]: '#17A2B8',
    [ADMIN_PERMISSION_LEVEL.CREATE]: '#28A745',
    [ADMIN_PERMISSION_LEVEL.UPDATE]: '#007BFF',
    [ADMIN_PERMISSION_LEVEL.DELETE]: '#DC3545',
    [ADMIN_PERMISSION_LEVEL.FULL]: '#FFC107',
    [ADMIN_PERMISSION_LEVEL.SUPER]: '#6F42C1',
  };
  return colors[level] || '#6C757D';
}
