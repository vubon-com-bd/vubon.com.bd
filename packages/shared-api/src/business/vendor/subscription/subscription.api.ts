import { httpClient } from '../../../common/client/client.factory';
import { SUBSCRIPTION_ENDPOINTS } from './subscription.endpoints';
import type { VendorSubscription } from './subscription.types';

export const subscriptionApi = {
  get: async (vendorId: string, signal?: AbortSignal): Promise<VendorSubscription> => {
    const res = await httpClient.get<VendorSubscription>(SUBSCRIPTION_ENDPOINTS.get(vendorId), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
