import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { FAQ_ENDPOINTS } from './faq.endpoints';
import type { FaqEntry, FaqListResponse } from './faq.types';

export const faqApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<FaqListResponse> => {
    const res = await httpClient.get<FaqListResponse>(FAQ_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<FaqEntry> => {
    const res = await httpClient.get<FaqEntry>(FAQ_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
