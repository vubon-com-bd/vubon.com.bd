import { ApiClient } from '../client/api-client';
import { VERIFICATION_ENDPOINTS } from '../endpoints/verification.endpoints';

export const verificationApi = {
  send: (type: string, value: string): Promise<{ expiresAt: string }> =>
    ApiClient.post(VERIFICATION_ENDPOINTS.SEND, { type, value }),
  verify: (type: string, code: string): Promise<{ verified: boolean }> =>
    ApiClient.post(VERIFICATION_ENDPOINTS.VERIFY, { type, code }),
  resend: (type: string): Promise<void> => ApiClient.post(VERIFICATION_ENDPOINTS.RESEND, { type }),
  status: (): Promise<unknown> => ApiClient.get(VERIFICATION_ENDPOINTS.STATUS),
} as const;
