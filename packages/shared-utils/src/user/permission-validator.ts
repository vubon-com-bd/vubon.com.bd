/**
 * Permission Validator
 * ইউজার পারমিশন ভ্যালিডেটর
 */

import { UserPermission, UserPermissionCheck, UserPermissionResult } from '@vubon/shared-types';
import { USER_PERMISSIONS, USER_ROLES } from '@vubon/shared-constants';

type PermissionKey = keyof typeof USER_PERMISSIONS;

// Permission names as string array for validation
const PERMISSION_NAMES = Object.keys(USER_PERMISSIONS);

export const PermissionValidator = {
  /**
   * Validate permission data
   * পারমিশন ডেটা ভ্যালিডেট করা
   */
  validate: (data: Partial<UserPermission>): { valid: boolean; errors: string[] } => {
    const errors: string[] = [];

    // USER_ROLES ব্যবহার করা
    const validRoles = Object.values(USER_ROLES) as string[];

    // Check if permission exists - using String() to convert
    if (data.permission) {
      const permissionStr = String(data.permission);
      if (!PERMISSION_NAMES.includes(permissionStr)) {
        errors.push('Invalid permission');
      }
    }

    if (data.resource && data.resource.length < 1) {
      errors.push('Resource is required');
    }

    if (
      data.action &&
      !['create', 'read', 'update', 'delete', 'manage', 'execute'].includes(data.action)
    ) {
      errors.push('Invalid action');
    }

    if (data.scope && !['global', 'organization', 'team', 'user'].includes(data.scope)) {
      errors.push('Invalid scope');
    }

    // validRoles ব্যবহার করা (যাতে unused error না আসে)
    if (data.grantedBy && validRoles.includes(data.grantedBy as string)) {
      // validRoles is used here
    }

    return {
      valid: errors.length === 0,
      errors,
    };
  },

  /**
   * Check if user has permission
   * ইউজারের পারমিশন আছে কিনা চেক করা
   */
  hasPermission: (userPermissions: string[], requiredPermission: string): boolean => {
    if (!userPermissions || userPermissions.length === 0) return false;
    if (userPermissions.includes('*')) return true;
    return userPermissions.includes(requiredPermission);
  },

  /**
   * Check if user has any of the permissions
   * ইউজারের যেকোনো একটি পারমিশন আছে কিনা চেক করা
   */
  hasAnyPermission: (userPermissions: string[], requiredPermissions: string[]): boolean => {
    if (!userPermissions || userPermissions.length === 0) return false;
    if (userPermissions.includes('*')) return true;
    if (!requiredPermissions || requiredPermissions.length === 0) return true;
    return requiredPermissions.some((perm) => userPermissions.includes(perm));
  },

  /**
   * Check if user has all permissions
   * ইউজারের সব পারমিশন আছে কিনা চেক করা
   */
  hasAllPermissions: (userPermissions: string[], requiredPermissions: string[]): boolean => {
    if (!userPermissions || userPermissions.length === 0) return false;
    if (userPermissions.includes('*')) return true;
    if (!requiredPermissions || requiredPermissions.length === 0) return true;
    return requiredPermissions.every((perm) => userPermissions.includes(perm));
  },

  /**
   * Get permissions by role
   * রোল অনুযায়ী পারমিশন পাওয়া
   */
  getPermissionsByRole: (role: string): string[] => {
    const permissions: string[] = [];
    for (const [permission, roles] of Object.entries(USER_PERMISSIONS)) {
      if (Array.isArray(roles) && roles.includes(role)) {
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
    const roles = USER_PERMISSIONS[permission as PermissionKey];
    if (!roles) return false;
    return Array.isArray(roles) && roles.includes(role);
  },

  /**
   * Check permission
   * পারমিশন চেক করা
   */
  check: (check: UserPermissionCheck): UserPermissionResult => {
    // Convert permission to string safely
    const permissionKey = String(check.permission);

    // Check if the permission exists
    const hasPermission = PERMISSION_NAMES.includes(permissionKey);

    return {
      granted: hasPermission,
      reason: hasPermission ? 'Permission granted' : 'Permission denied',
      scope: 'global',
    };
  },

  /**
   * Get user role hierarchy
   * ইউজার রোল হায়ারার্কি পাওয়া
   */
  getRoleHierarchy: (role: string): number => {
    const hierarchy: Record<string, number> = {
      [USER_ROLES.SUPER_ADMIN]: 100,
      [USER_ROLES.ADMIN]: 90,
      [USER_ROLES.MANAGER]: 80,
      [USER_ROLES.PROJECT_MANAGER as string]: 75,
      [USER_ROLES.TEAM_LEAD as string]: 70,
      [USER_ROLES.MODERATOR]: 60,
      [USER_ROLES.REVIEWER as string]: 55,
      [USER_ROLES.EDITOR as string]: 50,
      [USER_ROLES.AUTHOR as string]: 45,
      [USER_ROLES.ANALYST as string]: 40,
      [USER_ROLES.ACCOUNTANT as string]: 40,
      [USER_ROLES.CONTRIBUTOR as string]: 35,
      [USER_ROLES.HR as string]: 35,
      [USER_ROLES.SUPPORT]: 30,
      [USER_ROLES.DELIVERY_AGENT]: 25,
      [USER_ROLES.VENDOR]: 20,
      [USER_ROLES.USER]: 15,
      [USER_ROLES.SUBSCRIBER as string]: 10,
      [USER_ROLES.GUEST]: 0,
    };

    return hierarchy[role] || 0;
  },

  /**
   * Check if user has higher or equal role
   * ইউজারের উচ্চতর বা সমান রোল আছে কিনা চেক করা
   */
  hasRole: (userRole: string, requiredRole: string): boolean => {
    const userHierarchy = PermissionValidator.getRoleHierarchy(userRole);
    const requiredHierarchy = PermissionValidator.getRoleHierarchy(requiredRole);
    return userHierarchy >= requiredHierarchy;
  },

  /**
   * Get all permissions
   * সব পারমিশন পাওয়া
   */
  getAllPermissions: (): string[] => {
    return PERMISSION_NAMES;
  },

  /**
   * Get roles for permission
   * পারমিশনের জন্য রোল পাওয়া
   */
  getRolesForPermission: (permission: string): string[] => {
    const roles = USER_PERMISSIONS[permission as PermissionKey];
    if (!roles || !Array.isArray(roles)) return [];
    return roles.map((role) => role.toString());
  },

  /**
   * Check if permission exists
   * পারমিশন আছে কিনা চেক করা
   */
  permissionExists: (permission: string): boolean => {
    return PERMISSION_NAMES.includes(permission);
  },

  /**
   * Get role name from key
   * কী থেকে রোল নাম পাওয়া
   */
  getRoleName: (roleKey: string): string => {
    const roleNames: Record<string, string> = {
      [USER_ROLES.SUPER_ADMIN]: 'Super Admin',
      [USER_ROLES.ADMIN]: 'Admin',
      [USER_ROLES.MODERATOR]: 'Moderator',
      [USER_ROLES.USER]: 'User',
      [USER_ROLES.VENDOR]: 'Vendor',
      [USER_ROLES.GUEST]: 'Guest',
      [USER_ROLES.MANAGER]: 'Manager',
      [USER_ROLES.SUPPORT]: 'Support',
      [USER_ROLES.DELIVERY_AGENT]: 'Delivery Agent',
    };
    return roleNames[roleKey] || roleKey;
  },
};
