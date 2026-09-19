import { httpClient } from '../../common/client/client.factory';
import { OAUTH_ENDPOINTS } from './oauth.endpoints';
import type {
  OAuthAuthorizeRequest,
  OAuthAuthorizeResponse,
  OAuthCallbackRequest,
  OAuthCallbackResponse,
} from './oauth.types';

export const oauthApi = {
  authorize: async (
    input: OAuthAuthorizeRequest,
    signal?: AbortSignal
  ): Promise<OAuthAuthorizeResponse> => {
    const res = await httpClient.post<OAuthAuthorizeResponse>(OAUTH_ENDPOINTS.authorize, input, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  callback: async (
    input: OAuthCallbackRequest,
    signal?: AbortSignal
  ): Promise<OAuthCallbackResponse> => {
    const res = await httpClient.post<OAuthCallbackResponse>(OAUTH_ENDPOINTS.callback, input, {
      signal,
      timeout: 15_000,
    });
    return res.data;
  },
} as const;
