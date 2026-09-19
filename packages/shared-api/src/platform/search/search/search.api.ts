import { httpClient } from '../../../common/client/client.factory';
import { SEARCH_ENDPOINTS } from './search.endpoints';
import type { SearchRequest, SearchResponse } from './search.types';

export const searchApi = {
  query: async (input: SearchRequest, signal?: AbortSignal): Promise<SearchResponse> => {
    const res = await httpClient.post<SearchResponse>(SEARCH_ENDPOINTS.query, input, {
      signal,
      timeout: 15_000,
    });
    return res.data;
  },
} as const;
