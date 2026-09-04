/**
 * Admin Endpoints
 * অ্যাডমিন এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { Admin, AdminCreateInput, AdminUpdateInput } from '@vubon/shared-types';
import { HTTP_STATUS } from '@vubon/shared-constants';

export class AdminEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get all admins
   * সব অ্যাডমিন পাওয়া
   */
  async getAdmins(params?: {
    page?: number;
    limit?: number;
    search?: string;
    status?: string;
  }): Promise<{
    admins: Admin[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.search) queryParams.search = params.search;
    if (params?.status) queryParams.status = params.status;

    return this.client.get('/admin', { params: queryParams });
  }

  /**
   * Get admin by ID
   * আইডি দ্বারা অ্যাডমিন পাওয়া
   */
  async getAdmin(adminId: string): Promise<Admin> {
    return this.client.get<Admin>(`/admin/${adminId}`);
  }

  /**
   * Get current admin
   * বর্তমান অ্যাডমিন পাওয়া
   */
  async getCurrentAdmin(): Promise<Admin> {
    return this.client.get<Admin>('/admin/me');
  }

  /**
   * Create admin
   * অ্যাডমিন তৈরি করা
   */
  async createAdmin(data: AdminCreateInput): Promise<Admin> {
    return this.client.post<Admin>('/admin', data);
  }

  /**
   * Update admin
   * অ্যাডমিন আপডেট করা
   */
  async updateAdmin(adminId: string, data: AdminUpdateInput): Promise<Admin> {
    return this.client.patch<Admin>(`/admin/${adminId}`, data);
  }

  /**
   * Delete admin
   * অ্যাডমিন ডিলিট করা
   */
  async deleteAdmin(adminId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/admin/${adminId}`);
  }

  /**
   * Update admin status
   * অ্যাডমিন স্ট্যাটাস আপডেট করা
   */
  async updateAdminStatus(adminId: string, status: string): Promise<Admin> {
    return this.client.patch<Admin>(`/admin/${adminId}/status`, { status });
  }

  /**
   * Update admin role
   * অ্যাডমিন রোল আপডেট করা
   */
  async updateAdminRole(adminId: string, role: string): Promise<Admin> {
    return this.client.patch<Admin>(`/admin/${adminId}/role`, { role });
  }

  /**
   * Lock admin account
   * অ্যাডমিন অ্যাকাউন্ট লক করা
   */
  async lockAdmin(adminId: string, reason?: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/admin/${adminId}/lock`, { reason });
  }

  /**
   * Unlock admin account
   * অ্যাডমিন অ্যাকাউন্ট আনলক করা
   */
  async unlockAdmin(adminId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/admin/${adminId}/unlock`);
  }

  /**
   * Search admins
   * অ্যাডমিন সার্চ করা
   */
  async searchAdmins(
    query: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    admins: Admin[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = { q: query };
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);

    return this.client.get('/admin/search', { params: queryParams });
  }

  /**
   * Get admins by role
   * রোল অনুযায়ী অ্যাডমিন পাওয়া
   */
  async getAdminsByRole(
    role: string,
    params?: { page?: number; limit?: number }
  ): Promise<{
    admins: Admin[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);

    return this.client.get(`/admin/role/${role}`, { params: queryParams });
  }

  /**
   * Bulk update admins
   * একাধিক অ্যাডমিন আপডেট করা
   */
  async bulkUpdateAdmins(
    adminIds: string[],
    data: AdminUpdateInput
  ): Promise<{
    success: boolean;
    updatedCount: number;
  }> {
    return this.client.patch('/admin/bulk', { adminIds, data });
  }

  /**
   * Get HTTP status codes from constants
   * কনস্ট্যান্ট থেকে HTTP স্ট্যাটাস কোড পাওয়া
   */
  getStatusCodes(): Record<string, number> {
    return {
      OK: HTTP_STATUS.OK,
      CREATED: HTTP_STATUS.CREATED,
      ACCEPTED: HTTP_STATUS.ACCEPTED,
      NO_CONTENT: HTTP_STATUS.NO_CONTENT,
      BAD_REQUEST: HTTP_STATUS.BAD_REQUEST,
      UNAUTHORIZED: HTTP_STATUS.UNAUTHORIZED,
      FORBIDDEN: HTTP_STATUS.FORBIDDEN,
      NOT_FOUND: HTTP_STATUS.NOT_FOUND,
      METHOD_NOT_ALLOWED: HTTP_STATUS.METHOD_NOT_ALLOWED,
      CONFLICT: HTTP_STATUS.CONFLICT,
      UNPROCESSABLE_ENTITY: HTTP_STATUS.UNPROCESSABLE_ENTITY,
      TOO_MANY_REQUESTS: HTTP_STATUS.TOO_MANY_REQUESTS,
      INTERNAL_SERVER_ERROR: HTTP_STATUS.INTERNAL_SERVER_ERROR,
      BAD_GATEWAY: HTTP_STATUS.BAD_GATEWAY,
      SERVICE_UNAVAILABLE: HTTP_STATUS.SERVICE_UNAVAILABLE,
      GATEWAY_TIMEOUT: HTTP_STATUS.GATEWAY_TIMEOUT,
    };
  }

  /**
   * Check if status code indicates success
   * স্ট্যাটাস কোড সাফল্য নির্দেশ করে কিনা চেক করা
   */
  isSuccessStatus(status: number): boolean {
    return status >= HTTP_STATUS.OK && status < HTTP_STATUS.BAD_REQUEST;
  }

  /**
   * Check if status code indicates client error
   * স্ট্যাটাস কোড ক্লায়েন্ট এরর নির্দেশ করে কিনা চেক করা
   */
  isClientErrorStatus(status: number): boolean {
    return status >= HTTP_STATUS.BAD_REQUEST && status < HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }

  /**
   * Check if status code indicates server error
   * স্ট্যাটাস কোড সার্ভার এরর নির্দেশ করে কিনা চেক করা
   */
  isServerErrorStatus(status: number): boolean {
    return status >= HTTP_STATUS.INTERNAL_SERVER_ERROR;
  }

  /**
   * Get status message
   * স্ট্যাটাস মেসেজ পাওয়া
   */
  getStatusMessage(status: number): string {
    const messages: Record<number, string> = {
      [HTTP_STATUS.OK]: 'OK',
      [HTTP_STATUS.CREATED]: 'Created',
      [HTTP_STATUS.ACCEPTED]: 'Accepted',
      [HTTP_STATUS.NO_CONTENT]: 'No Content',
      [HTTP_STATUS.BAD_REQUEST]: 'Bad Request',
      [HTTP_STATUS.UNAUTHORIZED]: 'Unauthorized',
      [HTTP_STATUS.FORBIDDEN]: 'Forbidden',
      [HTTP_STATUS.NOT_FOUND]: 'Not Found',
      [HTTP_STATUS.METHOD_NOT_ALLOWED]: 'Method Not Allowed',
      [HTTP_STATUS.CONFLICT]: 'Conflict',
      [HTTP_STATUS.UNPROCESSABLE_ENTITY]: 'Unprocessable Entity',
      [HTTP_STATUS.TOO_MANY_REQUESTS]: 'Too Many Requests',
      [HTTP_STATUS.INTERNAL_SERVER_ERROR]: 'Internal Server Error',
      [HTTP_STATUS.BAD_GATEWAY]: 'Bad Gateway',
      [HTTP_STATUS.SERVICE_UNAVAILABLE]: 'Service Unavailable',
      [HTTP_STATUS.GATEWAY_TIMEOUT]: 'Gateway Timeout',
    };
    return messages[status] || 'Unknown Status';
  }
}
