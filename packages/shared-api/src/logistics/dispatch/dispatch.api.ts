import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../common/request/request.types';
import { DISPATCH_ENDPOINTS } from './dispatch.endpoints';
import type { CreateDispatchRequest, Dispatch, DispatchListResponse } from './dispatch.types';

export const dispatchApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<DispatchListResponse> => {
    const res = await httpClient.get<DispatchListResponse>(DISPATCH_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  create: async (input: CreateDispatchRequest, signal?: AbortSignal): Promise<Dispatch> => {
    const res = await httpClient.post<Dispatch>(DISPATCH_ENDPOINTS.create, input, {
      signal,
      timeout: 20_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
