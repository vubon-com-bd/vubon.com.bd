import { httpClient } from '../../common/client/client.factory';
import { SSO_ENDPOINTS } from './sso.endpoints';
import type { SsoLoginRequest, SsoLoginResponse } from './sso.types';

export const ssoApi = {
  login: async (input: SsoLoginRequest, signal?: AbortSignal): Promise<SsoLoginResponse> => {
    const res = await httpClient.post<SsoLoginResponse>(SSO_ENDPOINTS.login, input, {
      signal,
      timeout: 15_000,
    });
    return res.data;
  },
} as const;
