import { httpClient } from '../../common/client/client.factory';
import { VERSION_ENDPOINTS } from './version.endpoints';
import type { VersionResponse } from './version.types';

/**
 * Version API — only when API versioning is enabled.
 */
export const versionApi = {
  current: async (signal?: AbortSignal): Promise<VersionResponse> => {
    const res = await httpClient.get<VersionResponse>(VERSION_ENDPOINTS.current, {
      signal,
      timeout: 3000,
    });
    return res.data;
  },
} as const;
