/**
 * Admin Permission Endpoints
 * অ্যাডমিন পারমিশন এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  AdminPermission,
  AdminPermissionCreateInput,
  AdminPermissionUpdateInput,
  AdminPermissionCheck,
} from '@vubon/shared-types';
import { ADMIN_PERMISSIONS } from '@vubon/shared-constants';

export class AdminPermissionEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get all permissions
   * সব পারমিশন পাওয়া
   */
  async getPermissions(params?: { page?: number; limit?: number; resource?: string }): Promise<{
    permissions: AdminPermission[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.resource) queryParams.resource = params.resource;

    return this.client.get('/admin/permissions', { params: queryParams });
  }

  /**
   * Get permission by ID
   * আইডি দ্বারা পারমিশন পাওয়া
   */
  async getPermission(permissionId: string): Promise<AdminPermission> {
    return this.client.get<AdminPermission>(`/admin/permissions/${permissionId}`);
  }

  /**
   * Create permission
   * পারমিশন তৈরি করা
   */
  async createPermission(data: AdminPermissionCreateInput): Promise<AdminPermission> {
    return this.client.post<AdminPermission>('/admin/permissions', data);
  }

  /**
   * Update permission
   * পারমিশন আপডেট করা
   */
  async updatePermission(
    permissionId: string,
    data: AdminPermissionUpdateInput
  ): Promise<AdminPermission> {
    return this.client.patch<AdminPermission>(`/admin/permissions/${permissionId}`, data);
  }

  /**
   * Delete permission
   * পারমিশন ডিলিট করা
   */
  async deletePermission(permissionId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/admin/permissions/${permissionId}`);
  }

  /**
   * Check permission
   * পারমিশন চেক করা
   */
  async checkPermission(
    data: AdminPermissionCheck
  ): Promise<{ granted: boolean; reason?: string; role?: string }> {
    return this.client.post('/admin/permissions/check', data);
  }

  /**
   * Check multiple permissions
   * একাধিক পারমিশন চেক করা
   */
  async checkPermissions(checks: AdminPermissionCheck[]): Promise<{
    results: Record<string, { granted: boolean; reason?: string; role?: string }>;
  }> {
    return this.client.post('/admin/permissions/check-multiple', { checks });
  }

  /**
   * Get admin permissions
   * অ্যাডমিনের পারমিশন পাওয়া
   */
  async getAdminPermissions(adminId: string): Promise<string[]> {
    return this.client.get<string[]>(`/admin/${adminId}/permissions`);
  }

  /**
   * Get role permissions
   * রোলের পারমিশন পাওয়া
   */
  async getRolePermissions(roleId: string): Promise<string[]> {
    return this.client.get<string[]>(`/admin/roles/${roleId}/permissions`);
  }

  /**
   * Assign permission to role
   * রোলে পারমিশন অ্যাসাইন করা
   */
  async assignPermissionToRole(
    roleId: string,
    permissionId: string
  ): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(
      `/admin/roles/${roleId}/permissions/${permissionId}`
    );
  }

  /**
   * Remove permission from role
   * রোল থেকে পারমিশন রিমুভ করা
   */
  async removePermissionFromRole(
    roleId: string,
    permissionId: string
  ): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(
      `/admin/roles/${roleId}/permissions/${permissionId}`
    );
  }

  /**
   * Get all permission names from constants
   * কনস্ট্যান্ট থেকে সব পারমিশন নাম পাওয়া
   */
  getAllPermissionNames(): string[] {
    return Object.keys(ADMIN_PERMISSIONS);
  }

  /**
   * Get permission details from constants
   * কনস্ট্যান্ট থেকে পারমিশন ডিটেইলস পাওয়া
   */
  getPermissionDetails(permission: string): {
    roles: readonly string[];
    resource: string;
    action: string;
  } | null {
    const roles = ADMIN_PERMISSIONS[permission as keyof typeof ADMIN_PERMISSIONS];
    if (!roles) return null;

    const parts = permission.split('_');
    const resource = parts.slice(0, -1).join('_').toLowerCase();
    const action = parts[parts.length - 1].toLowerCase();

    return {
      roles: roles as readonly string[],
      resource: resource || 'system',
      action: action || 'manage',
    };
  }

  /**
   * Check if permission exists
   * পারমিশন আছে কিনা চেক করা
   */
  hasPermission(permission: string): boolean {
    return permission in ADMIN_PERMISSIONS;
  }

  /**
   * Get permissions by resource
   * রিসোর্স অনুযায়ী পারমিশন পাওয়া
   */
  getPermissionsByResource(resource: string): string[] {
    return Object.keys(ADMIN_PERMISSIONS).filter((key) =>
      key.toLowerCase().includes(resource.toLowerCase())
    );
  }

  /**
   * Get roles for a permission
   * একটি পারমিশনের জন্য রোল পাওয়া
   */
  getRolesForPermission(permission: string): readonly string[] {
    const roles = ADMIN_PERMISSIONS[permission as keyof typeof ADMIN_PERMISSIONS];
    return roles ? (roles as readonly string[]) : [];
  }
}
