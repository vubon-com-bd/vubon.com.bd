import { httpClient } from '../../common/client/client.factory';
import { generateIdempotencyKey } from '../../common/idempotency/idempotency-key';
import { KYC_ENDPOINTS } from './kyc.endpoints';
import type { KycStatus, KycSubmissionRequest, KycSubmissionResponse } from './kyc.types';

export const kycApi = {
  submit: async (
    input: KycSubmissionRequest,
    signal?: AbortSignal
  ): Promise<KycSubmissionResponse> => {
    const res = await httpClient.post<KycSubmissionResponse>(KYC_ENDPOINTS.submit, input, {
      signal,
      timeout: 60_000,
      headers: { 'Idempotency-Key': generateIdempotencyKey() },
    });
    return res.data;
  },

  status: async (signal?: AbortSignal): Promise<KycStatus> => {
    const res = await httpClient.get<{ status: KycStatus }>(KYC_ENDPOINTS.status, {
      signal,
      timeout: 10_000,
    });
    return res.data.status;
  },
} as const;
