import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { CAMPAIGN_ENDPOINTS } from './campaign.endpoints';
import type { Campaign, CampaignListResponse, CreateCampaignRequest } from './campaign.types';

export const campaignApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<CampaignListResponse> => {
    const res = await httpClient.get<CampaignListResponse>(CAMPAIGN_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Campaign> => {
    const res = await httpClient.get<Campaign>(CAMPAIGN_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  create: async (input: CreateCampaignRequest, signal?: AbortSignal): Promise<Campaign> => {
    const res = await httpClient.post<Campaign>(CAMPAIGN_ENDPOINTS.create, input, {
      signal,
      timeout: 20_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
