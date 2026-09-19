import { httpClient } from '../../../common/client/client.factory';
import { NOTIFICATION_PREFERENCES_ENDPOINTS } from './preferences.endpoints';
import type {
  NotificationPreferences,
  UpdateNotificationPreferencesRequest,
} from './preferences.types';

export const notificationPreferencesApi = {
  get: async (signal?: AbortSignal): Promise<NotificationPreferences> => {
    const res = await httpClient.get<NotificationPreferences>(
      NOTIFICATION_PREFERENCES_ENDPOINTS.get,
      { signal, timeout: 10_000 }
    );
    return res.data;
  },

  update: async (
    input: UpdateNotificationPreferencesRequest,
    signal?: AbortSignal
  ): Promise<NotificationPreferences> => {
    const res = await httpClient.patch<NotificationPreferences>(
      NOTIFICATION_PREFERENCES_ENDPOINTS.update,
      input,
      { signal, timeout: 10_000 }
    );
    return res.data;
  },
} as const;
