/**
 * User Role Endpoints
 * ইউজার রোল এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { UserRole, UserRoleCreateInput } from '@vubon/shared-types';
import { USER_ROLES } from '@vubon/shared-constants';

export class UserRoleEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get user roles
   * ইউজারের রোল পাওয়া
   */
  async getRoles(userId: string): Promise<UserRole[]> {
    return this.client.get<UserRole[]>(`/users/${userId}/roles`);
  }

  /**
   * Get current user roles
   * বর্তমান ইউজারের রোল পাওয়া
   */
  async getMyRoles(): Promise<UserRole[]> {
    return this.client.get<UserRole[]>('/users/me/roles');
  }

  /**
   * Get role by ID
   * আইডি দ্বারা রোল পাওয়া
   */
  async getRole(roleId: string): Promise<UserRole> {
    return this.client.get<UserRole>(`/users/roles/${roleId}`);
  }

  /**
   * Assign role
   * রোল অ্যাসাইন করা
   */
  async assignRole(data: UserRoleCreateInput): Promise<UserRole> {
    return this.client.post<UserRole>('/users/roles', data);
  }

  /**
   * Revoke role
   * রোল রিভোক করা
   */
  async revokeRole(roleId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/users/roles/${roleId}`);
  }

  /**
   * Get available roles
   * উপলব্ধ রোল পাওয়া
   */
  async getAvailableRoles(): Promise<{
    roles: Array<{ name: string; description: string; permissions: string[] }>;
  }> {
    return this.client.get('/users/roles/available');
  }

  /**
   * Get role hierarchy
   * রোল হায়ারার্কি পাওয়া
   */
  async getRoleHierarchy(): Promise<{
    hierarchy: Record<string, number>;
  }> {
    return this.client.get('/users/roles/hierarchy');
  }

  /**
   * Check if user has role
   * ইউজারের রোল আছে কিনা চেক করা
   */
  async hasRole(userId: string, role: string): Promise<{ hasRole: boolean; hierarchy?: number }> {
    return this.client.get(`/users/${userId}/roles/has/${role}`);
  }

  /**
   * Get users by role
   * রোল অনুযায়ী ইউজার পাওয়া
   */
  async getUsersByRole(
    role: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    users: Array<{ id: string; name: string; email: string }>;
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);

    return this.client.get(`/users/roles/${role}/users`, { params: queryParams });
  }

  /**
   * Bulk assign roles
   * একাধিক ইউজারে রোল অ্যাসাইন করা
   */
  async bulkAssignRoles(
    userIds: string[],
    role: string
  ): Promise<{
    success: boolean;
    assignedCount: number;
  }> {
    return this.client.post('/users/roles/bulk', { userIds, role });
  }

  /**
   * Get all roles from constants
   * কনস্ট্যান্ট থেকে সব রোল পাওয়া
   */
  getAllRoles(): Record<string, string> {
    return {
      SUPER_ADMIN: USER_ROLES.SUPER_ADMIN,
      ADMIN: USER_ROLES.ADMIN,
      MODERATOR: USER_ROLES.MODERATOR,
      USER: USER_ROLES.USER,
      VENDOR: USER_ROLES.VENDOR,
      GUEST: USER_ROLES.GUEST,
      MANAGER: USER_ROLES.MANAGER,
      SUPPORT: USER_ROLES.SUPPORT,
      DELIVERY_AGENT: USER_ROLES.DELIVERY_AGENT,
      CONTRIBUTOR: USER_ROLES.CONTRIBUTOR,
      REVIEWER: USER_ROLES.REVIEWER,
      EDITOR: USER_ROLES.EDITOR,
      AUTHOR: USER_ROLES.AUTHOR,
      SUBSCRIBER: USER_ROLES.SUBSCRIBER,
      ANALYST: USER_ROLES.ANALYST,
      ACCOUNTANT: USER_ROLES.ACCOUNTANT,
      HR: USER_ROLES.HR,
      TEAM_LEAD: USER_ROLES.TEAM_LEAD,
      PROJECT_MANAGER: USER_ROLES.PROJECT_MANAGER,
    };
  }

  /**
   * Get role hierarchy from constants
   * কনস্ট্যান্ট থেকে রোল হায়ারার্কি পাওয়া
   */
  getRoleHierarchyValues(): Record<string, number> {
    return {
      [USER_ROLES.SUPER_ADMIN]: 100,
      [USER_ROLES.ADMIN]: 90,
      [USER_ROLES.MANAGER]: 80,
      [USER_ROLES.PROJECT_MANAGER]: 75,
      [USER_ROLES.TEAM_LEAD]: 70,
      [USER_ROLES.MODERATOR]: 60,
      [USER_ROLES.REVIEWER]: 55,
      [USER_ROLES.EDITOR]: 50,
      [USER_ROLES.AUTHOR]: 45,
      [USER_ROLES.ANALYST]: 40,
      [USER_ROLES.ACCOUNTANT]: 40,
      [USER_ROLES.CONTRIBUTOR]: 35,
      [USER_ROLES.HR]: 35,
      [USER_ROLES.SUPPORT]: 30,
      [USER_ROLES.DELIVERY_AGENT]: 25,
      [USER_ROLES.VENDOR]: 20,
      [USER_ROLES.USER]: 15,
      [USER_ROLES.SUBSCRIBER]: 10,
      [USER_ROLES.GUEST]: 0,
    };
  }
}
