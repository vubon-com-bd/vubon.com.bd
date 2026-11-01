import { httpClient } from '../../../common/client/client.factory';
import type { QueryParams } from '../../../common/request/request.types';
import { DASHBOARD_ENDPOINTS } from './dashboard.endpoints';
import type { Dashboard } from './dashboard.types';

export const dashboardApi = {
  get: async (query?: QueryParams, signal?: AbortSignal): Promise<Dashboard> => {
    const res = await httpClient.get<Dashboard>(DASHBOARD_ENDPOINTS.get, {
      signal,
      timeout: 20_000,
      query,
    });
    return res.data;
  },
} as const;
