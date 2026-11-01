import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import type { QueryParams } from '../../../common/request/request.types';
import { ORDER_ENDPOINTS } from './order.endpoints';
import type { CreateOrderRequest, Order, OrderListResponse } from './order.types';

export const orderApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<OrderListResponse> => {
    const res = await httpClient.get<OrderListResponse>(ORDER_ENDPOINTS.list, {
      signal,
      timeout: 15_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Order> => {
    const res = await httpClient.get<Order>(ORDER_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  create: async (input: CreateOrderRequest, signal?: AbortSignal): Promise<Order> => {
    const res = await httpClient.post<Order>(ORDER_ENDPOINTS.create, input, {
      signal,
      timeout: 30_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
