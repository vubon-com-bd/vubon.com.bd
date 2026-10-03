import { httpClient } from '../../common/client/client.factory';
import { AI_RANKING_ENDPOINTS } from './ranking.endpoints';
import type { RankingRequest, RankingResponse } from './ranking.types';

export const aiRankingApi = {
  rank: async (input: RankingRequest, signal?: AbortSignal): Promise<RankingResponse> => {
    const res = await httpClient.post<RankingResponse>(AI_RANKING_ENDPOINTS.rank, input, {
      signal,
      timeout: 15_000,
    });
    return res.data;
  },
} as const;
