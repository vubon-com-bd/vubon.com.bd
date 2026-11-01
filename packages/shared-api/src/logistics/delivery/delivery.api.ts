import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { DELIVERY_ENDPOINTS } from './delivery.endpoints';
import type { Delivery, DeliveryListResponse } from './delivery.types';

export const deliveryApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<DeliveryListResponse> => {
    const res = await httpClient.get<DeliveryListResponse>(DELIVERY_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Delivery> => {
    const res = await httpClient.get<Delivery>(DELIVERY_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
