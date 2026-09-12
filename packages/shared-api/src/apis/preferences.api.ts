import { ApiClient } from '../client/api-client';
import { PREFERENCES_ENDPOINTS } from '../endpoints/preferences.endpoints';

export const preferencesApi = {
  get: <T>(): Promise<T> => ApiClient.get(PREFERENCES_ENDPOINTS.GET),
  update: <T>(body: Partial<T>): Promise<T> => ApiClient.put(PREFERENCES_ENDPOINTS.UPDATE, body),
  reset: (): Promise<void> => ApiClient.post(PREFERENCES_ENDPOINTS.RESET),
} as const;
