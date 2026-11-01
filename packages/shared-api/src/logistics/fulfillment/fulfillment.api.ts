import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { FULFILLMENT_ENDPOINTS } from './fulfillment.endpoints';
import type { Fulfillment, FulfillmentListResponse } from './fulfillment.types';

export const fulfillmentApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<FulfillmentListResponse> => {
    const res = await httpClient.get<FulfillmentListResponse>(FULFILLMENT_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Fulfillment> => {
    const res = await httpClient.get<Fulfillment>(FULFILLMENT_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
