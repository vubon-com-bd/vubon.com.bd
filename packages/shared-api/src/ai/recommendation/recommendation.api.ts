import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { AI_RECOMMENDATION_ENDPOINTS } from './recommendation.endpoints';
import type { AiRecommendationResponse } from './recommendation.types';

export const aiRecommendationApi = {
  get: async (query?: QueryParams, signal?: AbortSignal): Promise<AiRecommendationResponse> => {
    const res = await httpClient.get<AiRecommendationResponse>(AI_RECOMMENDATION_ENDPOINTS.get, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },
} as const;
