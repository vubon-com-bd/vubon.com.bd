/**
 * Admin Activity Endpoints
 * অ্যাডমিন অ্যাক্টিভিটি এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { AdminActivity, AdminActivityCreateInput } from '@vubon/shared-types';
import { ADMIN_ACTIVITY } from '@vubon/shared-constants';

export class AdminActivityEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get admin activities
   * অ্যাডমিনের অ্যাক্টিভিটি পাওয়া
   */
  async getActivities(
    adminId: string,
    params?: {
      page?: number;
      limit?: number;
      type?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<{
    activities: AdminActivity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.type) queryParams.type = params.type;
    if (params?.status) queryParams.status = params.status;
    if (params?.startDate) queryParams.startDate = params.startDate;
    if (params?.endDate) queryParams.endDate = params.endDate;

    return this.client.get(`/admin/${adminId}/activities`, { params: queryParams });
  }

  /**
   * Get current admin activities
   * বর্তমান অ্যাডমিনের অ্যাক্টিভিটি পাওয়া
   */
  async getMyActivities(params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{
    activities: AdminActivity[];
    total: number;
    page: number;
    limit: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.type) queryParams.type = params.type;
    if (params?.status) queryParams.status = params.status;
    if (params?.startDate) queryParams.startDate = params.startDate;
    if (params?.endDate) queryParams.endDate = params.endDate;

    return this.client.get('/admin/me/activities', { params: queryParams });
  }

  /**
   * Get activity by ID
   * আইডি দ্বারা অ্যাক্টিভিটি পাওয়া
   */
  async getActivity(activityId: string): Promise<AdminActivity> {
    return this.client.get<AdminActivity>(`/admin/activities/${activityId}`);
  }

  /**
   * Create activity
   * অ্যাক্টিভিটি তৈরি করা
   */
  async createActivity(data: AdminActivityCreateInput): Promise<AdminActivity> {
    return this.client.post<AdminActivity>('/admin/activities', data);
  }

  /**
   * Get activity stats
   * অ্যাক্টিভিটি স্ট্যাটিসটিক্স পাওয়া
   */
  async getActivityStats(
    adminId: string,
    days?: number
  ): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    recentActivities: AdminActivity[];
  }> {
    const params: Record<string, string> = {};
    if (days) params.days = String(days);
    return this.client.get(`/admin/${adminId}/activities/stats`, { params });
  }

  /**
   * Get current admin activity stats
   * বর্তমান অ্যাডমিনের অ্যাক্টিভিটি স্ট্যাটিসটিক্স পাওয়া
   */
  async getMyActivityStats(days?: number): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    recentActivities: AdminActivity[];
  }> {
    const params: Record<string, string> = {};
    if (days) params.days = String(days);
    return this.client.get('/admin/me/activities/stats', { params });
  }

  /**
   * Get available activity types from constants
   * কনস্ট্যান্ট থেকে উপলব্ধ অ্যাক্টিভিটি টাইপ পাওয়া
   */
  getActivityTypes(): Record<string, string> {
    return {
      LOGIN: ADMIN_ACTIVITY.TYPES.LOGIN,
      LOGOUT: ADMIN_ACTIVITY.TYPES.LOGOUT,
      CREATE: ADMIN_ACTIVITY.TYPES.CREATE,
      UPDATE: ADMIN_ACTIVITY.TYPES.UPDATE,
      DELETE: ADMIN_ACTIVITY.TYPES.DELETE,
      VIEW: ADMIN_ACTIVITY.TYPES.VIEW,
      EXPORT: ADMIN_ACTIVITY.TYPES.EXPORT,
      IMPORT: ADMIN_ACTIVITY.TYPES.IMPORT,
      APPROVE: ADMIN_ACTIVITY.TYPES.APPROVE,
      REJECT: ADMIN_ACTIVITY.TYPES.REJECT,
      SUSPEND: ADMIN_ACTIVITY.TYPES.SUSPEND,
      UNSUSPEND: ADMIN_ACTIVITY.TYPES.UNSUSPEND,
      BAN: ADMIN_ACTIVITY.TYPES.BAN,
      UNBAN: ADMIN_ACTIVITY.TYPES.UNBAN,
      LOCK: ADMIN_ACTIVITY.TYPES.LOCK,
      UNLOCK: ADMIN_ACTIVITY.TYPES.UNLOCK,
      ROLE_CHANGE: ADMIN_ACTIVITY.TYPES.ROLE_CHANGE,
      PERMISSION_CHANGE: ADMIN_ACTIVITY.TYPES.PERMISSION_CHANGE,
      SETTINGS_CHANGE: ADMIN_ACTIVITY.TYPES.SETTINGS_CHANGE,
      PASSWORD_CHANGE: ADMIN_ACTIVITY.TYPES.PASSWORD_CHANGE,
      PROFILE_UPDATE: ADMIN_ACTIVITY.TYPES.PROFILE_UPDATE,
    };
  }

  /**
   * Get activity statuses from constants
   * কনস্ট্যান্ট থেকে অ্যাক্টিভিটি স্ট্যাটাস পাওয়া
   */
  getActivityStatuses(): Record<string, string> {
    return {
      SUCCESS: ADMIN_ACTIVITY.STATUS.SUCCESS,
      FAILED: ADMIN_ACTIVITY.STATUS.FAILED,
      PENDING: ADMIN_ACTIVITY.STATUS.PENDING,
      IN_PROGRESS: ADMIN_ACTIVITY.STATUS.IN_PROGRESS,
      CANCELLED: ADMIN_ACTIVITY.STATUS.CANCELLED,
    };
  }

  /**
   * Get activity importance levels from constants
   * কনস্ট্যান্ট থেকে অ্যাক্টিভিটি ইমপোর্টেন্স লেভেল পাওয়া
   */
  getActivityImportance(): Record<string, string> {
    return {
      LOW: ADMIN_ACTIVITY.IMPORTANCE.LOW,
      MEDIUM: ADMIN_ACTIVITY.IMPORTANCE.MEDIUM,
      HIGH: ADMIN_ACTIVITY.IMPORTANCE.HIGH,
      CRITICAL: ADMIN_ACTIVITY.IMPORTANCE.CRITICAL,
    };
  }
}
