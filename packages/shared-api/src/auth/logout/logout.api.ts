import { httpClient } from '../../common/client/client.factory';
import { LOGOUT_ENDPOINTS } from './logout.endpoints';
import type { LogoutRequest } from './logout.types';

export const logoutApi = {
  submit: async (input: LogoutRequest = {}, signal?: AbortSignal): Promise<void> => {
    await httpClient.post<null>(LOGOUT_ENDPOINTS.submit, input, {
      signal,
      timeout: 5000,
    });
  },
} as const;
