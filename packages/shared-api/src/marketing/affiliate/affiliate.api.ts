import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { AFFILIATE_ENDPOINTS } from './affiliate.endpoints';
import type { Affiliate, AffiliateListResponse, RegisterAffiliateRequest } from './affiliate.types';

export const affiliateApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<AffiliateListResponse> => {
    const res = await httpClient.get<AffiliateListResponse>(AFFILIATE_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Affiliate> => {
    const res = await httpClient.get<Affiliate>(AFFILIATE_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  register: async (input: RegisterAffiliateRequest, signal?: AbortSignal): Promise<Affiliate> => {
    const res = await httpClient.post<Affiliate>(AFFILIATE_ENDPOINTS.register, input, {
      signal,
      timeout: 20_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
