import { httpClient } from '../../common/client/client.factory';
import { MFA_ENDPOINTS } from './mfa.endpoints';
import type {
  MfaSetupRequest,
  MfaSetupResponse,
  MfaVerifyRequest,
  MfaVerifyResponse,
} from './mfa.types';

export const mfaApi = {
  setup: async (input: MfaSetupRequest, signal?: AbortSignal): Promise<MfaSetupResponse> => {
    const res = await httpClient.post<MfaSetupResponse>(MFA_ENDPOINTS.setup, input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  verify: async (input: MfaVerifyRequest, signal?: AbortSignal): Promise<MfaVerifyResponse> => {
    const res = await httpClient.post<MfaVerifyResponse>(MFA_ENDPOINTS.verify, input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
