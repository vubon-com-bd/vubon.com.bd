/**
 * User Permission Endpoints
 * ইউজার পারমিশন এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  UserPermission,
  UserPermissionCreateInput,
  UserPermissionCheck,
} from '@vubon/shared-types';
import { USER_PERMISSIONS } from '@vubon/shared-constants';

export class UserPermissionEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get user permissions
   * ইউজারের পারমিশন পাওয়া
   */
  async getPermissions(userId: string): Promise<UserPermission[]> {
    return this.client.get<UserPermission[]>(`/users/${userId}/permissions`);
  }

  /**
   * Get current user permissions
   * বর্তমান ইউজারের পারমিশন পাওয়া
   */
  async getMyPermissions(): Promise<UserPermission[]> {
    return this.client.get<UserPermission[]>('/users/me/permissions');
  }

  /**
   * Get permission by ID
   * আইডি দ্বারা পারমিশন পাওয়া
   */
  async getPermission(permissionId: string): Promise<UserPermission> {
    return this.client.get<UserPermission>(`/users/permissions/${permissionId}`);
  }

  /**
   * Create permission
   * পারমিশন তৈরি করা
   */
  async createPermission(data: UserPermissionCreateInput): Promise<UserPermission> {
    return this.client.post<UserPermission>('/users/permissions', data);
  }

  /**
   * Delete permission
   * পারমিশন ডিলিট করা
   */
  async deletePermission(permissionId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/users/permissions/${permissionId}`);
  }

  /**
   * Check permission
   * পারমিশন চেক করা
   */
  async checkPermission(data: UserPermissionCheck): Promise<{
    granted: boolean;
    reason?: string;
    scope?: string;
  }> {
    return this.client.post('/users/permissions/check', data);
  }

  /**
   * Check multiple permissions
   * একাধিক পারমিশন চেক করা
   */
  async checkPermissions(checks: UserPermissionCheck[]): Promise<{
    results: Record<string, { granted: boolean; reason?: string; scope?: string }>;
  }> {
    return this.client.post('/users/permissions/check-multiple', { checks });
  }

  /**
   * Get user's effective permissions
   * ইউজারের কার্যকরী পারমিশন পাওয়া
   */
  async getEffectivePermissions(userId: string): Promise<{
    permissions: string[];
    roles: string[];
  }> {
    return this.client.get(`/users/${userId}/permissions/effective`);
  }

  /**
   * Get current user's effective permissions
   * বর্তমান ইউজারের কার্যকরী পারমিশন পাওয়া
   */
  async getMyEffectivePermissions(): Promise<{
    permissions: string[];
    roles: string[];
  }> {
    return this.client.get('/users/me/permissions/effective');
  }

  /**
   * Revoke permission
   * পারমিশন রিভোক করা
   */
  async revokePermission(userId: string, permission: string): Promise<{ success: boolean }> {
    return this.client.delete(`/users/${userId}/permissions/${permission}`);
  }

  /**
   * Get all permissions from constants (as string array)
   * কনস্ট্যান্ট থেকে সব পারমিশন পাওয়া (স্ট্রিং অ্যারে হিসেবে)
   */
  getAllPermissions(): string[] {
    return Object.keys(USER_PERMISSIONS);
  }

  /**
   * Get permission names with their roles
   * পারমিশন নাম এবং তাদের রোল পাওয়া
   */
  getPermissionWithRoles(): Record<string, readonly string[]> {
    return USER_PERMISSIONS;
  }

  /**
   * Get roles for a permission
   * একটি পারমিশনের জন্য রোল পাওয়া
   */
  getRolesForPermission(permission: string): readonly string[] {
    const roles = USER_PERMISSIONS[permission as keyof typeof USER_PERMISSIONS];
    return Array.isArray(roles) ? roles : [];
  }

  /**
   * Check if a permission exists
   * পারমিশন আছে কিনা চেক করা
   */
  hasPermission(permission: string): boolean {
    return permission in USER_PERMISSIONS;
  }
}
