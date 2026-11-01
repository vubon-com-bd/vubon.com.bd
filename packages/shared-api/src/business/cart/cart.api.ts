import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import { CART_ENDPOINTS } from './cart.endpoints';
import type {
  AddToCartRequest,
  ApplyCouponRequest,
  Cart,
  UpdateCartItemRequest,
} from './cart.types';

export const cartApi = {
  get: async (signal?: AbortSignal): Promise<Cart> => {
    const res = await httpClient.get<Cart>(CART_ENDPOINTS.get, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  add: async (input: AddToCartRequest, signal?: AbortSignal): Promise<Cart> => {
    const res = await httpClient.post<Cart>(CART_ENDPOINTS.add, input, {
      signal,
      timeout: 10_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  updateItem: async (
    id: string,
    input: UpdateCartItemRequest,
    signal?: AbortSignal
  ): Promise<Cart> => {
    const res = await httpClient.patch<Cart>(CART_ENDPOINTS.item(id), input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  removeItem: async (id: string, signal?: AbortSignal): Promise<Cart> => {
    const res = await httpClient.delete<Cart>(CART_ENDPOINTS.remove(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  clear: async (signal?: AbortSignal): Promise<void> => {
    await httpClient.delete<null>(CART_ENDPOINTS.clear, {
      signal,
      timeout: 10_000,
    });
  },

  applyCoupon: async (input: ApplyCouponRequest, signal?: AbortSignal): Promise<Cart> => {
    const res = await httpClient.post<Cart>(CART_ENDPOINTS.applyCoupon, input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  removeCoupon: async (signal?: AbortSignal): Promise<Cart> => {
    const res = await httpClient.delete<Cart>(CART_ENDPOINTS.removeCoupon, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
