import { ApiClient } from '../client/api-client';
import { SETTINGS_ENDPOINTS } from '../endpoints/settings.endpoints';

export const settingsApi = {
  get: <T>(): Promise<T> => ApiClient.get(SETTINGS_ENDPOINTS.GET),
  update: <T>(body: Partial<T>): Promise<T> => ApiClient.put(SETTINGS_ENDPOINTS.UPDATE, body),
  reset: (): Promise<void> => ApiClient.post(SETTINGS_ENDPOINTS.RESET),
} as const;
