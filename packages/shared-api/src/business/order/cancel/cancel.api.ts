import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import { CANCEL_ORDER_ENDPOINTS } from './cancel.endpoints';
import type { CancelOrderRequest, CancelOrderResponse } from './cancel.types';

export const cancelOrderApi = {
  cancel: async (
    orderId: string,
    input: CancelOrderRequest,
    signal?: AbortSignal
  ): Promise<CancelOrderResponse> => {
    const res = await httpClient.post<CancelOrderResponse>(
      CANCEL_ORDER_ENDPOINTS.cancel(orderId),
      input,
      {
        signal,
        timeout: 20_000,
        headers: { 'Idempotency-Key': generateIdempotencyKey() },
      }
    );
    return res.data;
  },
} as const;
