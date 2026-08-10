// External libraries
// No external libraries needed

// Shared packages
// No shared packages needed

// Project files
// No project files needed

/**
 * Authentication permission enum
 */
export const AUTH_PERMISSION = {
  READ_USERS: 'read_users',
  WRITE_USERS: 'write_users',
  DELETE_USERS: 'delete_users',
  MANAGE_ROLES: 'manage_roles',
  MANAGE_PERMISSIONS: 'manage_permissions',
  MANAGE_SETTINGS: 'manage_settings',
} as const;

/**
 * Read users permission
 */
export const READ_USERS = AUTH_PERMISSION.READ_USERS;

/**
 * Write users permission (create/edit users)
 */
export const WRITE_USERS = AUTH_PERMISSION.WRITE_USERS;

/**
 * Delete users permission
 */
export const DELETE_USERS = AUTH_PERMISSION.DELETE_USERS;

/**
 * Manage roles permission
 */
export const MANAGE_ROLES = AUTH_PERMISSION.MANAGE_ROLES;

/**
 * Manage permissions permission
 */
export const MANAGE_PERMISSIONS = AUTH_PERMISSION.MANAGE_PERMISSIONS;

/**
 * Manage settings permission
 */
export const MANAGE_SETTINGS = AUTH_PERMISSION.MANAGE_SETTINGS;

/**
 * Type for authentication permission
 */
export type AuthPermission = (typeof AUTH_PERMISSION)[keyof typeof AUTH_PERMISSION];
