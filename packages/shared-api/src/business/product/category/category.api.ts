import { httpClient } from '../../../common/client/client.factory';
import { paramEndpoint } from '../../../common/endpoints/endpoint.builder';
import { CATEGORY_ENDPOINTS } from './category.endpoints';
import type { Category, CategoryListResponse } from './category.types';

export const categoryApi = {
  list: async (signal?: AbortSignal): Promise<CategoryListResponse> => {
    const res = await httpClient.get<CategoryListResponse>(CATEGORY_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Category> => {
    const res = await httpClient.get<Category>(paramEndpoint(CATEGORY_ENDPOINTS.detail, { id }), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
