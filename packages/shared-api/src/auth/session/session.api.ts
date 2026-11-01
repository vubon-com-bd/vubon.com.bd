import { httpClient } from '../../common/client/client.factory';
import { SESSION_ENDPOINTS } from './session.endpoints';
import type { SessionListResponse } from './session.types';

export const sessionApi = {
  list: async (signal?: AbortSignal): Promise<SessionListResponse> => {
    const res = await httpClient.get<SessionListResponse>(SESSION_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },

  revoke: async (id: string, signal?: AbortSignal): Promise<void> => {
    await httpClient.delete<null>(SESSION_ENDPOINTS.revoke(id), {
      signal,
      timeout: 10_000,
    });
  },
} as const;
