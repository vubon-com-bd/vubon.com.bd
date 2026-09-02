/**
 * Auth Permission Validator
 * প্রমীকরণ পারমিশন ভ্যালিডেটর
 */

import { AUTH_PERMISSION, AUTH_ROLE } from '@vubon/shared-constants';

export const AuthPermissionValidator = {
  /**
   * Validate permission name
   * পারমিশন নাম ভ্যালিডেট করা
   */
  validatePermission: (permission: string): boolean => {
    const validPermissions = Object.keys(AUTH_PERMISSION);
    return validPermissions.includes(permission);
  },

  /**
   * Check if user has permission
   * ইউজারের পারমিশন আছে কিনা চেক করা
   */
  hasPermission: (userPermissions: string[], requiredPermission: string): boolean => {
    if (!userPermissions || userPermissions.length === 0) return false;
    return userPermissions.includes(requiredPermission);
  },

  /**
   * Check if user has any of the permissions
   * ইউজারের যেকোনো একটি পারমিশন আছে কিনা চেক করা
   */
  hasAnyPermission: (userPermissions: string[], requiredPermissions: string[]): boolean => {
    if (!userPermissions || userPermissions.length === 0) return false;
    if (!requiredPermissions || requiredPermissions.length === 0) return true;
    return requiredPermissions.some((perm) => userPermissions.includes(perm));
  },

  /**
   * Check if user has all permissions
   * ইউজারের সব পারমিশন আছে কিনা চেক করা
   */
  hasAllPermissions: (userPermissions: string[], requiredPermissions: string[]): boolean => {
    if (!userPermissions || userPermissions.length === 0) return false;
    if (!requiredPermissions || requiredPermissions.length === 0) return true;
    return requiredPermissions.every((perm) => userPermissions.includes(perm));
  },

  /**
   * Get permissions by role
   * রোল অনুযায়ী পারমিশন পাওয়া
   */
  getPermissionsByRole: (role: string): string[] => {
    const permissions: string[] = [];
    // Type assertion to handle string role
    const roleKey = role as keyof typeof AUTH_ROLE;
    for (const [permission, roles] of Object.entries(AUTH_PERMISSION)) {
      // Check if the role is in the roles array
      if (Array.isArray(roles) && roles.includes(roleKey)) {
        permissions.push(permission);
      }
    }
    return permissions;
  },

  /**
   * Check if role has permission
   * রোলের পারমিশন আছে কিনা চেক করা
   */
  roleHasPermission: (role: string, permission: string): boolean => {
    const roles = AUTH_PERMISSION[permission as keyof typeof AUTH_PERMISSION];
    if (!roles) return false;
    // Type assertion to handle string role
    const roleKey = role as keyof typeof AUTH_ROLE;
    return Array.isArray(roles) && roles.includes(roleKey);
  },

  /**
   * Check if role has any of the permissions
   * রোলের যেকোনো একটি পারমিশন আছে কিনা চেক করা
   */
  roleHasAnyPermission: (role: string, permissions: string[]): boolean => {
    return permissions.some((perm) => AuthPermissionValidator.roleHasPermission(role, perm));
  },

  /**
   * Check if role has all permissions
   * রোলের সব পারমিশন আছে কিনা চেক করা
   */
  roleHasAllPermissions: (role: string, permissions: string[]): boolean => {
    return permissions.every((perm) => AuthPermissionValidator.roleHasPermission(role, perm));
  },

  /**
   * Get all available permissions
   * সব উপলব্ধ পারমিশন পাওয়া
   */
  getAllPermissions: (): string[] => {
    return Object.keys(AUTH_PERMISSION);
  },

  /**
   * Get roles for a permission
   * একটি পারমিশনের জন্য রোল পাওয়া
   */
  getRolesForPermission: (permission: string): string[] => {
    const roles = AUTH_PERMISSION[permission as keyof typeof AUTH_PERMISSION];
    if (!roles || !Array.isArray(roles)) return [];
    // Convert to string array for type safety
    return roles.map((role) => role.toString());
  },
};
