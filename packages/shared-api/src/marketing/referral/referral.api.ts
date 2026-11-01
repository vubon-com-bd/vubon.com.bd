import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import { REFERRAL_ENDPOINTS } from './referral.endpoints';
import type { InviteReferralRequest, Referral, ReferralStats } from './referral.types';

export const referralApi = {
  get: async (signal?: AbortSignal): Promise<ReferralStats> => {
    const res = await httpClient.get<ReferralStats>(REFERRAL_ENDPOINTS.get, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  invite: async (input: InviteReferralRequest, signal?: AbortSignal): Promise<Referral> => {
    const res = await httpClient.post<Referral>(REFERRAL_ENDPOINTS.invite, input, {
      signal,
      timeout: 15_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },
} as const;
