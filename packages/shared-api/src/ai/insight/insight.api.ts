import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { AI_INSIGHT_ENDPOINTS } from './insight.endpoints';
import type { AiInsightListResponse } from './insight.types';

export const aiInsightApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<AiInsightListResponse> => {
    const res = await httpClient.get<AiInsightListResponse>(AI_INSIGHT_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },
} as const;
