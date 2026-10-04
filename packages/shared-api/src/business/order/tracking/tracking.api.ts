import { httpClient } from '../../../common/client/client.factory';
import { ORDER_TRACKING_ENDPOINTS } from './tracking.endpoints';
import type { OrderTracking } from './tracking.types';

export const orderTrackingApi = {
  get: async (orderId: string, signal?: AbortSignal): Promise<OrderTracking> => {
    const res = await httpClient.get<OrderTracking>(ORDER_TRACKING_ENDPOINTS.get(orderId), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
