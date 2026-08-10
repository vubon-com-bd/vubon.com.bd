// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * User permission enum
 */
export const USER_PERMISSION = {
  VIEW_USERS: 'view_users',
  CREATE_USERS: 'create_users',
  UPDATE_USERS: 'update_users',
  DELETE_USERS: 'delete_users',
  MANAGE_ROLES: 'manage_roles',
  MANAGE_PERMISSIONS: 'manage_permissions',
  VIEW_REPORTS: 'view_reports',
  EXPORT_DATA: 'export_data',
  MANAGE_SETTINGS: 'manage_settings',
  VIEW_ANALYTICS: 'view_analytics',
  MANAGE_PRODUCTS: 'manage_products',
  MANAGE_ORDERS: 'manage_orders',
  MANAGE_PAYMENTS: 'manage_payments',
} as const;

/**
 * Can view users
 */
export const USER_PERMISSION_VIEW_USERS = USER_PERMISSION.VIEW_USERS;

/**
 * Can create users
 */
export const USER_PERMISSION_CREATE_USERS = USER_PERMISSION.CREATE_USERS;

/**
 * Can update users
 */
export const USER_PERMISSION_UPDATE_USERS = USER_PERMISSION.UPDATE_USERS;

/**
 * Can delete users
 */
export const USER_PERMISSION_DELETE_USERS = USER_PERMISSION.DELETE_USERS;

/**
 * Can manage roles
 */
export const USER_PERMISSION_MANAGE_ROLES = USER_PERMISSION.MANAGE_ROLES;

/**
 * Can manage permissions
 */
export const USER_PERMISSION_MANAGE_PERMISSIONS = USER_PERMISSION.MANAGE_PERMISSIONS;

/**
 * Can view reports
 */
export const USER_PERMISSION_VIEW_REPORTS = USER_PERMISSION.VIEW_REPORTS;

/**
 * Can export data
 */
export const USER_PERMISSION_EXPORT_DATA = USER_PERMISSION.EXPORT_DATA;

/**
 * Can manage settings
 */
export const USER_PERMISSION_MANAGE_SETTINGS = USER_PERMISSION.MANAGE_SETTINGS;

/**
 * Can view analytics
 */
export const USER_PERMISSION_VIEW_ANALYTICS = USER_PERMISSION.VIEW_ANALYTICS;

/**
 * Can manage products
 */
export const USER_PERMISSION_MANAGE_PRODUCTS = USER_PERMISSION.MANAGE_PRODUCTS;

/**
 * Can manage orders
 */
export const USER_PERMISSION_MANAGE_ORDERS = USER_PERMISSION.MANAGE_ORDERS;

/**
 * Can manage payments
 */
export const USER_PERMISSION_MANAGE_PAYMENTS = USER_PERMISSION.MANAGE_PAYMENTS;

/**
 * Type for user permission
 */
export type UserPermission = (typeof USER_PERMISSION)[keyof typeof USER_PERMISSION];
