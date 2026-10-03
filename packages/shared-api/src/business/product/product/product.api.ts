import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../../common/request/request.types';
import { PRODUCT_ENDPOINTS } from './product.endpoints';
import type {
  CreateProductRequest,
  Product,
  ProductListResponse,
  UpdateProductRequest,
} from './product.types';

export const productApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<ProductListResponse> => {
    const res = await httpClient.get<ProductListResponse>(PRODUCT_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Product> => {
    const res = await httpClient.get<Product>(PRODUCT_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  create: async (input: CreateProductRequest, signal?: AbortSignal): Promise<Product> => {
    const res = await httpClient.post<Product>(PRODUCT_ENDPOINTS.create, input, {
      signal,
      timeout: 20_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  update: async (
    id: string,
    input: UpdateProductRequest,
    signal?: AbortSignal
  ): Promise<Product> => {
    const res = await httpClient.patch<Product>(PRODUCT_ENDPOINTS.detail(id), input, {
      signal,
      timeout: 20_000,
    });
    return res.data;
  },

  remove: async (id: string, signal?: AbortSignal): Promise<void> => {
    await httpClient.delete<null>(PRODUCT_ENDPOINTS.detail(id), {
      signal,
      timeout: 15_000,
    });
  },
} as const;
