import { ApiClient } from '../client/api-client';
import { SEARCH_ENDPOINTS } from '../endpoints/search.endpoints';

export const searchApi = {
  search: <T>(body: unknown): Promise<T> => ApiClient.post(SEARCH_ENDPOINTS.SEARCH, body),
  suggest: (q: string, limit = 5): Promise<{ suggestions: string[] }> =>
    ApiClient.get(`${SEARCH_ENDPOINTS.SUGGEST}?q=${encodeURIComponent(q)}&limit=${limit}`),
  trending: (): Promise<{ keywords: string[] }> => ApiClient.get(SEARCH_ENDPOINTS.TRENDING),
} as const;
