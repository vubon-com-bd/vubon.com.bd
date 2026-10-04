import { httpClient } from '../../common/client/client.factory';
import { FORGOT_PASSWORD_ENDPOINTS } from './forgot-password.endpoints';
import type { ForgotPasswordRequest, ForgotPasswordResponse } from './forgot-password.types';

export const forgotPasswordApi = {
  submit: async (
    input: ForgotPasswordRequest,
    signal?: AbortSignal
  ): Promise<ForgotPasswordResponse> => {
    const res = await httpClient.post<ForgotPasswordResponse>(
      FORGOT_PASSWORD_ENDPOINTS.submit,
      input,
      { signal, timeout: 10_000 }
    );
    return res.data;
  },
} as const;
