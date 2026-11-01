import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { COURIER_ENDPOINTS } from './courier.endpoints';
import type { Courier, CourierListResponse } from './courier.types';

export const courierApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<CourierListResponse> => {
    const res = await httpClient.get<CourierListResponse>(COURIER_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Courier> => {
    const res = await httpClient.get<Courier>(COURIER_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
