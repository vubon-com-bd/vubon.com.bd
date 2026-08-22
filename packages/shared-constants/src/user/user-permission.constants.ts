/**
 * User Permission Constants
 * Defines all possible user permissions
 */

export const USER_PERMISSION = {
  // Account permissions
  ACCOUNT_VIEW: 'account:view',
  ACCOUNT_UPDATE: 'account:update',
  ACCOUNT_DELETE: 'account:delete',
  ACCOUNT_SUSPEND: 'account:suspend',
  ACCOUNT_ACTIVATE: 'account:activate',

  // Profile permissions
  PROFILE_VIEW: 'profile:view',
  PROFILE_UPDATE: 'profile:update',
  PROFILE_AVATAR: 'profile:avatar',

  // Address permissions
  ADDRESS_VIEW: 'address:view',
  ADDRESS_CREATE: 'address:create',
  ADDRESS_UPDATE: 'address:update',
  ADDRESS_DELETE: 'address:delete',

  // Order permissions
  ORDER_VIEW: 'order:view',
  ORDER_CREATE: 'order:create',
  ORDER_UPDATE: 'order:update',
  ORDER_CANCEL: 'order:cancel',
  ORDER_DELETE: 'order:delete',

  // Cart permissions
  CART_VIEW: 'cart:view',
  CART_UPDATE: 'cart:update',
  CART_CLEAR: 'cart:clear',

  // Wishlist permissions
  WISHLIST_VIEW: 'wishlist:view',
  WISHLIST_UPDATE: 'wishlist:update',
  WISHLIST_CLEAR: 'wishlist:clear',

  // Review permissions
  REVIEW_VIEW: 'review:view',
  REVIEW_CREATE: 'review:create',
  REVIEW_UPDATE: 'review:update',
  REVIEW_DELETE: 'review:delete',

  // Product permissions
  PRODUCT_VIEW: 'product:view',
  PRODUCT_CREATE: 'product:create',
  PRODUCT_UPDATE: 'product:update',
  PRODUCT_DELETE: 'product:delete',
  PRODUCT_APPROVE: 'product:approve',

  // Inventory permissions
  INVENTORY_VIEW: 'inventory:view',
  INVENTORY_UPDATE: 'inventory:update',
  INVENTORY_ADJUST: 'inventory:adjust',

  // Vendor permissions
  VENDOR_VIEW: 'vendor:view',
  VENDOR_CREATE: 'vendor:create',
  VENDOR_UPDATE: 'vendor:update',
  VENDOR_DELETE: 'vendor:delete',
  VENDOR_APPROVE: 'vendor:approve',

  // User management permissions
  USER_VIEW: 'user:view',
  USER_CREATE: 'user:create',
  USER_UPDATE: 'user:update',
  USER_DELETE: 'user:delete',
  USER_MANAGE: 'user:manage',

  // Role permissions
  ROLE_VIEW: 'role:view',
  ROLE_CREATE: 'role:create',
  ROLE_UPDATE: 'role:update',
  ROLE_DELETE: 'role:delete',

  // Permission permissions
  PERMISSION_VIEW: 'permission:view',
  PERMISSION_UPDATE: 'permission:update',

  // Analytics permissions
  ANALYTICS_VIEW: 'analytics:view',
  ANALYTICS_EXPORT: 'analytics:export',

  // Report permissions
  REPORT_VIEW: 'report:view',
  REPORT_CREATE: 'report:create',
  REPORT_EXPORT: 'report:export',

  // Settings permissions
  SETTINGS_VIEW: 'settings:view',
  SETTINGS_UPDATE: 'settings:update',

  // Payment permissions
  PAYMENT_VIEW: 'payment:view',
  PAYMENT_PROCESS: 'payment:process',
  PAYMENT_REFUND: 'payment:refund',

  // Notification permissions
  NOTIFICATION_VIEW: 'notification:view',
  NOTIFICATION_SEND: 'notification:send',
  NOTIFICATION_MANAGE: 'notification:manage',

  // Support permissions
  SUPPORT_VIEW: 'support:view',
  SUPPORT_CREATE: 'support:create',
  SUPPORT_UPDATE: 'support:update',
  SUPPORT_DELETE: 'support:delete',

  // SEO permissions
  SEO_VIEW: 'seo:view',
  SEO_UPDATE: 'seo:update',
  SEO_MANAGE: 'seo:manage',

  // Marketing permissions
  MARKETING_VIEW: 'marketing:view',
  MARKETING_CREATE: 'marketing:create',
  MARKETING_UPDATE: 'marketing:update',
  MARKETING_DELETE: 'marketing:delete',

  // AI permissions
  AI_VIEW: 'ai:view',
  AI_MANAGE: 'ai:manage',
  AI_TRAIN: 'ai:train',

  // System permissions
  SYSTEM_VIEW: 'system:view',
  SYSTEM_UPDATE: 'system:update',
  SYSTEM_MANAGE: 'system:manage',

  // All permissions (super admin only)
  ALL: '*',
} as const;

export type UserPermission = (typeof USER_PERMISSION)[keyof typeof USER_PERMISSION];

export const USER_PERMISSION_CATEGORIES: Record<string, readonly UserPermission[]> = {
  ACCOUNT: [
    USER_PERMISSION.ACCOUNT_VIEW,
    USER_PERMISSION.ACCOUNT_UPDATE,
    USER_PERMISSION.ACCOUNT_DELETE,
    USER_PERMISSION.ACCOUNT_SUSPEND,
    USER_PERMISSION.ACCOUNT_ACTIVATE,
  ] as const,
  PROFILE: [
    USER_PERMISSION.PROFILE_VIEW,
    USER_PERMISSION.PROFILE_UPDATE,
    USER_PERMISSION.PROFILE_AVATAR,
  ] as const,
  ADDRESS: [
    USER_PERMISSION.ADDRESS_VIEW,
    USER_PERMISSION.ADDRESS_CREATE,
    USER_PERMISSION.ADDRESS_UPDATE,
    USER_PERMISSION.ADDRESS_DELETE,
  ] as const,
  ORDER: [
    USER_PERMISSION.ORDER_VIEW,
    USER_PERMISSION.ORDER_CREATE,
    USER_PERMISSION.ORDER_UPDATE,
    USER_PERMISSION.ORDER_CANCEL,
    USER_PERMISSION.ORDER_DELETE,
  ] as const,
  CART: [
    USER_PERMISSION.CART_VIEW,
    USER_PERMISSION.CART_UPDATE,
    USER_PERMISSION.CART_CLEAR,
  ] as const,
  WISHLIST: [
    USER_PERMISSION.WISHLIST_VIEW,
    USER_PERMISSION.WISHLIST_UPDATE,
    USER_PERMISSION.WISHLIST_CLEAR,
  ] as const,
  REVIEW: [
    USER_PERMISSION.REVIEW_VIEW,
    USER_PERMISSION.REVIEW_CREATE,
    USER_PERMISSION.REVIEW_UPDATE,
    USER_PERMISSION.REVIEW_DELETE,
  ] as const,
  PRODUCT: [
    USER_PERMISSION.PRODUCT_VIEW,
    USER_PERMISSION.PRODUCT_CREATE,
    USER_PERMISSION.PRODUCT_UPDATE,
    USER_PERMISSION.PRODUCT_DELETE,
    USER_PERMISSION.PRODUCT_APPROVE,
  ] as const,
  INVENTORY: [
    USER_PERMISSION.INVENTORY_VIEW,
    USER_PERMISSION.INVENTORY_UPDATE,
    USER_PERMISSION.INVENTORY_ADJUST,
  ] as const,
  VENDOR: [
    USER_PERMISSION.VENDOR_VIEW,
    USER_PERMISSION.VENDOR_CREATE,
    USER_PERMISSION.VENDOR_UPDATE,
    USER_PERMISSION.VENDOR_DELETE,
    USER_PERMISSION.VENDOR_APPROVE,
  ] as const,
  USER_MANAGEMENT: [
    USER_PERMISSION.USER_VIEW,
    USER_PERMISSION.USER_CREATE,
    USER_PERMISSION.USER_UPDATE,
    USER_PERMISSION.USER_DELETE,
    USER_PERMISSION.USER_MANAGE,
  ] as const,
  ROLE: [
    USER_PERMISSION.ROLE_VIEW,
    USER_PERMISSION.ROLE_CREATE,
    USER_PERMISSION.ROLE_UPDATE,
    USER_PERMISSION.ROLE_DELETE,
  ] as const,
  PERMISSION: [USER_PERMISSION.PERMISSION_VIEW, USER_PERMISSION.PERMISSION_UPDATE] as const,
  ANALYTICS: [USER_PERMISSION.ANALYTICS_VIEW, USER_PERMISSION.ANALYTICS_EXPORT] as const,
  REPORT: [
    USER_PERMISSION.REPORT_VIEW,
    USER_PERMISSION.REPORT_CREATE,
    USER_PERMISSION.REPORT_EXPORT,
  ] as const,
  SETTINGS: [USER_PERMISSION.SETTINGS_VIEW, USER_PERMISSION.SETTINGS_UPDATE] as const,
  PAYMENT: [
    USER_PERMISSION.PAYMENT_VIEW,
    USER_PERMISSION.PAYMENT_PROCESS,
    USER_PERMISSION.PAYMENT_REFUND,
  ] as const,
  NOTIFICATION: [
    USER_PERMISSION.NOTIFICATION_VIEW,
    USER_PERMISSION.NOTIFICATION_SEND,
    USER_PERMISSION.NOTIFICATION_MANAGE,
  ] as const,
  SUPPORT: [
    USER_PERMISSION.SUPPORT_VIEW,
    USER_PERMISSION.SUPPORT_CREATE,
    USER_PERMISSION.SUPPORT_UPDATE,
    USER_PERMISSION.SUPPORT_DELETE,
  ] as const,
  SEO: [USER_PERMISSION.SEO_VIEW, USER_PERMISSION.SEO_UPDATE, USER_PERMISSION.SEO_MANAGE] as const,
  MARKETING: [
    USER_PERMISSION.MARKETING_VIEW,
    USER_PERMISSION.MARKETING_CREATE,
    USER_PERMISSION.MARKETING_UPDATE,
    USER_PERMISSION.MARKETING_DELETE,
  ] as const,
  AI: [USER_PERMISSION.AI_VIEW, USER_PERMISSION.AI_MANAGE, USER_PERMISSION.AI_TRAIN] as const,
  SYSTEM: [
    USER_PERMISSION.SYSTEM_VIEW,
    USER_PERMISSION.SYSTEM_UPDATE,
    USER_PERMISSION.SYSTEM_MANAGE,
  ] as const,
} as const;

export type UserPermissionCategory = keyof typeof USER_PERMISSION_CATEGORIES;

export function hasPermission(
  permissions: readonly UserPermission[],
  requiredPermission: UserPermission
): boolean {
  return permissions.includes(requiredPermission) || permissions.includes(USER_PERMISSION.ALL);
}

export function hasAnyPermission(
  permissions: readonly UserPermission[],
  requiredPermissions: readonly UserPermission[]
): boolean {
  return requiredPermissions.some((permission) => hasPermission(permissions, permission));
}

export function hasAllPermissions(
  permissions: readonly UserPermission[],
  requiredPermissions: readonly UserPermission[]
): boolean {
  return requiredPermissions.every((permission) => hasPermission(permissions, permission));
}

export function getCategoryPermissions(
  category: UserPermissionCategory
): readonly UserPermission[] {
  return USER_PERMISSION_CATEGORIES[category] || [];
}

export function isSystemPermission(permission: UserPermission): boolean {
  return permission.startsWith('system:');
}

export function isAdminPermission(permission: UserPermission): boolean {
  return permission.startsWith('admin:') || permission.includes('manage');
}

export function getPermissionResource(permission: UserPermission): string {
  return permission.split(':')[0] || '';
}

export function getPermissionAction(permission: UserPermission): string {
  const parts = permission.split(':');
  return parts[parts.length - 1] || '';
}
