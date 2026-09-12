import { ApiClient } from '../client/api-client';
import { NOTIFICATION_ENDPOINTS } from '../endpoints/notification.endpoints';

export const notificationApi = {
  list: (): Promise<unknown> => ApiClient.get(NOTIFICATION_ENDPOINTS.LIST),
  send: (body: unknown): Promise<unknown> => ApiClient.post(NOTIFICATION_ENDPOINTS.SEND, body),
  markRead: (id: string): Promise<void> => ApiClient.post(NOTIFICATION_ENDPOINTS.MARK_READ(id)),
  markAllRead: (): Promise<void> => ApiClient.post(NOTIFICATION_ENDPOINTS.MARK_ALL_READ),
  unreadCount: (): Promise<number> => ApiClient.get(NOTIFICATION_ENDPOINTS.UNREAD_COUNT),
} as const;
