/**
 * Admin Constants
 * Core admin configurations, types, and settings
 */

import {
  STATUS,
  getStatusColor,
  getStatusLabel,
  isActiveStatus,
  isInactiveStatus,
} from '../common/status.constants';

/**
 * Admin base configuration
 */
export const ADMIN_CONFIG = {
  /** Default admin role */
  DEFAULT_ROLE: 'admin',
  /** Default admin status */
  DEFAULT_STATUS: STATUS.ACTIVE,
  /** Max login attempts before lock */
  MAX_LOGIN_ATTEMPTS: 5,
  /** Session timeout in seconds (8 hours) */
  SESSION_TIMEOUT: 28800,
  /** Password reset expiry in seconds (1 hour) */
  PASSWORD_RESET_EXPIRY: 3600,
  /** OTP expiry in seconds (5 minutes) */
  OTP_EXPIRY: 300,
  /** MFA enabled by default */
  MFA_DEFAULT_ENABLED: false,
  /** Max concurrent sessions per admin */
  MAX_CONCURRENT_SESSIONS: 3,
  /** Audit log retention in days */
  AUDIT_LOG_RETENTION: 90,
  /** Activity log retention in days */
  ACTIVITY_LOG_RETENTION: 30,
  /** Session log retention in days */
  SESSION_LOG_RETENTION: 30,
} as const;

/**
 * Admin types based on responsibilities
 */
export const ADMIN_TYPES = {
  /** System administrator */
  SYSTEM: 'system',
  /** Business administrator */
  BUSINESS: 'business',
  /** Technical administrator */
  TECHNICAL: 'technical',
  /** Content administrator */
  CONTENT: 'content',
  /** User administrator */
  USER: 'user',
  /** Product administrator */
  PRODUCT: 'product',
  /** Order administrator */
  ORDER: 'order',
  /** Payment administrator */
  PAYMENT: 'payment',
  /** Shipping administrator */
  SHIPPING: 'shipping',
  /** Inventory administrator */
  INVENTORY: 'inventory',
  /** Marketing administrator */
  MARKETING: 'marketing',
  /** Sales administrator */
  SALES: 'sales',
  /** Support administrator */
  SUPPORT: 'support',
  /** Security administrator */
  SECURITY: 'security',
  /** Compliance administrator */
  COMPLIANCE: 'compliance',
  /** Analytics administrator */
  ANALYTICS: 'analytics',
  /** Report administrator */
  REPORT: 'report',
  /** Integration administrator */
  INTEGRATION: 'integration',
  /** Backup administrator */
  BACKUP: 'backup',
  /** Maintenance administrator */
  MAINTENANCE: 'maintenance',
} as const;

/**
 * Admin priority
 */
export const ADMIN_PRIORITY = {
  /** Highest priority admin operations */
  CRITICAL: 1,
  /** High priority admin operations */
  HIGH: 2,
  /** Normal priority admin operations */
  NORMAL: 3,
  /** Low priority admin operations */
  LOW: 4,
  /** Lowest priority admin operations */
  LOWEST: 5,
} as const;

/**
 * Admin action types
 */
export const ADMIN_ACTION = {
  CREATE: 'create',
  READ: 'read',
  UPDATE: 'update',
  DELETE: 'delete',
  APPROVE: 'approve',
  REJECT: 'reject',
  SUSPEND: 'suspend',
  UNSUSPEND: 'unsuspend',
  LOCK: 'lock',
  UNLOCK: 'unlock',
  VERIFY: 'verify',
  UNVERIFY: 'unverify',
  BLOCK: 'block',
  UNBLOCK: 'unblock',
  RESET: 'reset',
  RESTORE: 'restore',
  ARCHIVE: 'archive',
  UNARCHIVE: 'unarchive',
  EXPORT: 'export',
  IMPORT: 'import',
  SYNC: 'sync',
  BACKUP: 'backup',
  RESTORE_BACKUP: 'restore_backup',
  GENERATE: 'generate',
  CONFIGURE: 'configure',
  ASSIGN: 'assign',
  UNASSIGN: 'unassign',
  PROMOTE: 'promote',
  DEMOTE: 'demote',
  TRANSFER: 'transfer',
  TERMINATE: 'terminate',
} as const;

/**
 * Admin resource types
 */
export const ADMIN_RESOURCE = {
  USER: 'user',
  ADMIN: 'admin',
  VENDOR: 'vendor',
  PRODUCT: 'product',
  CATEGORY: 'category',
  BRAND: 'brand',
  ORDER: 'order',
  PAYMENT: 'payment',
  SHIPMENT: 'shipment',
  INVENTORY: 'inventory',
  WAREHOUSE: 'warehouse',
  SUPPLIER: 'supplier',
  COUPON: 'coupon',
  PROMOTION: 'promotion',
  FLASH_SALE: 'flash_sale',
  DEAL: 'deal',
  REVIEW: 'review',
  RATING: 'rating',
  COMMENT: 'comment',
  SETTINGS: 'settings',
  CONFIG: 'config',
  TEMPLATE: 'template',
  REPORT: 'report',
  ANALYTICS: 'analytics',
  NOTIFICATION: 'notification',
  LOG: 'log',
  AUDIT: 'audit',
  SESSION: 'session',
  DEVICE: 'device',
  VERIFICATION: 'verification',
  BACKUP: 'backup',
  INTEGRATION: 'integration',
  WEBHOOK: 'webhook',
  API_KEY: 'api_key',
  SYSTEM: 'system',
} as const;

/**
 * Admin permissions grouped by module
 */
export const ADMIN_PERMISSIONS = {
  // User management
  USER_VIEW: 'user:view',
  USER_CREATE: 'user:create',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_SUSPEND: 'user:suspend',
  USER_VERIFY: 'user:verify',

  // Admin management
  ADMIN_VIEW: 'admin:view',
  ADMIN_CREATE: 'admin:create',
  ADMIN_UPDATE: 'admin:update',
  ADMIN_DELETE: 'admin:delete',
  ADMIN_PROMOTE: 'admin:promote',
  ADMIN_DEMOTE: 'admin:demote',

  // Vendor management
  VENDOR_VIEW: 'vendor:view',
  VENDOR_CREATE: 'vendor:create',
  VENDOR_UPDATE: 'vendor:update',
  VENDOR_DELETE: 'vendor:delete',
  VENDOR_VERIFY: 'vendor:verify',
  VENDOR_SUSPEND: 'vendor:suspend',

  // Product management
  PRODUCT_VIEW: 'product:view',
  PRODUCT_CREATE: 'product:create',
  PRODUCT_UPDATE: 'product:update',
  PRODUCT_DELETE: 'product:delete',
  PRODUCT_APPROVE: 'product:approve',
  PRODUCT_REJECT: 'product:reject',

  // Order management
  ORDER_VIEW: 'order:view',
  ORDER_UPDATE: 'order:update',
  ORDER_CANCEL: 'order:cancel',
  ORDER_REFUND: 'order:refund',
  ORDER_SHIP: 'order:ship',

  // Payment management
  PAYMENT_VIEW: 'payment:view',
  PAYMENT_REFUND: 'payment:refund',
  PAYMENT_CAPTURE: 'payment:capture',
  PAYMENT_VOID: 'payment:void',

  // Settings management
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_UPDATE: 'settings:update',
  CONFIG_VIEW: 'config:view',
  CONFIG_UPDATE: 'config:update',

  // Report management
  REPORT_VIEW: 'report:view',
  REPORT_GENERATE: 'report:generate',
  REPORT_EXPORT: 'report:export',

  // Analytics management
  ANALYTICS_VIEW: 'analytics:view',
  ANALYTICS_EXPORT: 'analytics:export',

  // System management
  SYSTEM_MAINTENANCE: 'system:maintenance',
  SYSTEM_BACKUP: 'system:backup',
  SYSTEM_RESTORE: 'system:restore',
  SYSTEM_LOGS: 'system:logs',
  SYSTEM_AUDIT: 'system:audit',
} as const;

/**
 * Admin color mapping - ONLY for core admin statuses
 * Note: ADMIN_STATUS is exported from admin-status.constants.ts
 */
export const ADMIN_COLOR: Record<string, string> = {
  [STATUS.ACTIVE]: 'success',
  [STATUS.INACTIVE]: 'default',
  [STATUS.PENDING]: 'warning',
  [STATUS.SUSPENDED]: 'error',
  [STATUS.DELETED]: 'error',
  [STATUS.ARCHIVED]: 'default',
  [STATUS.VERIFIED]: 'success',
  [STATUS.UNVERIFIED]: 'warning',
  [STATUS.LOCKED]: 'error',
  [STATUS.UNLOCKED]: 'success',
  [STATUS.BLOCKED]: 'error',
  [STATUS.ENABLED]: 'success',
  [STATUS.DISABLED]: 'error',
};

/**
 * Admin label mapping - ONLY for core admin statuses
 * Note: ADMIN_STATUS is exported from admin-status.constants.ts
 */
export const ADMIN_LABEL: Record<string, string> = {
  [STATUS.ACTIVE]: 'Active',
  [STATUS.INACTIVE]: 'Inactive',
  [STATUS.PENDING]: 'Pending',
  [STATUS.SUSPENDED]: 'Suspended',
  [STATUS.DELETED]: 'Deleted',
  [STATUS.ARCHIVED]: 'Archived',
  [STATUS.VERIFIED]: 'Verified',
  [STATUS.UNVERIFIED]: 'Unverified',
  [STATUS.LOCKED]: 'Locked',
  [STATUS.UNLOCKED]: 'Unlocked',
  [STATUS.BLOCKED]: 'Blocked',
  [STATUS.ENABLED]: 'Enabled',
  [STATUS.DISABLED]: 'Disabled',
};

/**
 * Check if admin status is active
 * Note: ADMIN_STATUS is exported from admin-status.constants.ts
 */
export function isAdminActive(status: string): boolean {
  const activeStatuses: string[] = [
    STATUS.ACTIVE,
    STATUS.VERIFIED,
    STATUS.ENABLED,
    STATUS.UNLOCKED,
  ];
  return activeStatuses.includes(status) || isActiveStatus(status);
}

/**
 * Check if admin status is inactive
 * Note: ADMIN_STATUS is exported from admin-status.constants.ts
 */
export function isAdminInactive(status: string): boolean {
  const inactiveStatuses: string[] = [
    STATUS.INACTIVE,
    STATUS.SUSPENDED,
    STATUS.DELETED,
    STATUS.BLOCKED,
    STATUS.DISABLED,
    STATUS.LOCKED,
  ];
  return inactiveStatuses.includes(status) || isInactiveStatus(status);
}

/**
 * Check if admin can perform actions
 * Note: ADMIN_STATUS is exported from admin-status.constants.ts
 */
export function canAdminPerformActions(status: string): boolean {
  const allowedStatuses: string[] = [
    STATUS.ACTIVE,
    STATUS.VERIFIED,
    STATUS.ENABLED,
    STATUS.UNLOCKED,
  ];
  return allowedStatuses.includes(status);
}

/**
 * Get admin status color
 * Note: ADMIN_STATUS is exported from admin-status.constants.ts
 */
export function getAdminStatusColor(status: string): string {
  return ADMIN_COLOR[status] || getStatusColor(status) || 'default';
}

/**
 * Get admin status label
 * Note: ADMIN_STATUS is exported from admin-status.constants.ts
 */
export function getAdminStatusLabel(status: string): string {
  return ADMIN_LABEL[status] || getStatusLabel(status) || status;
}

/**
 * Get admin level priority (higher number = higher level)
 * Note: ADMIN_LEVEL is exported from admin-level.constants.ts
 */
export function getAdminLevelPriority(level: string): number {
  const levelPriority: Record<string, number> = {
    ['junior']: 1,
    ['senior']: 2,
    ['expert']: 3,
    ['lead']: 4,
    ['manager']: 5,
    ['director']: 6,
    ['vice_president']: 7,
    ['c_level']: 8,
    ['executive']: 9,
  };
  return levelPriority[level] || 0;
}

/**
 * Get admin department color
 * Note: ADMIN_DEPARTMENT is exported from admin-department.constants.ts
 */
export function getAdminDepartmentColor(department: string): string {
  const departmentColors: Record<string, string> = {
    ['management']: '#2E86AB',
    ['operations']: '#A23B72',
    ['technical']: '#F18F01',
    ['development']: '#2D6A4F',
    ['design']: '#D81159',
    ['marketing']: '#F7A072',
    ['sales']: '#6A994E',
    ['support']: '#BC4B51',
    ['finance']: '#1B4332',
    ['accounting']: '#40916C',
    ['legal']: '#7400B8',
    ['human_resources']: '#6930C3',
    ['administration']: '#023E8A',
    ['compliance']: '#D90429',
    ['security']: '#2B2D42',
    ['analytics']: '#3A86FF',
    ['strategy']: '#8338EC',
    ['innovation']: '#FF006E',
    ['research']: '#3A0CA3',
    ['training']: '#4CC9F0',
  };
  return departmentColors[department] || '#6C757D';
}

/**
 * Build admin permission key
 * Note: buildAdminPermission is also exported from admin-permission.constants.ts
 * Using a different name to avoid conflict
 */
export function buildAdminPermissionKey(module: string, action: string): string {
  return `${module}:${action}`;
}

/**
 * Check if admin has permission
 */
export function hasAdminPermission(permissions: string[], requiredPermission: string): boolean {
  return permissions.includes(requiredPermission);
}

/**
 * Check if admin has any of the permissions
 */
export function hasAnyAdminPermission(
  permissions: string[],
  requiredPermissions: string[]
): boolean {
  return requiredPermissions.some((p) => permissions.includes(p));
}

/**
 * Check if admin has all of the permissions
 */
export function hasAllAdminPermissions(
  permissions: string[],
  requiredPermissions: string[]
): boolean {
  return requiredPermissions.every((p) => permissions.includes(p));
}

/**
 * Get admin type label
 * Note: ADMIN_TYPE is exported from admin-type.constants.ts
 */
export function getAdminTypeLabel(type: string): string {
  const labels: Record<string, string> = {
    [ADMIN_TYPES.SYSTEM]: 'System Admin',
    [ADMIN_TYPES.BUSINESS]: 'Business Admin',
    [ADMIN_TYPES.TECHNICAL]: 'Technical Admin',
    [ADMIN_TYPES.CONTENT]: 'Content Admin',
    [ADMIN_TYPES.USER]: 'User Admin',
    [ADMIN_TYPES.PRODUCT]: 'Product Admin',
    [ADMIN_TYPES.ORDER]: 'Order Admin',
    [ADMIN_TYPES.PAYMENT]: 'Payment Admin',
    [ADMIN_TYPES.SHIPPING]: 'Shipping Admin',
    [ADMIN_TYPES.INVENTORY]: 'Inventory Admin',
    [ADMIN_TYPES.MARKETING]: 'Marketing Admin',
    [ADMIN_TYPES.SALES]: 'Sales Admin',
    [ADMIN_TYPES.SUPPORT]: 'Support Admin',
    [ADMIN_TYPES.SECURITY]: 'Security Admin',
    [ADMIN_TYPES.COMPLIANCE]: 'Compliance Admin',
    [ADMIN_TYPES.ANALYTICS]: 'Analytics Admin',
    [ADMIN_TYPES.REPORT]: 'Report Admin',
    [ADMIN_TYPES.INTEGRATION]: 'Integration Admin',
    [ADMIN_TYPES.BACKUP]: 'Backup Admin',
    [ADMIN_TYPES.MAINTENANCE]: 'Maintenance Admin',
  };
  return labels[type] || type;
}

/**
 * Get admin resource label
 */
export function getAdminResourceLabel(resource: string): string {
  const labels: Record<string, string> = {
    [ADMIN_RESOURCE.USER]: 'User',
    [ADMIN_RESOURCE.ADMIN]: 'Admin',
    [ADMIN_RESOURCE.VENDOR]: 'Vendor',
    [ADMIN_RESOURCE.PRODUCT]: 'Product',
    [ADMIN_RESOURCE.CATEGORY]: 'Category',
    [ADMIN_RESOURCE.BRAND]: 'Brand',
    [ADMIN_RESOURCE.ORDER]: 'Order',
    [ADMIN_RESOURCE.PAYMENT]: 'Payment',
    [ADMIN_RESOURCE.SHIPMENT]: 'Shipment',
    [ADMIN_RESOURCE.INVENTORY]: 'Inventory',
    [ADMIN_RESOURCE.WAREHOUSE]: 'Warehouse',
    [ADMIN_RESOURCE.SUPPLIER]: 'Supplier',
    [ADMIN_RESOURCE.COUPON]: 'Coupon',
    [ADMIN_RESOURCE.PROMOTION]: 'Promotion',
    [ADMIN_RESOURCE.FLASH_SALE]: 'Flash Sale',
    [ADMIN_RESOURCE.DEAL]: 'Deal',
    [ADMIN_RESOURCE.REVIEW]: 'Review',
    [ADMIN_RESOURCE.RATING]: 'Rating',
    [ADMIN_RESOURCE.COMMENT]: 'Comment',
    [ADMIN_RESOURCE.SETTINGS]: 'Settings',
    [ADMIN_RESOURCE.CONFIG]: 'Configuration',
    [ADMIN_RESOURCE.TEMPLATE]: 'Template',
    [ADMIN_RESOURCE.REPORT]: 'Report',
    [ADMIN_RESOURCE.ANALYTICS]: 'Analytics',
    [ADMIN_RESOURCE.NOTIFICATION]: 'Notification',
    [ADMIN_RESOURCE.LOG]: 'Log',
    [ADMIN_RESOURCE.AUDIT]: 'Audit',
    [ADMIN_RESOURCE.SESSION]: 'Session',
    [ADMIN_RESOURCE.DEVICE]: 'Device',
    [ADMIN_RESOURCE.VERIFICATION]: 'Verification',
    [ADMIN_RESOURCE.BACKUP]: 'Backup',
    [ADMIN_RESOURCE.INTEGRATION]: 'Integration',
    [ADMIN_RESOURCE.WEBHOOK]: 'Webhook',
    [ADMIN_RESOURCE.API_KEY]: 'API Key',
    [ADMIN_RESOURCE.SYSTEM]: 'System',
  };
  return labels[resource] || resource;
}
