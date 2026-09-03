/**
 * User Endpoints
 * ইউজার এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { User, UserCreateInput, UserUpdateInput } from '@vubon/shared-types';
import { HTTP_STATUS, USER } from '@vubon/shared-constants';

export class UserEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get all users
   * সব ইউজার পাওয়া
   */
  async getUsers(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.search) queryParams.search = params.search;
    if (params?.status) queryParams.status = params.status;

    // USER কনস্ট্যান্ট ব্যবহার করা হচ্ছে - স্ট্যাটাস ভ্যালিডেট করার জন্য
    const validStatuses = Object.values(USER.STATUS) as string[];
    if (params?.status && !validStatuses.includes(params.status)) {
      throw new Error(
        `Invalid status: ${params.status}. Valid statuses: ${validStatuses.join(', ')}`
      );
    }

    const response = await this.client.get<{
      users: User[];
      total: number;
      page: number;
      limit: number;
    }>('/users', { params: queryParams });

    return response;
  }

  /**
   * Get user by ID
   * আইডি দ্বারা ইউজার পাওয়া
   */
  async getUser(userId: string): Promise<User> {
    return this.client.get<User>(`/users/${userId}`);
  }

  /**
   * Get current user
   * বর্তমান ইউজার পাওয়া
   */
  async getCurrentUser(): Promise<User> {
    return this.client.get<User>('/users/me');
  }

  /**
   * Create user
   * ইউজার তৈরি করা
   */
  async createUser(data: UserCreateInput): Promise<User> {
    // USER কনস্ট্যান্ট ব্যবহার করে ডিফল্ট রোল সেট করা
    const validRoles = Object.values(USER.ROLES) as string[];
    const userData = {
      ...data,
      role: data.role && validRoles.includes(data.role) ? data.role : USER.ROLES.USER,
      status: USER.STATUS.PENDING,
    };
    return this.client.post<User>('/users', userData);
  }

  /**
   * Update user
   * ইউজার আপডেট করা
   */
  async updateUser(userId: string, data: UserUpdateInput): Promise<User> {
    return this.client.patch<User>(`/users/${userId}`, data);
  }

  /**
   * Delete user
   * ইউজার ডিলিট করা
   */
  async deleteUser(userId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/users/${userId}`);
  }

  /**
   * Update user status
   * ইউজার স্ট্যাটাস আপডেট করা
   */
  async updateUserStatus(userId: string, status: string): Promise<User> {
    // USER কনস্ট্যান্ট ব্যবহার করে স্ট্যাটাস ভ্যালিডেট করা
    const validStatuses = Object.values(USER.STATUS) as string[];
    if (!validStatuses.includes(status)) {
      throw new Error(`Invalid status: ${status}. Valid statuses: ${validStatuses.join(', ')}`);
    }
    return this.client.patch<User>(`/users/${userId}/status`, { status });
  }

  /**
   * Update user role
   * ইউজার রোল আপডেট করা
   */
  async updateUserRole(userId: string, role: string): Promise<User> {
    // USER কনস্ট্যান্ট ব্যবহার করে রোল ভ্যালিডেট করা
    const validRoles = Object.values(USER.ROLES) as string[];
    if (!validRoles.includes(role)) {
      throw new Error(`Invalid role: ${role}. Valid roles: ${validRoles.join(', ')}`);
    }
    return this.client.patch<User>(`/users/${userId}/role`, { role });
  }

  /**
   * Lock user account
   * ইউজার অ্যাকাউন্ট লক করা
   */
  async lockUser(userId: string, reason?: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/users/${userId}/lock`, { reason });
  }

  /**
   * Unlock user account
   * ইউজার অ্যাকাউন্ট আনলক করা
   */
  async unlockUser(userId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/users/${userId}/unlock`);
  }

  /**
   * Search users
   * ইউজার সার্চ করা
   */
  async searchUsers(
    query: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = { q: query };
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);

    return this.client.get<{
      users: User[];
      total: number;
      page: number;
      limit: number;
    }>('/users/search', { params: queryParams });
  }

  /**
   * Get users by role
   * রোল অনুযায়ী ইউজার পাওয়া
   */
  async getUsersByRole(
    role: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);

    return this.client.get<{
      users: User[];
      total: number;
      page: number;
      limit: number;
    }>(`/users/role/${role}`, { params: queryParams });
  }

  /**
   * Get users by status
   * স্ট্যাটাস অনুযায়ী ইউজার পাওয়া
   */
  async getUsersByStatus(
    status: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    users: User[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);

    return this.client.get<{
      users: User[];
      total: number;
      page: number;
      limit: number;
    }>(`/users/status/${status}`, { params: queryParams });
  }

  /**
   * Bulk update users
   * একাধিক ইউজার আপডেট করা
   */
  async bulkUpdateUsers(
    userIds: string[],
    data: UserUpdateInput
  ): Promise<{
    success: boolean;
    updatedCount: number;
  }> {
    return this.client.patch<{
      success: boolean;
      updatedCount: number;
    }>('/users/bulk', { userIds, data });
  }

  /**
   * Check if user exists
   * ইউজার আছে কিনা চেক করা
   */
  async userExists(userId: string): Promise<boolean> {
    try {
      await this.getUser(userId);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Get user count
   * ইউজার কাউন্ট পাওয়া
   */
  async getUserCount(params?: { status?: string; role?: string }): Promise<{ count: number }> {
    const queryParams: Record<string, string> = {};
    if (params?.status) queryParams.status = params.status;
    if (params?.role) queryParams.role = params.role;
    return this.client.get<{ count: number }>('/users/count', { params: queryParams });
  }

  /**
   * Get HTTP status codes (HTTP_STATUS ব্যবহার)
   * HTTP স্ট্যাটাস কোড পাওয়া
   */
  getHttpStatusCodes(): typeof HTTP_STATUS {
    return HTTP_STATUS;
  }

  /**
   * Get user constants (USER ব্যবহার)
   * ইউজার কনস্ট্যান্ট পাওয়া
   */
  getUserConstants(): typeof USER {
    return USER;
  }
}
