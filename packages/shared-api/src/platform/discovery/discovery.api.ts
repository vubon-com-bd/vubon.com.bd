import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { DISCOVERY_ENDPOINTS } from './discovery.endpoints';
import type { DiscoveryFeedResponse, Recommendation, TrendingItem } from './discovery.types';

export const discoveryApi = {
  feed: async (query?: QueryParams, signal?: AbortSignal): Promise<DiscoveryFeedResponse> => {
    const res = await httpClient.get<DiscoveryFeedResponse>(DISCOVERY_ENDPOINTS.feed, {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },

  recommendations: async (
    query?: QueryParams,
    signal?: AbortSignal
  ): Promise<readonly Recommendation[]> => {
    const res = await httpClient.get<readonly Recommendation[]>(
      DISCOVERY_ENDPOINTS.recommendation,
      { signal, timeout: 10_000, query }
    );
    return res.data;
  },

  trending: async (query?: QueryParams, signal?: AbortSignal): Promise<readonly TrendingItem[]> => {
    const res = await httpClient.get<readonly TrendingItem[]>(DISCOVERY_ENDPOINTS.trending, {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },
} as const;
