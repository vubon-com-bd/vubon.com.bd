/**
 * Admin Permission Types
 * Granular permission definitions for admin operations
 */

/**
 * Permission category type
 * Based on ADMIN_PERMISSION_CATEGORY from constants
 */
export type AdminPermissionCategory =
  | 'user'
  | 'admin'
  | 'vendor'
  | 'product'
  | 'category'
  | 'brand'
  | 'order'
  | 'payment'
  | 'shipment'
  | 'inventory'
  | 'warehouse'
  | 'supplier'
  | 'coupon'
  | 'promotion'
  | 'flash_sale'
  | 'deal'
  | 'review'
  | 'rating'
  | 'comment'
  | 'settings'
  | 'config'
  | 'template'
  | 'report'
  | 'analytics'
  | 'notification'
  | 'log'
  | 'audit'
  | 'session'
  | 'device'
  | 'verification'
  | 'backup'
  | 'integration'
  | 'webhook'
  | 'api_key'
  | 'system';

/**
 * Permission action type
 * Based on ADMIN_PERMISSION_ACTION from constants
 */
export type AdminPermissionAction =
  | 'create'
  | 'read'
  | 'update'
  | 'delete'
  | 'approve'
  | 'reject'
  | 'suspend'
  | 'unsuspend'
  | 'lock'
  | 'unlock'
  | 'verify'
  | 'unverify'
  | 'block'
  | 'unblock'
  | 'reset'
  | 'restore'
  | 'archive'
  | 'unarchive'
  | 'export'
  | 'import'
  | 'sync'
  | 'backup'
  | 'restore_backup'
  | 'generate'
  | 'configure'
  | 'assign'
  | 'unassign'
  | 'promote'
  | 'demote'
  | 'transfer'
  | 'terminate'
  | 'view'
  | 'execute'
  | 'run'
  | 'publish'
  | 'draft'
  | 'review'
  | 'validate'
  | 'process'
  | 'schedule'
  | 'dispatch'
  | 'receive'
  | 'allocate'
  | 'full'
  | 'super';

/**
 * Permission level type
 * Based on ADMIN_PERMISSION_LEVEL from constants
 */
export type AdminPermissionLevel = 0 | 10 | 20 | 30 | 40 | 50 | 100;

/**
 * Admin permission string
 * Format: "category:action"
 */
export type AdminPermissionString = `${AdminPermissionCategory}:${AdminPermissionAction}`;

/**
 * Admin permission object
 * Structured permission representation
 */
export interface AdminPermission {
  /** Permission category */
  category: AdminPermissionCategory;
  /** Permission action */
  action: AdminPermissionAction;
  /** Full permission string */
  permission: AdminPermissionString;
  /** Display label */
  label: string;
  /** Permission level */
  level: AdminPermissionLevel;
}

/**
 * Admin permission group
 * Group of permissions by category
 */
export interface AdminPermissionGroup {
  /** Category name */
  category: AdminPermissionCategory;
  /** Category label */
  label: string;
  /** Permissions in this group */
  permissions: AdminPermission[];
}

/**
 * Admin permission set
 * Predefined set of permissions for a role
 */
export interface AdminPermissionSet {
  /** Set name */
  name: string;
  /** Set label */
  label: string;
  /** Permissions in this set */
  permissions: AdminPermissionString[];
}

/**
 * Build admin permission string from category and action
 */
export function buildAdminPermissionString(
  category: AdminPermissionCategory,
  action: AdminPermissionAction
): AdminPermissionString {
  return `${category}:${action}` as AdminPermissionString;
}

/**
 * Parse admin permission string into category and action
 */
export function parseAdminPermissionString(permission: AdminPermissionString): {
  category: AdminPermissionCategory;
  action: AdminPermissionAction;
} {
  const [category, action] = permission.split(':');
  return {
    category: category as AdminPermissionCategory,
    action: action as AdminPermissionAction,
  };
}

/**
 * Get permission category from permission string
 */
export function getAdminPermissionCategoryFromString(
  permission: AdminPermissionString
): AdminPermissionCategory {
  return permission.split(':')[0] as AdminPermissionCategory;
}

/**
 * Get permission action from permission string
 */
export function getAdminPermissionActionFromString(
  permission: AdminPermissionString
): AdminPermissionAction {
  return permission.split(':')[1] as AdminPermissionAction;
}

/**
 * Get permission label
 */
export function getAdminPermissionLabel(permission: AdminPermissionString): string {
  const { category, action } = parseAdminPermissionString(permission);
  const categoryLabel = category.charAt(0).toUpperCase() + category.slice(1);
  const actionLabelMap: Record<AdminPermissionAction, string> = {
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
 * Get permission level from action
 */
export function getAdminPermissionLevelFromAction(
  action: AdminPermissionAction
): AdminPermissionLevel {
  const levelMap: Record<AdminPermissionAction, AdminPermissionLevel> = {
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
 * Check if permission string is valid
 */
export function isValidAdminPermission(permission: string): permission is AdminPermissionString {
  const parts = permission.split(':');
  if (parts.length !== 2) return false;

  const [category, action] = parts;
  const validCategories: AdminPermissionCategory[] = [
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
  ];
  const validActions: AdminPermissionAction[] = [
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
  ];
  return (
    validCategories.includes(category as AdminPermissionCategory) &&
    validActions.includes(action as AdminPermissionAction)
  );
}

/**
 * Get permission level label
 */
export function getAdminPermissionLevelLabel(level: AdminPermissionLevel): string {
  const labels: Record<AdminPermissionLevel, string> = {
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
 * Get permission level color
 */
export function getAdminPermissionLevelColor(level: AdminPermissionLevel): string {
  const colors: Record<AdminPermissionLevel, string> = {
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
 * Check if permission level is sufficient
 */
export function hasAdminPermissionLevel(
  currentLevel: AdminPermissionLevel,
  requiredLevel: AdminPermissionLevel
): boolean {
  return currentLevel >= requiredLevel;
}

/**
 * Group permissions by category
 */
export function groupAdminPermissionsByCategory(
  permissions: AdminPermissionString[]
): Record<AdminPermissionCategory, AdminPermissionString[]> {
  const grouped: Record<AdminPermissionCategory, AdminPermissionString[]> = {} as Record<
    AdminPermissionCategory,
    AdminPermissionString[]
  >;

  for (const permission of permissions) {
    const category = getAdminPermissionCategoryFromString(permission);
    if (!grouped[category]) {
      grouped[category] = [];
    }
    grouped[category].push(permission);
  }

  return grouped;
}

/**
 * Create admin permission object
 */
export function createAdminPermission(permission: AdminPermissionString): AdminPermission {
  const { category, action } = parseAdminPermissionString(permission);
  return {
    category,
    action,
    permission,
    label: getAdminPermissionLabel(permission),
    level: getAdminPermissionLevelFromAction(action),
  };
}

/**
 * Get permissions for a category
 */
export function getAdminPermissionsForCategory(
  permissions: AdminPermissionString[],
  category: AdminPermissionCategory
): AdminPermissionString[] {
  return permissions.filter((p) => getAdminPermissionCategoryFromString(p) === category);
}

/**
 * Check if permission has specific action
 */
export function adminPermissionHasAction(
  permission: AdminPermissionString,
  action: AdminPermissionAction
): boolean {
  return getAdminPermissionActionFromString(permission) === action;
}

/**
 * Check if permission is for specific category
 */
export function adminPermissionIsForCategory(
  permission: AdminPermissionString,
  category: AdminPermissionCategory
): boolean {
  return getAdminPermissionCategoryFromString(permission) === category;
}
