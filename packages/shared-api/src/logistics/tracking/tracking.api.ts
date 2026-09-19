import { httpClient } from '../../common/client/client.factory';
import { TRACKING_ENDPOINTS } from './tracking.endpoints';
import type { TrackingInfo } from './tracking.types';

export const trackingApi = {
  get: async (trackingId: string, signal?: AbortSignal): Promise<TrackingInfo> => {
    const res = await httpClient.get<TrackingInfo>(TRACKING_ENDPOINTS.get(trackingId), {
      signal,
      timeout: 10_000,
    });
    return res.data;
  },
} as const;
