/**
 * Admin Permission Client
 * অ্যাডমিন পারমিশন ক্লায়েন্ট
 */

import { ADMIN_PERMISSIONS, ADMIN_ROLES } from '@vubon/shared-constants';
import { AdminPermission } from '@vubon/shared-types';

export interface AdminPermissionClientOptions {
  permissions?: string[];
  roles?: string[];
}

export class AdminPermissionClient {
  private permissions: string[] = [];
  private roles: string[] = [];

  constructor(options: AdminPermissionClientOptions = {}) {
    this.permissions = options.permissions || [];
    this.roles = options.roles || [];
  }

  /**
   * Set permissions
   * পারমিশন সেট করা
   */
  setPermissions(permissions: string[]): void {
    this.permissions = permissions;
  }

  /**
   * Set roles
   * রোল সেট করা
   */
  setRoles(roles: string[]): void {
    this.roles = roles;
  }

  /**
   * Check if has permission
   * পারমিশন আছে কিনা চেক করা
   */
  hasPermission(permission: string): boolean {
    if (!this.permissions.length) return false;
    if (this.permissions.includes('*')) return true;
    return this.permissions.includes(permission);
  }

  /**
   * Check if has any permission
   * যেকোনো একটি পারমিশন আছে কিনা চেক করা
   */
  hasAnyPermission(permissionList: string[]): boolean {
    if (!this.permissions.length) return false;
    if (this.permissions.includes('*')) return true;
    return permissionList.some((p) => this.hasPermission(p));
  }

  /**
   * Check if has all permissions
   * সব পারমিশন আছে কিনা চেক করা
   */
  hasAllPermissions(permissionList: string[]): boolean {
    if (!this.permissions.length) return false;
    if (this.permissions.includes('*')) return true;
    return permissionList.every((p) => this.hasPermission(p));
  }

  /**
   * Check if has role
   * রোল আছে কিনা চেক করা
   */
  hasRole(role: string): boolean {
    // ADMIN_ROLES থেকে ভ্যালিড রোল চেক
    const validRoles = this.getValidAdminRoles();
    if (!validRoles.includes(role)) {
      return false;
    }
    if (!this.roles.length) return false;
    return this.roles.includes(role);
  }

  /**
   * Check if has any role
   * যেকোনো একটি রোল আছে কিনা চেক করা
   */
  hasAnyRole(roleList: string[]): boolean {
    const validRoles = this.getValidAdminRoles();
    const filteredRoles = roleList.filter((r) => validRoles.includes(r));
    if (!filteredRoles.length) return false;
    return filteredRoles.some((r) => this.hasRole(r));
  }

  /**
   * Check if has all roles
   * সব রোল আছে কিনা চেক করা
   */
  hasAllRoles(roleList: string[]): boolean {
    const validRoles = this.getValidAdminRoles();
    const filteredRoles = roleList.filter((r) => validRoles.includes(r));
    if (!filteredRoles.length) return false;
    return filteredRoles.every((r) => this.hasRole(r));
  }

  /**
   * Get permissions
   * পারমিশন পাওয়া
   */
  getPermissions(): string[] {
    return this.permissions;
  }

  /**
   * Get roles
   * রোল পাওয়া
   */
  getRoles(): string[] {
    const validRoles = this.getValidAdminRoles();
    return this.roles.filter((r) => validRoles.includes(r));
  }

  /**
   * Check if user is super admin
   * সুপার অ্যাডমিন কিনা চেক করা
   */
  isSuperAdmin(): boolean {
    return this.hasRole(ADMIN_ROLES.SUPER_ADMIN);
  }

  /**
   * Check if user is admin
   * অ্যাডমিন কিনা চেক করা
   */
  isAdmin(): boolean {
    return this.hasAnyRole([ADMIN_ROLES.SUPER_ADMIN, ADMIN_ROLES.SYSTEM_ADMIN, ADMIN_ROLES.ADMIN]);
  }

  /**
   * Get all available permissions
   * সব উপলব্ধ পারমিশন পাওয়া
   */
  getAvailablePermissions(): string[] {
    return Object.keys(ADMIN_PERMISSIONS);
  }

  /**
   * Get permissions with roles
   * রোল সহ পারমিশন পাওয়া
   */
  getPermissionsWithRoles(): Record<string, readonly string[]> {
    return ADMIN_PERMISSIONS;
  }

  /**
   * Get roles for a permission
   * একটি পারমিশনের জন্য রোল পাওয়া
   */
  getRolesForPermission(permission: string): readonly string[] {
    const roles = ADMIN_PERMISSIONS[permission as keyof typeof ADMIN_PERMISSIONS];
    const validRoles = this.getValidAdminRoles();
    return (roles || []).filter((r) => validRoles.includes(r));
  }

  /**
   * Convert to AdminPermission array (simplified)
   * AdminPermission অ্যারেতে রূপান্তর করা (সরলীকৃত)
   */
  toAdminPermissions(): Partial<AdminPermission>[] {
    const result: Partial<AdminPermission>[] = [];
    const validRoles = this.getValidAdminRoles();

    for (const permission of this.permissions) {
      const roles = this.getRolesForPermission(permission);
      const parts = permission.split('_');
      const resource = parts.slice(0, -1).join('_').toLowerCase() || 'system';
      const action = parts[parts.length - 1].toLowerCase() || 'manage';

      // Only add if action is valid
      const validActions = ['create', 'read', 'update', 'delete', 'manage', 'execute'];
      if (validActions.includes(action)) {
        // Filter roles to only valid ADMIN_ROLES
        const validRoleList = roles.filter((r) => validRoles.includes(r));

        result.push({
          name: permission as keyof typeof ADMIN_PERMISSIONS,
          resource,
          action: action as 'create' | 'read' | 'update' | 'delete' | 'manage' | 'execute',
          roles: validRoleList as (typeof ADMIN_ROLES)[keyof typeof ADMIN_ROLES][],
        });
      }
    }

    return result;
  }

  /**
   * Check if has specific AdminPermission
   * নির্দিষ্ট AdminPermission আছে কিনা চেক করা
   */
  hasAdminPermission(adminPermission: Partial<AdminPermission>): boolean {
    if (!adminPermission.name) return false;
    return this.hasPermission(adminPermission.name);
  }

  /**
   * Check if has any AdminPermission from list
   * লিস্ট থেকে যেকোনো AdminPermission আছে কিনা চেক করা
   */
  hasAnyAdminPermission(adminPermissions: Partial<AdminPermission>[]): boolean {
    return adminPermissions.some((p) => this.hasAdminPermission(p));
  }

  /**
   * Check if has all AdminPermissions from list
   * লিস্ট থেকে সব AdminPermission আছে কিনা চেক করা
   */
  hasAllAdminPermissions(adminPermissions: Partial<AdminPermission>[]): boolean {
    return adminPermissions.every((p) => this.hasAdminPermission(p));
  }

  /**
   * Get valid admin roles
   * ভ্যালিড অ্যাডমিন রোল পাওয়া
   */
  getValidAdminRoles(): string[] {
    return Object.values(ADMIN_ROLES);
  }

  /**
   * Get role hierarchy from ADMIN_ROLES
   * ADMIN_ROLES থেকে রোল হায়ারার্কি পাওয়া
   */
  getRoleHierarchy(role: string): number {
    const hierarchy: Record<string, number> = {
      [ADMIN_ROLES.SUPER_ADMIN]: 100,
      [ADMIN_ROLES.SYSTEM_ADMIN]: 95,
      [ADMIN_ROLES.ADMIN]: 90,
      [ADMIN_ROLES.AUTH_ADMIN]: 88,
      [ADMIN_ROLES.FINANCE_ADMIN]: 85,
      [ADMIN_ROLES.MANAGER]: 80,
      [ADMIN_ROLES.AUTH_SERVICE]: 78,
      [ADMIN_ROLES.AUTH_MANAGER]: 75,
      [ADMIN_ROLES.CONTENT_ADMIN]: 70,
      [ADMIN_ROLES.USER_ADMIN]: 70,
      [ADMIN_ROLES.REPORT_ADMIN]: 65,
      [ADMIN_ROLES.SETTINGS_ADMIN]: 65,
      [ADMIN_ROLES.MODERATOR]: 60,
      [ADMIN_ROLES.SUPPORT]: 40,
      [ADMIN_ROLES.AUTH_SUPPORT]: 40,
    };
    return hierarchy[role] || 0;
  }

  /**
   * Check if role has higher hierarchy than another role
   * একটি রোলের হায়ারার্কি অন্যটির থেকে বেশি কিনা চেক করা
   */
  isHigherRole(role: string, compareTo: string): boolean {
    return this.getRoleHierarchy(role) > this.getRoleHierarchy(compareTo);
  }
}

export const createAdminPermissionClient = (
  options?: AdminPermissionClientOptions
): AdminPermissionClient => {
  return new AdminPermissionClient(options);
};
