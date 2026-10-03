import { httpClient } from '../../../common/client/client.factory';
import { VARIANT_ENDPOINTS } from './variant.endpoints';
import type { ProductVariant, VariantListResponse } from './variant.types';

export const variantApi = {
  list: async (productId: string, signal?: AbortSignal): Promise<VariantListResponse> => {
    const res = await httpClient.get<VariantListResponse>(VARIANT_ENDPOINTS.list(productId), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  detail: async (productId: string, id: string, signal?: AbortSignal): Promise<ProductVariant> => {
    const res = await httpClient.get<ProductVariant>(VARIANT_ENDPOINTS.detail(productId, id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
