import { httpClient } from '../../common/client/client.factory';
import { SOCIAL_ENDPOINTS } from './social.endpoints';
import type { SocialLoginRequest, SocialLoginResponse } from './social.types';

export const socialApi = {
  login: async (input: SocialLoginRequest, signal?: AbortSignal): Promise<SocialLoginResponse> => {
    const res = await httpClient.post<SocialLoginResponse>(
      SOCIAL_ENDPOINTS.login(input.provider),
      { code: input.code, redirectUri: input.redirectUri },
      { signal, timeout: 15_000 }
    );
    return res.data;
  },
} as const;
