import { httpClient } from '../../common/client/client.factory';
import { VERIFY_EMAIL_ENDPOINTS } from './verify-email.endpoints';
import type { VerifyEmailRequest, VerifyEmailResponse } from './verify-email.types';

export const verifyEmailApi = {
  submit: async (input: VerifyEmailRequest, signal?: AbortSignal): Promise<VerifyEmailResponse> => {
    const res = await httpClient.post<VerifyEmailResponse>(VERIFY_EMAIL_ENDPOINTS.submit, input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
