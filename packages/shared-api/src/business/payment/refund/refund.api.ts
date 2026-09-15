import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import { REFUND_ENDPOINTS } from './refund.endpoints';
import type { CreateRefundRequest, Refund } from './refund.types';

export const refundApi = {
  create: async (
    paymentId: string,
    input: CreateRefundRequest,
    signal?: AbortSignal
  ): Promise<Refund> => {
    const res = await httpClient.post<Refund>(REFUND_ENDPOINTS.create(paymentId), input, {
      signal,
      timeout: 30_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
