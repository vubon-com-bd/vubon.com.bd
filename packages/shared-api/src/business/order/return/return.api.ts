import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import { RETURN_ORDER_ENDPOINTS } from './return.endpoints';
import type { ReturnOrderRequest, ReturnOrderResponse } from './return.types';

export const returnOrderApi = {
  request: async (
    orderId: string,
    input: ReturnOrderRequest,
    signal?: AbortSignal
  ): Promise<ReturnOrderResponse> => {
    const res = await httpClient.post<ReturnOrderResponse>(
      RETURN_ORDER_ENDPOINTS.request(orderId),
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
