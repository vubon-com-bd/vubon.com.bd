/**
 * useAdminNotifications Hook
 * অ্যাডমিন নোটিফিকেশন পাওয়ার হুক
 */

import { useQuery } from '@tanstack/react-query';
import { AdminNotificationEndpoints } from '@vubon/shared-api';
import { AdminNotification } from '@vubon/shared-types';

export interface UseAdminNotificationsOptions {
  page?: number;
  limit?: number;
  status?: string;
  priority?: string;
  type?: string;
}

export const useAdminNotifications = (
  notificationEndpoints: AdminNotificationEndpoints,
  adminId: string,
  options: UseAdminNotificationsOptions = {}
) => {
  const { page = 1, limit = 10, status, priority, type } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'notifications', adminId, { page, limit, status, priority, type }],
    queryFn: () =>
      notificationEndpoints.getNotifications(adminId, { page, limit, status, priority, type }),
    enabled: !!adminId,
    staleTime: 1 * 60 * 1000,
  });

  // AdminNotification টাইপ ব্যবহার করে টাইপ-সেফ ডেটা পাওয়া
  const notifications: AdminNotification[] = data?.notifications || [];
  const unreadNotifications = notifications.filter(
    (n) => n.status === 'pending' || n.status === 'sent'
  );

  // প্রায়োরিটি অনুযায়ী নোটিফিকেশন ফিল্টার করা
  const getNotificationsByPriority = (priority: string): AdminNotification[] => {
    return notifications.filter((n) => n.priority === priority);
  };

  // টাইপ অনুযায়ী নোটিফিকেশন ফিল্টার করা
  const getNotificationsByType = (type: string): AdminNotification[] => {
    return notifications.filter((n) => n.type === type);
  };

  // আনরিড নোটিফিকেশন কাউন্ট
  const unreadCount = unreadNotifications.length;

  // ক্রিটিকাল নোটিফিকেশন পাওয়া
  const getCriticalNotifications = (): AdminNotification[] => {
    return notifications.filter((n) => n.priority === 'critical' || n.priority === 'urgent');
  };

  return {
    notifications,
    unreadCount,
    unreadNotifications,
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    isLoading,
    error,
    refetch,
    getNotificationsByPriority,
    getNotificationsByType,
    getCriticalNotifications,
  };
};

export const useMyAdminNotifications = (
  notificationEndpoints: AdminNotificationEndpoints,
  options: UseAdminNotificationsOptions = {}
) => {
  const { page = 1, limit = 10, status, priority, type } = options;

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['admin', 'notifications', 'me', { page, limit, status, priority, type }],
    queryFn: () =>
      notificationEndpoints.getMyNotifications({ page, limit, status, priority, type }),
    staleTime: 1 * 60 * 1000,
  });

  const notifications: AdminNotification[] = data?.notifications || [];
  const unreadNotifications = notifications.filter(
    (n) => n.status === 'pending' || n.status === 'sent'
  );

  return {
    notifications,
    unreadCount: data?.unreadCount || 0,
    unreadNotifications,
    total: data?.total || 0,
    page: data?.page || page,
    limit: data?.limit || limit,
    isLoading,
    error,
    refetch,
  };
};
