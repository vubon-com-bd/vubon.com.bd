import { httpClient } from '../../common/client/client.factory';
import { RESET_PASSWORD_ENDPOINTS } from './reset-password.endpoints';
import type { ResetPasswordRequest, ResetPasswordResponse } from './reset-password.types';

export const resetPasswordApi = {
  submit: async (
    input: ResetPasswordRequest,
    signal?: AbortSignal
  ): Promise<ResetPasswordResponse> => {
    const res = await httpClient.post<ResetPasswordResponse>(
      RESET_PASSWORD_ENDPOINTS.submit,
      input,
      { signal, timeout: 10_000 }
    );
    return res.data;
  },
} as const;
