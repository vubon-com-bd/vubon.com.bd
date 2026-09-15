import { httpClient } from '../../common/client/client.factory';
import { PREFERENCES_ENDPOINTS } from './preferences.endpoints';
import type { UpdatePreferencesRequest, UserPreferences } from './preferences.types';

export const preferencesApi = {
  get: async (signal?: AbortSignal): Promise<UserPreferences> => {
    const res = await httpClient.get<UserPreferences>(PREFERENCES_ENDPOINTS.get, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  update: async (
    input: UpdatePreferencesRequest,
    signal?: AbortSignal
  ): Promise<UserPreferences> => {
    const res = await httpClient.patch<UserPreferences>(PREFERENCES_ENDPOINTS.update, input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
