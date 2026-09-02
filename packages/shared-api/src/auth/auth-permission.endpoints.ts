/**
 * Auth Permission Endpoints
 * প্রমীকরণ পারমিশন এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AuthPermission, AuthPermissionCheck, AuthPermissionResult } from '@vubon/shared-types';

export class AuthPermissionEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get permissions
   * পারমিশন লিস্ট পাওয়া
   */
  async getPermissions(): Promise<AuthPermission[]> {
    return this.client.get<AuthPermission[]>('/auth/permissions');
  }

  /**
   * Get permission by ID
   * আইডি দ্বারা পারমিশন পাওয়া
   */
  async getPermission(permissionId: string): Promise<AuthPermission> {
    return this.client.get<AuthPermission>(`/auth/permissions/${permissionId}`);
  }

  /**
   * Get user permissions
   * ইউজারের পারমিশন পাওয়া
   */
  async getUserPermissions(userId: string): Promise<{ permissions: string[] }> {
    return this.client.get<{ permissions: string[] }>(`/auth/permissions/user/${userId}`);
  }

  /**
   * Get current user permissions
   * বর্তমান ইউজারের পারমিশন পাওয়া
   */
  async getMyPermissions(): Promise<{ permissions: string[] }> {
    return this.client.get<{ permissions: string[] }>('/auth/permissions/me');
  }

  /**
   * Check permission
   * পারমিশন চেক করা
   */
  async checkPermission(data: AuthPermissionCheck): Promise<AuthPermissionResult> {
    return this.client.post<AuthPermissionResult>('/auth/permissions/check', data);
  }

  /**
   * Check multiple permissions
   * একাধিক পারমিশন চেক করা
   */
  async checkPermissions(
    permissions: string[]
  ): Promise<{ results: Record<string, AuthPermissionResult> }> {
    return this.client.post<{ results: Record<string, AuthPermissionResult> }>(
      '/auth/permissions/check-multiple',
      { permissions }
    );
  }

  /**
   * Get permissions by role
   * রোল অনুযায়ী পারমিশন পাওয়া
   */
  async getPermissionsByRole(role: string): Promise<{ permissions: string[] }> {
    return this.client.get<{ permissions: string[] }>(`/auth/permissions/role/${role}`);
  }

  /**
   * Assign permission to role
   * রোলের জন্য পারমিশন অ্যাসাইন করা
   */
  async assignPermissionToRole(role: string, permission: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/auth/permissions/role/${role}/assign`, {
      permission,
    });
  }

  /**
   * Remove permission from role
   * রোল থেকে পারমিশন রিমুভ করা
   */
  async removePermissionFromRole(role: string, permission: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(
      `/auth/permissions/role/${role}/remove/${permission}`
    );
  }
}
