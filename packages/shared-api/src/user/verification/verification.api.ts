import { httpClient } from '../../common/client/client.factory';
import { VERIFICATION_ENDPOINTS } from './verification.endpoints';
import type {
  ConfirmVerificationRequest,
  ConfirmVerificationResponse,
  StartVerificationRequest,
  StartVerificationResponse,
} from './verification.types';

export const verificationApi = {
  start: async (
    input: StartVerificationRequest,
    signal?: AbortSignal
  ): Promise<StartVerificationResponse> => {
    const res = await httpClient.post<StartVerificationResponse>(
      VERIFICATION_ENDPOINTS.start,
      input,
      { signal, timeout: 10_000 }
    );
    return res.data;
  },

  /**
   * Confirm code sent to user.
   * NOTE: There's no dedicated `/confirm` route in API_ROUTES yet.
   * We reuse VERIFICATION_STATUS for polling. When backend adds
   * VERIFICATION_CONFIRM, update endpoints here.
   */
  confirm: async (
    input: ConfirmVerificationRequest,
    signal?: AbortSignal
  ): Promise<ConfirmVerificationResponse> => {
    const res = await httpClient.post<ConfirmVerificationResponse>(
      VERIFICATION_ENDPOINTS.status,
      input,
      { signal, timeout: 10_000 }
    );
    return res.data;
  },
} as const;
