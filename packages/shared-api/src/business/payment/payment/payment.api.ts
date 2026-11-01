import { httpClient } from '../../../common/client/client.factory';
import { generateIdempotencyKey } from '../../../common/idempotency/idempotency-key';
import { PAYMENT_ENDPOINTS } from './payment.endpoints';
import type { CreatePaymentRequest, Payment, PaymentMethodInfo } from './payment.types';

export const paymentApi = {
  create: async (input: CreatePaymentRequest, signal?: AbortSignal): Promise<Payment> => {
    const res = await httpClient.post<Payment>(PAYMENT_ENDPOINTS.create, input, {
      signal,
      timeout: 30_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<Payment> => {
    const res = await httpClient.get<Payment>(PAYMENT_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  methods: async (signal?: AbortSignal): Promise<readonly PaymentMethodInfo[]> => {
    const res = await httpClient.get<readonly PaymentMethodInfo[]>(PAYMENT_ENDPOINTS.methods, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
