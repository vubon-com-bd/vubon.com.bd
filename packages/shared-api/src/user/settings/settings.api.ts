import { httpClient } from '../../common/client/client.factory';
import { SETTINGS_ENDPOINTS } from './settings.endpoints';
import type { UpdateSettingsRequest, UserSettings } from './settings.types';

export const settingsApi = {
  get: async (signal?: AbortSignal): Promise<UserSettings> => {
    const res = await httpClient.get<UserSettings>(SETTINGS_ENDPOINTS.get, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  update: async (input: UpdateSettingsRequest, signal?: AbortSignal): Promise<UserSettings> => {
    const res = await httpClient.patch<UserSettings>(SETTINGS_ENDPOINTS.update, input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
