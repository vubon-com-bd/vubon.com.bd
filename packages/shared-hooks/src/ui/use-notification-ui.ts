import { useCallback, useState } from 'react';

export interface UiNotification {
  readonly id: string;
  readonly title: string;
  readonly body?: string;
  readonly read: boolean;
}

let counter = 0;
function nextId(): string {
  counter += 1;
  return `notif_${Date.now().toString(36)}_${counter}`;
}

export function useNotificationUI(initial: readonly UiNotification[] = []): {
  readonly notifications: readonly UiNotification[];
  readonly unreadCount: number;
  readonly push: (title: string, body?: string) => void;
  readonly markRead: (id: string) => void;
  readonly markAllRead: () => void;
  readonly remove: (id: string) => void;
  readonly clear: () => void;
} {
  const [notifications, setNotifications] = useState<readonly UiNotification[]>(initial);

  const push = useCallback((title: string, body?: string) => {
    setNotifications((prev) => [...prev, { id: nextId(), title, body, read: false }]);
  }, []);
  const markRead = useCallback((id: string) => {
    setNotifications((prev) => prev.map((n) => (n.id === id ? { ...n, read: true } : n)));
  }, []);
  const markAllRead = useCallback(() => {
    setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  }, []);
  const remove = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);
  const clear = useCallback(() => setNotifications([]), []);

  const unreadCount = notifications.filter((n) => !n.read).length;

  return { notifications, unreadCount, push, markRead, markAllRead, remove, clear };
}
