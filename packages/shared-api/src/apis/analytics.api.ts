import { ApiClient } from '../client/api-client';
import { ANALYTICS_ENDPOINTS } from '../endpoints/analytics.endpoints';

export const analyticsApi = {
  query: <T>(body: unknown): Promise<T> => ApiClient.post(ANALYTICS_ENDPOINTS.QUERY, body),
  metrics: (): Promise<{ metrics: string[] }> => ApiClient.get(ANALYTICS_ENDPOINTS.METRICS),
  realtime: (): Promise<unknown> => ApiClient.get(ANALYTICS_ENDPOINTS.REALTIME),
} as const;
