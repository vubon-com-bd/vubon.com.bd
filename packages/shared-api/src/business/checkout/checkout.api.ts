import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import { CHECKOUT_ENDPOINTS } from './checkout.endpoints';
import type {
  CheckoutConfirmRequest,
  CheckoutConfirmResponse,
  CheckoutInitiateRequest,
  CheckoutSession,
} from './checkout.types';

export interface CheckoutCancelRequest {
  readonly sessionId: string;
  readonly reason?: string;
}

export const checkoutApi = {
  initiate: async (
    input: CheckoutInitiateRequest,
    signal?: AbortSignal
  ): Promise<CheckoutSession> => {
    const res = await httpClient.post<CheckoutSession>(CHECKOUT_ENDPOINTS.initiate, input, {
      signal,
      timeout: 20_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  confirm: async (
    input: CheckoutConfirmRequest,
    signal?: AbortSignal
  ): Promise<CheckoutConfirmResponse> => {
    const res = await httpClient.post<CheckoutConfirmResponse>(CHECKOUT_ENDPOINTS.confirm, input, {
      signal,
      timeout: 30_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  cancel: async (input: CheckoutCancelRequest, signal?: AbortSignal): Promise<void> => {
    await httpClient.post<null>(CHECKOUT_ENDPOINTS.cancel, input, {
      signal,
      timeout: 10_000,
    });
  },
} as const;
