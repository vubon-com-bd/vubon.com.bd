/**
 * Admin Notification Endpoints
 * অ্যাডমিন নোটিফিকেশন এন্ডপয়েন্ট
 */

import { AxiosClient } from '../client/axios.client';
import { FetchClient } from '../client/fetch.client';
import {
  AdminNotification,
  AdminNotificationCreateInput,
  AdminNotificationUpdateInput,
} from '@vubon/shared-types';
import { ADMIN_NOTIFICATION } from '@vubon/shared-constants';

export class AdminNotificationEndpoints {
  constructor(private client: AxiosClient | FetchClient) {}

  /**
   * Get admin notifications
   * অ্যাডমিনের নোটিফিকেশন পাওয়া
   */
  async getNotifications(
    adminId: string,
    params?: {
      page?: number;
      limit?: number;
      status?: string;
      priority?: string;
      type?: string;
    }
  ): Promise<{
    notifications: AdminNotification[];
    total: number;
    page: number;
    limit: number;
    unreadCount: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.status) queryParams.status = params.status;
    if (params?.priority) queryParams.priority = params.priority;
    if (params?.type) queryParams.type = params.type;

    return this.client.get(`/admin/${adminId}/notifications`, { params: queryParams });
  }

  /**
   * Get current admin notifications
   * বর্তমান অ্যাডমিনের নোটিফিকেশন পাওয়া
   */
  async getMyNotifications(params?: {
    page?: number;
    limit?: number;
    status?: string;
    priority?: string;
    type?: string;
  }): Promise<{
    notifications: AdminNotification[];
    total: number;
    page: number;
    limit: number;
    unreadCount: number;
  }> {
    const queryParams: Record<string, string> = {};
    if (params?.page) queryParams.page = String(params.page);
    if (params?.limit) queryParams.limit = String(params.limit);
    if (params?.status) queryParams.status = params.status;
    if (params?.priority) queryParams.priority = params.priority;
    if (params?.type) queryParams.type = params.type;

    return this.client.get('/admin/me/notifications', { params: queryParams });
  }

  /**
   * Get notification by ID
   * আইডি দ্বারা নোটিফিকেশন পাওয়া
   */
  async getNotification(notificationId: string): Promise<AdminNotification> {
    return this.client.get<AdminNotification>(`/admin/notifications/${notificationId}`);
  }

  /**
   * Create notification
   * নোটিফিকেশন তৈরি করা
   */
  async createNotification(data: AdminNotificationCreateInput): Promise<AdminNotification> {
    return this.client.post<AdminNotification>('/admin/notifications', data);
  }

  /**
   * Update notification
   * নোটিফিকেশন আপডেট করা
   */
  async updateNotification(
    notificationId: string,
    data: AdminNotificationUpdateInput
  ): Promise<AdminNotification> {
    return this.client.patch<AdminNotification>(`/admin/notifications/${notificationId}`, data);
  }

  /**
   * Mark notification as read
   * নোটিফিকেশন রিড হিসেবে মার্ক করা
   */
  async markAsRead(notificationId: string): Promise<{ success: boolean }> {
    return this.client.post<{ success: boolean }>(`/admin/notifications/${notificationId}/read`);
  }

  /**
   * Mark all notifications as read
   * সব নোটিফিকেশন রিড হিসেবে মার্ক করা
   */
  async markAllAsRead(adminId: string): Promise<{ success: boolean; count: number }> {
    return this.client.post<{ success: boolean; count: number }>(
      `/admin/${adminId}/notifications/read-all`
    );
  }

  /**
   * Delete notification
   * নোটিফিকেশন ডিলিট করা
   */
  async deleteNotification(notificationId: string): Promise<{ success: boolean }> {
    return this.client.delete<{ success: boolean }>(`/admin/notifications/${notificationId}`);
  }

  /**
   * Get notification types from constants
   * কনস্ট্যান্ট থেকে নোটিফিকেশন টাইপ পাওয়া
   */
  getNotificationTypes(): Record<string, string> {
    return {
      EMAIL: ADMIN_NOTIFICATION.TYPES.EMAIL,
      SMS: ADMIN_NOTIFICATION.TYPES.SMS,
      PUSH: ADMIN_NOTIFICATION.TYPES.PUSH,
      IN_APP: ADMIN_NOTIFICATION.TYPES.IN_APP,
      SYSTEM: ADMIN_NOTIFICATION.TYPES.SYSTEM,
      ALERT: ADMIN_NOTIFICATION.TYPES.ALERT,
    };
  }

  /**
   * Get notification priorities from constants
   * কনস্ট্যান্ট থেকে নোটিফিকেশন প্রায়োরিটি পাওয়া
   */
  getNotificationPriorities(): Record<string, string> {
    return {
      LOW: ADMIN_NOTIFICATION.PRIORITIES.LOW,
      MEDIUM: ADMIN_NOTIFICATION.PRIORITIES.MEDIUM,
      HIGH: ADMIN_NOTIFICATION.PRIORITIES.HIGH,
      URGENT: ADMIN_NOTIFICATION.PRIORITIES.URGENT,
      CRITICAL: ADMIN_NOTIFICATION.PRIORITIES.CRITICAL,
    };
  }

  /**
   * Get notification statuses from constants
   * কনস্ট্যান্ট থেকে নোটিফিকেশন স্ট্যাটাস পাওয়া
   */
  getNotificationStatuses(): Record<string, string> {
    return {
      PENDING: ADMIN_NOTIFICATION.STATUS.PENDING,
      SENT: ADMIN_NOTIFICATION.STATUS.SENT,
      DELIVERED: ADMIN_NOTIFICATION.STATUS.DELIVERED,
      READ: ADMIN_NOTIFICATION.STATUS.READ,
      FAILED: ADMIN_NOTIFICATION.STATUS.FAILED,
      CANCELLED: ADMIN_NOTIFICATION.STATUS.CANCELLED,
    };
  }

  /**
   * Get default notification config from constants
   * কনস্ট্যান্ট থেকে ডিফল্ট নোটিফিকেশন কনফিগ পাওয়া
   */
  getNotificationDefaults(): {
    batchSize: number;
    retryAttempts: number;
    retryDelay: number;
    expiryDays: number;
  } {
    return {
      batchSize: ADMIN_NOTIFICATION.DEFAULTS.BATCH_SIZE,
      retryAttempts: ADMIN_NOTIFICATION.DEFAULTS.RETRY_ATTEMPTS,
      retryDelay: ADMIN_NOTIFICATION.DEFAULTS.RETRY_DELAY,
      expiryDays: ADMIN_NOTIFICATION.DEFAULTS.EXPIRY_DAYS,
    };
  }
}
