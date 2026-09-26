import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { PROMOTION_ENDPOINTS } from './promotion.endpoints';
import type { Promotion, PromotionListResponse } from './promotion.types';

export const promotionApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<PromotionListResponse> => {
    const res = await httpClient.get<PromotionListResponse>(PROMOTION_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Promotion> => {
    const res = await httpClient.get<Promotion>(PROMOTION_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
