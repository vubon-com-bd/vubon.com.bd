import { httpClient } from '../../../common/client/client.factory';
import type { QueryParams } from '../../../common/request/request.types';
import { NOTIFICATION_ENDPOINTS } from './notification.endpoints';
import type { Notification, NotificationListResponse } from './notification.types';

export const notificationApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<NotificationListResponse> => {
    const res = await httpClient.get<NotificationListResponse>(NOTIFICATION_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Notification> => {
    const res = await httpClient.get<Notification>(NOTIFICATION_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  markRead: async (id: string, signal?: AbortSignal): Promise<Notification> => {
    const res = await httpClient.patch<Notification>(
      NOTIFICATION_ENDPOINTS.markRead(id),
      { status: 'read' },
      { signal, timeout: 10_000 }
    );
    return res.data;
  },

  markAllRead: async (signal?: AbortSignal): Promise<void> => {
    await httpClient.patch<null>(
      NOTIFICATION_ENDPOINTS.markAllRead,
      {},
      { signal, timeout: 10_000 }
    );
  },
} as const;
