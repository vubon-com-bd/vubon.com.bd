import { useState, useCallback } from 'react';

/**
 * Notification UI-state hook.
 * Decoupled from HTTP — pass in a fetcher via options.
 */
export interface NotificationItem {
  notificationId: string;
  isRead: boolean;
  [key: string]: unknown;
}

export interface UseNotificationOptions<T extends NotificationItem> {
  fetcher?: () => Promise<T[]>;
  initialNotifications?: T[];
}

export interface UseNotificationReturn<T extends NotificationItem> {
  notifications: T[];
  unreadCount: number;
  loading: boolean;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  dismiss: (id: string) => void;
  clearAll: () => void;
  setNotifications: (n: T[]) => void;
}

export const useNotification = <T extends NotificationItem>(
  options: UseNotificationOptions<T> = {}
): UseNotificationReturn<T> => {
  const { fetcher, initialNotifications = [] } = options;
  const [notifications, setNotifications] = useState<T[]>(initialNotifications);
  const [loading, setLoading] = useState(false);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  const fetchNotifications = useCallback(async () => {
    if (!fetcher) return;
    setLoading(true);
    try {
      const list = await fetcher();
      setNotifications(list);
    } finally {
      setLoading(false);
    }
  }, [fetcher]);

  const markAsRead = useCallback((id: string) => {
    setNotifications((prev) =>
      prev.map((n) => (n.notificationId === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllAsRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const dismiss = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.notificationId !== id));
  }, []);

  const clearAll = useCallback(() => setNotifications([]), []);

  return {
    notifications,
    unreadCount,
    loading,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    dismiss,
    clearAll,
    setNotifications,
  };
};
