import { httpClient } from '../../common/client/client.factory';
import type { QueryParams } from '../../common/request/request.types';
import { ACTIVITY_ENDPOINTS } from './activity.endpoints';
import type { ActivityEntry, ActivityListResponse } from './activity.types';

export const activityApi = {
  list: async (query?: QueryParams, signal?: AbortSignal): Promise<ActivityListResponse> => {
    const res = await httpClient.get<ActivityListResponse>(ACTIVITY_ENDPOINTS.list, {
      signal,
      timeout: 10_000,
      query,
    });
    return res.data;
  },

  detail: async (id: string, signal?: AbortSignal): Promise<ActivityEntry> => {
    const res = await httpClient.get<ActivityEntry>(ACTIVITY_ENDPOINTS.detail(id), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
