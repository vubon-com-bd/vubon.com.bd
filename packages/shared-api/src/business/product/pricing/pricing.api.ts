import { httpClient } from '../../../common/client/client.factory';
import { PRICING_ENDPOINTS } from './pricing.endpoints';
import type { ProductPrice } from './pricing.types';

export interface PricingUpdateRequest {
  readonly basePrice?: number;
  readonly salePrice?: number;
  readonly validUntil?: string;
}

export const pricingApi = {
  get: async (productId: string, signal?: AbortSignal): Promise<ProductPrice> => {
    const res = await httpClient.get<ProductPrice>(PRICING_ENDPOINTS.get(productId), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  update: async (
    productId: string,
    input: PricingUpdateRequest,
    signal?: AbortSignal
  ): Promise<ProductPrice> => {
    const res = await httpClient.patch<ProductPrice>(PRICING_ENDPOINTS.update(productId), input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
