import { httpClient } from '../../../common/client/client.factory';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';
import { BRAND_ENDPOINTS } from './brand.endpoints';
import type { Brand, BrandListResponse } from './brand.types';

export const brandApi = {
  list: async (signal?: AbortSignal): Promise<BrandListResponse> => {
    const res = await httpClient.get<BrandListResponse>(BRAND_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Brand> => {
    const res = await httpClient.get<Brand>(paramEndpoint(BRAND_ENDPOINTS.detail, { id }), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
