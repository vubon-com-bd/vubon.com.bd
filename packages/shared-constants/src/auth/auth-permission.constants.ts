/**
 * Authentication Permission Constants
 * Permission definitions for access control and authorization
 */

/**
 * Base Permissions
 * Core permissions for all users
 */
export const BASE_PERMISSIONS = {
  /** View own profile */
  VIEW_PROFILE: 'view:profile',
  /** Update own profile */
  UPDATE_PROFILE: 'update:profile',
  /** Delete own account */
  DELETE_ACCOUNT: 'delete:account',
  /** View own orders */
  VIEW_ORDERS: 'view:orders',
  /** Create orders */
  CREATE_ORDERS: 'create:orders',
  /** Update own orders */
  UPDATE_ORDERS: 'update:orders',
  /** Cancel own orders */
  CANCEL_ORDERS: 'cancel:orders',
  /** View own payments */
  VIEW_PAYMENTS: 'view:payments',
  /** Create payments */
  CREATE_PAYMENTS: 'create:payments',
  /** View own cart */
  VIEW_CART: 'view:cart',
  /** Update own cart */
  UPDATE_CART: 'update:cart',
  /** Clear own cart */
  CLEAR_CART: 'clear:cart',
  /** View own wishlist */
  VIEW_WISHLIST: 'view:wishlist',
  /** Update own wishlist */
  UPDATE_WISHLIST: 'update:wishlist',
  /** View own reviews */
  VIEW_REVIEWS: 'view:reviews',
  /** Create reviews */
  CREATE_REVIEWS: 'create:reviews',
  /** Update own reviews */
  UPDATE_REVIEWS: 'update:reviews',
  /** Delete own reviews */
  DELETE_REVIEWS: 'delete:reviews',
  /** View own addresses */
  VIEW_ADDRESSES: 'view:addresses',
  /** Create addresses */
  CREATE_ADDRESSES: 'create:addresses',
  /** Update own addresses */
  UPDATE_ADDRESSES: 'update:addresses',
  /** Delete own addresses */
  DELETE_ADDRESSES: 'delete:addresses',
  /** View own devices */
  VIEW_DEVICES: 'view:devices',
  /** Remove own devices */
  REMOVE_DEVICES: 'remove:devices',
  /** View notifications */
  VIEW_NOTIFICATIONS: 'view:notifications',
  /** Mark notifications as read */
  READ_NOTIFICATIONS: 'read:notifications',
  /** Delete notifications */
  DELETE_NOTIFICATIONS: 'delete:notifications',
} as const;

export type BasePermission = (typeof BASE_PERMISSIONS)[keyof typeof BASE_PERMISSIONS];

/**
 * User Permissions
 * Extended permissions for regular users
 */
export const USER_PERMISSIONS = {
  ...BASE_PERMISSIONS,
  /** View user list (limited) */
  VIEW_USERS: 'view:users',
  /** Export user data */
  EXPORT_DATA: 'export:data',
  /** Request data deletion */
  REQUEST_DELETION: 'request:deletion',
  /** Manage preferences */
  MANAGE_PREFERENCES: 'manage:preferences',
  /** View analytics (limited) */
  VIEW_ANALYTICS: 'view:analytics',
  /** Download invoices */
  DOWNLOAD_INVOICES: 'download:invoices',
  /** Request refunds */
  REQUEST_REFUNDS: 'request:refunds',
  /** Track shipments */
  TRACK_SHIPMENTS: 'track:shipments',
  /** Manage subscriptions */
  MANAGE_SUBSCRIPTIONS: 'manage:subscriptions',
  /** Use promo codes */
  USE_PROMO_CODES: 'use:promo-codes',
  /** View loyalty points */
  VIEW_LOYALTY: 'view:loyalty',
  /** Redeem loyalty points */
  REDEEM_LOYALTY: 'redeem:loyalty',
  /** View support tickets */
  VIEW_TICKETS: 'view:tickets',
  /** Create support tickets */
  CREATE_TICKETS: 'create:tickets',
  /** Update own tickets */
  UPDATE_TICKETS: 'update:tickets',
  /** Close own tickets */
  CLOSE_TICKETS: 'close:tickets',
} as const;

export type UserPermission = (typeof USER_PERMISSIONS)[keyof typeof USER_PERMISSIONS];

/**
 * Admin Permissions
 * Administrative permissions for platform management
 */
export const ADMIN_PERMISSIONS = {
  ...USER_PERMISSIONS,
  /** View all users */
  VIEW_ALL_USERS: 'view:all-users',
  /** Create users */
  CREATE_USERS: 'create:users',
  /** Update any user */
  UPDATE_USERS: 'update:users',
  /** Delete any user */
  DELETE_USERS: 'delete:users',
  /** Block users */
  BLOCK_USERS: 'block:users',
  /** Suspend users */
  SUSPEND_USERS: 'suspend:users',
  /** View user roles */
  VIEW_ROLES: 'view:roles',
  /** Create roles */
  CREATE_ROLES: 'create:roles',
  /** Update roles */
  UPDATE_ROLES: 'update:roles',
  /** Delete roles */
  DELETE_ROLES: 'delete:roles',
  /** View permissions */
  VIEW_PERMISSIONS: 'view:permissions',
  /** Create permissions */
  CREATE_PERMISSIONS: 'create:permissions',
  /** Update permissions */
  UPDATE_PERMISSIONS: 'update:permissions',
  /** Delete permissions */
  DELETE_PERMISSIONS: 'delete:permissions',
  /** View all orders */
  VIEW_ALL_ORDERS: 'view:all-orders',
  /** Update any order */
  UPDATE_ALL_ORDERS: 'update:all-orders',
  /** Cancel any order */
  CANCEL_ALL_ORDERS: 'cancel:all-orders',
  /** View all payments */
  VIEW_ALL_PAYMENTS: 'view:all-payments',
  /** Process refunds */
  PROCESS_REFUNDS: 'process:refunds',
  /** View all products */
  VIEW_ALL_PRODUCTS: 'view:all-products',
  /** Create products */
  CREATE_PRODUCTS: 'create:products',
  /** Update any product */
  UPDATE_PRODUCTS: 'update:products',
  /** Delete products */
  DELETE_PRODUCTS: 'delete:products',
  /** Manage categories */
  MANAGE_CATEGORIES: 'manage:categories',
  /** Manage brands */
  MANAGE_BRANDS: 'manage:brands',
  /** Manage inventory */
  MANAGE_INVENTORY: 'manage:inventory',
  /** View vendors */
  VIEW_VENDORS: 'view:vendors',
  /** Create vendors */
  CREATE_VENDORS: 'create:vendors',
  /** Update vendors */
  UPDATE_VENDORS: 'update:vendors',
  /** Delete vendors */
  DELETE_VENDORS: 'delete:vendors',
  /** Verify vendors */
  VERIFY_VENDORS: 'verify:vendors',
  /** Manage vendor commissions */
  MANAGE_COMMISSIONS: 'manage:commissions',
  /** View analytics */
  VIEW_ALL_ANALYTICS: 'view:all-analytics',
  /** Generate reports */
  GENERATE_REPORTS: 'generate:reports',
  /** Export data */
  EXPORT_ALL_DATA: 'export:all-data',
  /** View logs */
  VIEW_LOGS: 'view:logs',
  /** View audit trails */
  VIEW_AUDIT: 'view:audit',
  /** Manage settings */
  MANAGE_SETTINGS: 'manage:settings',
  /** Manage system configuration */
  MANAGE_CONFIG: 'manage:config',
  /** View support tickets all */
  VIEW_ALL_TICKETS: 'view:all-tickets',
  /** Manage support tickets */
  MANAGE_TICKETS: 'manage:tickets',
  /** View notifications all */
  VIEW_ALL_NOTIFICATIONS: 'view:all-notifications',
  /** Send notifications */
  SEND_NOTIFICATIONS: 'send:notifications',
  /** Manage campaigns */
  MANAGE_CAMPAIGNS: 'manage:campaigns',
  /** Manage promotions */
  MANAGE_PROMOTIONS: 'manage:promotions',
  /** Manage coupons */
  MANAGE_COUPONS: 'manage:coupons',
  /** Manage shipping */
  MANAGE_SHIPPING: 'manage:shipping',
  /** Manage taxes */
  MANAGE_TAXES: 'manage:taxes',
  /** Manage payment gateways */
  MANAGE_GATEWAYS: 'manage:gateways',
  /** Manage content */
  MANAGE_CONTENT: 'manage:content',
  /** Manage pages */
  MANAGE_PAGES: 'manage:pages',
  /** Manage SEO */
  MANAGE_SEO: 'manage:seo',
  /** Manage media */
  MANAGE_MEDIA: 'manage:media',
  /** Manage themes */
  MANAGE_THEMES: 'manage:themes',
  /** Manage plugins */
  MANAGE_PLUGINS: 'manage:plugins',
  /** Manage backups */
  MANAGE_BACKUPS: 'manage:backups',
  /** Manage maintenance */
  MANAGE_MAINTENANCE: 'manage:maintenance',
} as const;

export type AdminPermission = (typeof ADMIN_PERMISSIONS)[keyof typeof ADMIN_PERMISSIONS];

/**
 * Super Admin Permissions
 * All permissions for super administrators
 */
export const SUPER_ADMIN_PERMISSIONS = {
  ...ADMIN_PERMISSIONS,
  /** Manage all system */
  MANAGE_SYSTEM: 'manage:system',
  /** Manage all security */
  MANAGE_SECURITY: 'manage:security',
  /** Manage all database */
  MANAGE_DATABASE: 'manage:database',
  /** Manage all server */
  MANAGE_SERVER: 'manage:server',
  /** Manage all networks */
  MANAGE_NETWORKS: 'manage:networks',
  /** Manage all admin users */
  MANAGE_ADMINS: 'manage:admins',
  /** Manage all permissions */
  MANAGE_ALL_PERMISSIONS: 'manage:all-permissions',
  /** Assign any role */
  ASSIGN_ROLES: 'assign:roles',
  /** Revoke any role */
  REVOKE_ROLES: 'revoke:roles',
  /** View all system logs */
  VIEW_SYSTEM_LOGS: 'view:system-logs',
  /** View all security logs */
  VIEW_SECURITY_LOGS: 'view:security-logs',
  /** Perform system migrations */
  PERFORM_MIGRATIONS: 'perform:migrations',
  /** Manage API keys */
  MANAGE_API_KEYS: 'manage:api-keys',
  /** Manage webhooks */
  MANAGE_WEBHOOKS: 'manage:webhooks',
  /** Manage third-party integrations */
  MANAGE_INTEGRATIONS: 'manage:integrations',
  /** Manage legal documents */
  MANAGE_LEGAL: 'manage:legal',
  /** Manage GDPR compliance */
  MANAGE_COMPLIANCE: 'manage:compliance',
  /** Manage fraud detection */
  MANAGE_FRAUD: 'manage:fraud',
  /** Manage rate limiting */
  MANAGE_RATE_LIMITS: 'manage:rate-limits',
  /** Manage throttling */
  MANAGE_THROTTLING: 'manage:throttling',
  /** Manage emergency access */
  EMERGENCY_ACCESS: 'emergency:access',
  /** Manage disaster recovery */
  MANAGE_RECOVERY: 'manage:recovery',
} as const;

export type SuperAdminPermission =
  (typeof SUPER_ADMIN_PERMISSIONS)[keyof typeof SUPER_ADMIN_PERMISSIONS];

/**
 * All Permissions
 * Combined all permissions
 */
export const ALL_PERMISSIONS = {
  ...BASE_PERMISSIONS,
  ...USER_PERMISSIONS,
  ...ADMIN_PERMISSIONS,
  ...SUPER_ADMIN_PERMISSIONS,
} as const;

export type Permission = (typeof ALL_PERMISSIONS)[keyof typeof ALL_PERMISSIONS];

/**
 * Permission Categories
 * Categories for grouping permissions
 */
export const PERMISSION_CATEGORIES = {
  PROFILE: 'profile',
  ORDERS: 'orders',
  PAYMENTS: 'payments',
  PRODUCTS: 'products',
  VENDORS: 'vendors',
  USERS: 'users',
  ROLES: 'roles',
  PERMISSIONS: 'permissions',
  CART: 'cart',
  WISHLIST: 'wishlist',
  REVIEWS: 'reviews',
  ADDRESSES: 'addresses',
  DEVICES: 'devices',
  NOTIFICATIONS: 'notifications',
  ANALYTICS: 'analytics',
  REPORTS: 'reports',
  TICKETS: 'tickets',
  SETTINGS: 'settings',
  CONFIG: 'config',
  CONTENT: 'content',
  SEO: 'seo',
  MEDIA: 'media',
  THEMES: 'themes',
  PLUGINS: 'plugins',
  CAMPAIGNS: 'campaigns',
  PROMOTIONS: 'promotions',
  COUPONS: 'coupons',
  SHIPPING: 'shipping',
  TAXES: 'taxes',
  GATEWAYS: 'gateways',
  SUBSCRIPTIONS: 'subscriptions',
  LOYALTY: 'loyalty',
  SUPPORT: 'support',
  LOGS: 'logs',
  AUDIT: 'audit',
  SECURITY: 'security',
  SYSTEM: 'system',
  DATABASE: 'database',
  SERVER: 'server',
  NETWORKS: 'networks',
  BACKUPS: 'backups',
  MAINTENANCE: 'maintenance',
  INTEGRATIONS: 'integrations',
  COMPLIANCE: 'compliance',
  FRAUD: 'fraud',
} as const;

export type PermissionCategory = (typeof PERMISSION_CATEGORIES)[keyof typeof PERMISSION_CATEGORIES];

/**
 * Permission Category Mapping
 * Maps each permission to its category
 */
export const PERMISSION_CATEGORY_MAP: Record<string, PermissionCategory> = {
  // Profile permissions
  'view:profile': PERMISSION_CATEGORIES.PROFILE,
  'update:profile': PERMISSION_CATEGORIES.PROFILE,
  'delete:account': PERMISSION_CATEGORIES.PROFILE,

  // Order permissions
  'view:orders': PERMISSION_CATEGORIES.ORDERS,
  'create:orders': PERMISSION_CATEGORIES.ORDERS,
  'update:orders': PERMISSION_CATEGORIES.ORDERS,
  'cancel:orders': PERMISSION_CATEGORIES.ORDERS,
  'view:all-orders': PERMISSION_CATEGORIES.ORDERS,
  'update:all-orders': PERMISSION_CATEGORIES.ORDERS,
  'cancel:all-orders': PERMISSION_CATEGORIES.ORDERS,

  // Payment permissions
  'view:payments': PERMISSION_CATEGORIES.PAYMENTS,
  'create:payments': PERMISSION_CATEGORIES.PAYMENTS,
  'view:all-payments': PERMISSION_CATEGORIES.PAYMENTS,
  'process:refunds': PERMISSION_CATEGORIES.PAYMENTS,

  // Product permissions
  'view:all-products': PERMISSION_CATEGORIES.PRODUCTS,
  'create:products': PERMISSION_CATEGORIES.PRODUCTS,
  'update:products': PERMISSION_CATEGORIES.PRODUCTS,
  'delete:products': PERMISSION_CATEGORIES.PRODUCTS,
  'manage:categories': PERMISSION_CATEGORIES.PRODUCTS,
  'manage:brands': PERMISSION_CATEGORIES.PRODUCTS,
  'manage:inventory': PERMISSION_CATEGORIES.PRODUCTS,

  // Vendor permissions
  'view:vendors': PERMISSION_CATEGORIES.VENDORS,
  'create:vendors': PERMISSION_CATEGORIES.VENDORS,
  'update:vendors': PERMISSION_CATEGORIES.VENDORS,
  'delete:vendors': PERMISSION_CATEGORIES.VENDORS,
  'verify:vendors': PERMISSION_CATEGORIES.VENDORS,
  'manage:commissions': PERMISSION_CATEGORIES.VENDORS,

  // User permissions
  'view:users': PERMISSION_CATEGORIES.USERS,
  'view:all-users': PERMISSION_CATEGORIES.USERS,
  'create:users': PERMISSION_CATEGORIES.USERS,
  'update:users': PERMISSION_CATEGORIES.USERS,
  'delete:users': PERMISSION_CATEGORIES.USERS,
  'block:users': PERMISSION_CATEGORIES.USERS,
  'suspend:users': PERMISSION_CATEGORIES.USERS,

  // Role permissions
  'view:roles': PERMISSION_CATEGORIES.ROLES,
  'create:roles': PERMISSION_CATEGORIES.ROLES,
  'update:roles': PERMISSION_CATEGORIES.ROLES,
  'delete:roles': PERMISSION_CATEGORIES.ROLES,
  'assign:roles': PERMISSION_CATEGORIES.ROLES,
  'revoke:roles': PERMISSION_CATEGORIES.ROLES,

  // Permission permissions
  'view:permissions': PERMISSION_CATEGORIES.PERMISSIONS,
  'create:permissions': PERMISSION_CATEGORIES.PERMISSIONS,
  'update:permissions': PERMISSION_CATEGORIES.PERMISSIONS,
  'delete:permissions': PERMISSION_CATEGORIES.PERMISSIONS,
  'manage:all-permissions': PERMISSION_CATEGORIES.PERMISSIONS,

  // Cart permissions
  'view:cart': PERMISSION_CATEGORIES.CART,
  'update:cart': PERMISSION_CATEGORIES.CART,
  'clear:cart': PERMISSION_CATEGORIES.CART,

  // Wishlist permissions
  'view:wishlist': PERMISSION_CATEGORIES.WISHLIST,
  'update:wishlist': PERMISSION_CATEGORIES.WISHLIST,

  // Review permissions
  'view:reviews': PERMISSION_CATEGORIES.REVIEWS,
  'create:reviews': PERMISSION_CATEGORIES.REVIEWS,
  'update:reviews': PERMISSION_CATEGORIES.REVIEWS,
  'delete:reviews': PERMISSION_CATEGORIES.REVIEWS,

  // Address permissions
  'view:addresses': PERMISSION_CATEGORIES.ADDRESSES,
  'create:addresses': PERMISSION_CATEGORIES.ADDRESSES,
  'update:addresses': PERMISSION_CATEGORIES.ADDRESSES,
  'delete:addresses': PERMISSION_CATEGORIES.ADDRESSES,

  // Device permissions
  'view:devices': PERMISSION_CATEGORIES.DEVICES,
  'remove:devices': PERMISSION_CATEGORIES.DEVICES,

  // Notification permissions
  'view:notifications': PERMISSION_CATEGORIES.NOTIFICATIONS,
  'read:notifications': PERMISSION_CATEGORIES.NOTIFICATIONS,
  'delete:notifications': PERMISSION_CATEGORIES.NOTIFICATIONS,
  'view:all-notifications': PERMISSION_CATEGORIES.NOTIFICATIONS,
  'send:notifications': PERMISSION_CATEGORIES.NOTIFICATIONS,

  // Analytics permissions
  'view:analytics': PERMISSION_CATEGORIES.ANALYTICS,
  'view:all-analytics': PERMISSION_CATEGORIES.ANALYTICS,
  'generate:reports': PERMISSION_CATEGORIES.REPORTS,

  // Ticket permissions
  'view:tickets': PERMISSION_CATEGORIES.TICKETS,
  'create:tickets': PERMISSION_CATEGORIES.TICKETS,
  'update:tickets': PERMISSION_CATEGORIES.TICKETS,
  'close:tickets': PERMISSION_CATEGORIES.TICKETS,
  'view:all-tickets': PERMISSION_CATEGORIES.TICKETS,
  'manage:tickets': PERMISSION_CATEGORIES.TICKETS,

  // Settings permissions
  'manage:settings': PERMISSION_CATEGORIES.SETTINGS,
  'manage:config': PERMISSION_CATEGORIES.CONFIG,

  // Content permissions
  'manage:content': PERMISSION_CATEGORIES.CONTENT,
  'manage:pages': PERMISSION_CATEGORIES.CONTENT,
  'manage:seo': PERMISSION_CATEGORIES.SEO,
  'manage:media': PERMISSION_CATEGORIES.MEDIA,
  'manage:themes': PERMISSION_CATEGORIES.THEMES,
  'manage:plugins': PERMISSION_CATEGORIES.PLUGINS,

  // Marketing permissions
  'manage:campaigns': PERMISSION_CATEGORIES.CAMPAIGNS,
  'manage:promotions': PERMISSION_CATEGORIES.PROMOTIONS,
  'manage:coupons': PERMISSION_CATEGORIES.COUPONS,

  // Logistics permissions
  'manage:shipping': PERMISSION_CATEGORIES.SHIPPING,
  'manage:taxes': PERMISSION_CATEGORIES.TAXES,
  'manage:gateways': PERMISSION_CATEGORIES.GATEWAYS,

  // Subscription permissions
  'manage:subscriptions': PERMISSION_CATEGORIES.SUBSCRIPTIONS,
  'use:promo-codes': PERMISSION_CATEGORIES.COUPONS,

  // Loyalty permissions
  'view:loyalty': PERMISSION_CATEGORIES.LOYALTY,
  'redeem:loyalty': PERMISSION_CATEGORIES.LOYALTY,

  // Log permissions
  'view:logs': PERMISSION_CATEGORIES.LOGS,
  'view:system-logs': PERMISSION_CATEGORIES.LOGS,
  'view:security-logs': PERMISSION_CATEGORIES.LOGS,

  // Audit permissions
  'view:audit': PERMISSION_CATEGORIES.AUDIT,

  // Security permissions
  'manage:security': PERMISSION_CATEGORIES.SECURITY,
  'manage:api-keys': PERMISSION_CATEGORIES.SECURITY,
  'manage:webhooks': PERMISSION_CATEGORIES.SECURITY,
  'manage:rate-limits': PERMISSION_CATEGORIES.SECURITY,
  'manage:throttling': PERMISSION_CATEGORIES.SECURITY,
  'emergency:access': PERMISSION_CATEGORIES.SECURITY,
  'manage:fraud': PERMISSION_CATEGORIES.FRAUD,

  // System permissions
  'manage:system': PERMISSION_CATEGORIES.SYSTEM,
  'manage:database': PERMISSION_CATEGORIES.DATABASE,
  'manage:server': PERMISSION_CATEGORIES.SERVER,
  'manage:networks': PERMISSION_CATEGORIES.NETWORKS,
  'manage:backups': PERMISSION_CATEGORIES.BACKUPS,
  'manage:maintenance': PERMISSION_CATEGORIES.MAINTENANCE,
  'manage:recovery': PERMISSION_CATEGORIES.MAINTENANCE,

  // Integration permissions
  'manage:integrations': PERMISSION_CATEGORIES.INTEGRATIONS,

  // Compliance permissions
  'manage:compliance': PERMISSION_CATEGORIES.COMPLIANCE,
};

/**
 * Helper function to check if permission exists
 */
export function isValidPermission(permission: string): permission is Permission {
  return Object.values(ALL_PERMISSIONS).includes(permission as Permission);
}

/**
 * Helper function to get permission category
 */
export function getPermissionCategory(permission: string): PermissionCategory | null {
  return PERMISSION_CATEGORY_MAP[permission] || null;
}

/**
 * Helper function to get permissions by category
 */
export function getPermissionsByCategory(category: PermissionCategory): Permission[] {
  return Object.keys(PERMISSION_CATEGORY_MAP)
    .filter((key) => PERMISSION_CATEGORY_MAP[key] === category)
    .map((key) => key as Permission);
}

/**
 * Helper function to check if user has permission
 * This is a simple check - actual implementation would check user's roles/permissions
 */
export function hasPermission(
  userPermissions: Permission[],
  requiredPermission: Permission
): boolean {
  return userPermissions.includes(requiredPermission);
}

/**
 * Helper function to check if user has any of the permissions
 */
export function hasAnyPermission(
  userPermissions: Permission[],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.some((permission) => userPermissions.includes(permission));
}

/**
 * Helper function to check if user has all permissions
 */
export function hasAllPermissions(
  userPermissions: Permission[],
  requiredPermissions: Permission[]
): boolean {
  return requiredPermissions.every((permission) => userPermissions.includes(permission));
}
