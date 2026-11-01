import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { LEAD_GENERATION_ENDPOINTS } from './lead-generation.endpoints';
import type { CreateLeadRequest, Lead, LeadListResponse } from './lead-generation.types';

export const leadGenerationApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<LeadListResponse> => {
    const res = await httpClient.get<LeadListResponse>(LEAD_GENERATION_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  create: async (input: CreateLeadRequest, signal?: AbortSignal): Promise<Lead> => {
    const res = await httpClient.post<Lead>(LEAD_GENERATION_ENDPOINTS.create, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
