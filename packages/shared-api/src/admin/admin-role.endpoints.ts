/**
 * Admin Role Endpoints
 * অ্যাডমিন রোল এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AdminRole, AdminRoleCreateInput, AdminRoleUpdateInput } from '@vubon/shared-types';
import { ADMIN_ROLES } from '@vubon/shared-constants';

export class AdminRoleEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get all roles
   * সব রোল পাওয়া
   */
  async getRoles(params?: { page?: number; limit?: number; search?: string }): Promise<{
    roles: AdminRole[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.search) queryParams.search = params.search;

    return this.client.get('/admin/roles', { params: queryParams });
  }

  /**
   * Get role by ID
   * আইডি দ্বারা রোল পাওয়া
   */
  async getRole(roleId: string): Promise<AdminRole> {
    return this.client.get<AdminRole>(`/admin/roles/${roleId}`);
  }

  /**
   * Create role
   * রোল তৈরি করা
   */
  async createRole(data: AdminRoleCreateInput): Promise<AdminRole> {
    return this.client.post<AdminRole>('/admin/roles', data);
  }

  /**
   * Update role
   * রোল আপডেট করা
   */
  async updateRole(roleId: string, data: AdminRoleUpdateInput): Promise<AdminRole> {
    return this.client.patch<AdminRole>(`/admin/roles/${roleId}`, data);
  }

  /**
   * Delete role
   * রোল ডিলিট করা
   */
  async deleteRole(roleId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/admin/roles/${roleId}`);
  }

  /**
   * Assign role to admin
   * অ্যাডমিনে রোল অ্যাসাইন করা
   */
  async assignRoleToAdmin(adminId: string, roleId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/admin/${adminId}/roles/${roleId}`);
  }

  /**
   * Remove role from admin
   * অ্যাডমিন থেকে রোল রিমুভ করা
   */
  async removeRoleFromAdmin(adminId: string, roleId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/admin/${adminId}/roles/${roleId}`);
  }

  /**
   * Get admin roles
   * অ্যাডমিনের রোল পাওয়া
   */
  async getAdminRoles(adminId: string): Promise<AdminRole[]> {
    return this.client.get<AdminRole[]>(`/admin/${adminId}/roles`);
  }

  /**
   * Get role hierarchy
   * রোল হায়ারার্কি পাওয়া
   */
  async getRoleHierarchy(): Promise<Record<string, number>> {
    return this.client.get('/admin/roles/hierarchy');
  }

  /**
   * Get available roles
   * উপলব্ধ রোল পাওয়া
   */
  async getAvailableRoles(): Promise<string[]> {
    return this.client.get<string[]>('/admin/roles/available');
  }

  /**
   * Get all role names from constants
   * কনস্ট্যান্ট থেকে সব রোল নাম পাওয়া
   */
  getAllRoleNames(): string[] {
    return Object.values(ADMIN_ROLES);
  }

  /**
   * Get role hierarchy from constants
   * কনস্ট্যান্ট থেকে রোল হায়ারার্কি পাওয়া
   */
  getRoleHierarchyFromConstants(): Record<string, number> {
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
    return hierarchy;
  }

  /**
   * Get role permissions from constants
   * কনস্ট্যান্ট থেকে রোল পারমিশন পাওয়া
   */
  getRolePermissionsFromConstants(role: string): string[] {
    const permissionsMap: Record<string, string[]> = {
      [ADMIN_ROLES.SUPER_ADMIN]: ['*'],
      [ADMIN_ROLES.SYSTEM_ADMIN]: ['system.*', 'admin.*', 'user.*', 'settings.*'],
      [ADMIN_ROLES.ADMIN]: ['admin.*', 'user.*', 'content.*', 'report.*'],
      [ADMIN_ROLES.AUTH_ADMIN]: ['auth.*', 'user.*', 'session.*', 'token.*'],
      [ADMIN_ROLES.FINANCE_ADMIN]: ['finance.*', 'report.*', 'payment.*'],
      [ADMIN_ROLES.MANAGER]: ['admin.read', 'user.*', 'report.*', 'content.*'],
      [ADMIN_ROLES.AUTH_SERVICE]: ['auth.*', 'session.*', 'token.*'],
      [ADMIN_ROLES.AUTH_MANAGER]: ['auth.read', 'auth.update', 'session.read'],
      [ADMIN_ROLES.CONTENT_ADMIN]: ['content.*', 'media.*', 'page.*'],
      [ADMIN_ROLES.USER_ADMIN]: ['user.*', 'role.*', 'permission.*'],
      [ADMIN_ROLES.REPORT_ADMIN]: ['report.*', 'analytics.*'],
      [ADMIN_ROLES.SETTINGS_ADMIN]: ['settings.*', 'config.*'],
      [ADMIN_ROLES.MODERATOR]: ['content.*', 'user.read', 'report.read'],
      [ADMIN_ROLES.SUPPORT]: ['ticket.*', 'user.read'],
      [ADMIN_ROLES.AUTH_SUPPORT]: ['auth.read', 'session.read', 'user.read'],
    };
    return permissionsMap[role] || [];
  }

  /**
   * Check if role is system role
   * রোল সিস্টেম রোল কিনা চেক করা
   */
  isSystemRole(role: string): boolean {
    const systemRoles: string[] = [
      ADMIN_ROLES.SUPER_ADMIN,
      ADMIN_ROLES.SYSTEM_ADMIN,
      ADMIN_ROLES.ADMIN,
    ];
    return systemRoles.includes(role);
  }

  /**
   * Get role display name
   * রোল ডিসপ্লে নাম পাওয়া
   */
  getRoleDisplayName(role: string): string {
    const displayNames: Record<string, string> = {
      [ADMIN_ROLES.SUPER_ADMIN]: 'Super Admin',
      [ADMIN_ROLES.SYSTEM_ADMIN]: 'System Admin',
      [ADMIN_ROLES.ADMIN]: 'Admin',
      [ADMIN_ROLES.AUTH_ADMIN]: 'Auth Admin',
      [ADMIN_ROLES.FINANCE_ADMIN]: 'Finance Admin',
      [ADMIN_ROLES.MANAGER]: 'Manager',
      [ADMIN_ROLES.AUTH_SERVICE]: 'Auth Service',
      [ADMIN_ROLES.AUTH_MANAGER]: 'Auth Manager',
      [ADMIN_ROLES.CONTENT_ADMIN]: 'Content Admin',
      [ADMIN_ROLES.USER_ADMIN]: 'User Admin',
      [ADMIN_ROLES.REPORT_ADMIN]: 'Report Admin',
      [ADMIN_ROLES.SETTINGS_ADMIN]: 'Settings Admin',
      [ADMIN_ROLES.MODERATOR]: 'Moderator',
      [ADMIN_ROLES.SUPPORT]: 'Support',
      [ADMIN_ROLES.AUTH_SUPPORT]: 'Auth Support',
    };
    return displayNames[role] || role;
  }
}
