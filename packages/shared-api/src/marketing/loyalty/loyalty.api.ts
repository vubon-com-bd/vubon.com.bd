import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import { LOYALTY_ENDPOINTS } from './loyalty.endpoints';
import type { LoyaltyAccount, RedeemLoyaltyRequest, RedeemLoyaltyResponse } from './loyalty.types';

export const loyaltyApi = {
  get: async (signal?: AbortSignal): Promise<LoyaltyAccount> => {
    const res = await httpClient.get<LoyaltyAccount>(LOYALTY_ENDPOINTS.get, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  redeem: async (
    input: RedeemLoyaltyRequest,
    signal?: AbortSignal
  ): Promise<RedeemLoyaltyResponse> => {
    const res = await httpClient.post<RedeemLoyaltyResponse>(LOYALTY_ENDPOINTS.redeem, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
