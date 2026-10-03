import { httpClient } from '../../common/client/client.factory';
import { REFRESH_TOKEN_ENDPOINTS } from './refresh-token.endpoints';
import type { RefreshTokenRequest, RefreshTokenResponse } from './refresh-token.types';

/**
 * Refresh API — called by auth interceptor on 401.
 * NOT called directly by app code.
 */
export const refreshTokenApi = {
  refresh: async (
    input: RefreshTokenRequest,
    signal?: AbortSignal
  ): Promise<RefreshTokenResponse> => {
    const res = await httpClient.post<RefreshTokenResponse>(
      REFRESH_TOKEN_ENDPOINTS.refresh,
      input,
      { signal, timeout: 10_000 }
    );
    return res.data;
  },
} as const;
