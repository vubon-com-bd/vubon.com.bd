/**
 * User Activity Endpoints
 * ইউজার অ্যাক্টিভিটি এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import { UserActivity, UserActivityCreateInput } from '@vubon/shared-types';
import { USER_ACTIVITY } from '@vubon/shared-constants';

export class UserActivityEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get user activities
   * ইউজারের অ্যাক্টিভিটি পাওয়া
   */
  async getActivities(
    userId: string,
    params?: {
      page?: number;
      limit?: number;
      type?: string;
      status?: string;
      startDate?: string;
      endDate?: string;
    }
  ): Promise<{
    activities: UserActivity[];
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

    return this.client.get(`/users/${userId}/activities`, { params: queryParams });
  }

  /**
   * Get current user activities
   * বর্তমান ইউজারের অ্যাক্টিভিটি পাওয়া
   */
  async getMyActivities(params?: {
    page?: number;
    limit?: number;
    type?: string;
    status?: string;
    startDate?: string;
    endDate?: string;
  }): Promise<{
    activities: UserActivity[];
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

    return this.client.get('/users/me/activities', { params: queryParams });
  }

  /**
   * Get activity by ID
   * আইডি দ্বারা অ্যাক্টিভিটি পাওয়া
   */
  async getActivity(activityId: string): Promise<UserActivity> {
    return this.client.get<UserActivity>(`/users/activities/${activityId}`);
  }

  /**
   * Create activity
   * অ্যাক্টিভিটি তৈরি করা
   */
  async createActivity(data: UserActivityCreateInput): Promise<UserActivity> {
    return this.client.post<UserActivity>('/users/activities', data);
  }

  /**
   * Get activity stats
   * অ্যাক্টিভিটি স্ট্যাটিসটিক্স পাওয়া
   */
  async getActivityStats(
    userId: string,
    days?: number
  ): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    recentActivities: UserActivity[];
  }> {
    const params: Record<string, string> = {};
    if (days) params.days = String(days);
    return this.client.get(`/users/${userId}/activities/stats`, { params });
  }

  /**
   * Get current user activity stats
   * বর্তমান ইউজারের অ্যাক্টিভিটি স্ট্যাটিসটিক্স পাওয়া
   */
  async getMyActivityStats(days?: number): Promise<{
    total: number;
    byType: Record<string, number>;
    byStatus: Record<string, number>;
    recentActivities: UserActivity[];
  }> {
    const params: Record<string, string> = {};
    if (days) params.days = String(days);
    return this.client.get('/users/me/activities/stats', { params });
  }

  /**
   * Clear activities
   * অ্যাক্টিভিটি ক্লিয়ার করা
   */
  async clearActivities(
    userId: string,
    olderThan?: number
  ): Promise<{ success: boolean; count: number }> {
    const params: Record<string, string> = {};
    if (olderThan) params.olderThan = String(olderThan);
    return this.client.delete(`/users/${userId}/activities`, { params });
  }

  /**
   * Get available activity types from constants
   * কনস্ট্যান্ট থেকে উপলব্ধ অ্যাক্টিভিটি টাইপ পাওয়া
   */
  getActivityTypes(): Record<string, string> {
    return {
      LOGIN: USER_ACTIVITY.TYPES.LOGIN,
      LOGOUT: USER_ACTIVITY.TYPES.LOGOUT,
      REGISTER: USER_ACTIVITY.TYPES.REGISTER,
      PROFILE_UPDATE: USER_ACTIVITY.TYPES.PROFILE_UPDATE,
      PASSWORD_CHANGE: USER_ACTIVITY.TYPES.PASSWORD_CHANGE,
      VERIFICATION: USER_ACTIVITY.TYPES.VERIFICATION,
      KYC_SUBMIT: USER_ACTIVITY.TYPES.KYC_SUBMIT,
      KYC_VERIFY: USER_ACTIVITY.TYPES.KYC_VERIFY,
    };
  }

  /**
   * Get activity statuses from constants
   * কনস্ট্যান্ট থেকে অ্যাক্টিভিটি স্ট্যাটাস পাওয়া
   */
  getActivityStatuses(): Record<string, string> {
    return {
      SUCCESS: USER_ACTIVITY.STATUS.SUCCESS,
      FAILED: USER_ACTIVITY.STATUS.FAILED,
      PENDING: USER_ACTIVITY.STATUS.PENDING,
      IN_PROGRESS: USER_ACTIVITY.STATUS.IN_PROGRESS,
      CANCELLED: USER_ACTIVITY.STATUS.CANCELLED,
    };
  }

  /**
   * Get activity importance levels from constants
   * কনস্ট্যান্ট থেকে অ্যাক্টিভিটি ইমপোর্টেন্স লেভেল পাওয়া
   */
  getActivityImportance(): Record<string, string> {
    return {
      LOW: USER_ACTIVITY.IMPORTANCE.LOW,
      MEDIUM: USER_ACTIVITY.IMPORTANCE.MEDIUM,
      HIGH: USER_ACTIVITY.IMPORTANCE.HIGH,
      CRITICAL: USER_ACTIVITY.IMPORTANCE.CRITICAL,
    };
  }
}
