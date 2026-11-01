import { httpClient } from '../../common/client/client.factory';
import { METRICS_ENDPOINTS } from './metrics.endpoints';
import type { MetricsResponse } from './metrics.types';

/**
 * Metrics API — internal monitoring only.
 */
export const metricsApi = {
  snapshot: async (signal?: AbortSignal): Promise<MetricsResponse> => {
    const res = await httpClient.get<MetricsResponse>(METRICS_ENDPOINTS.snapshot, {
      signal,
      timeout: 5000,
    });
    return res.data;
  },

  /** Prometheus text format — returned as raw string. */
  prometheus: async (signal?: AbortSignal): Promise<string> => {
    const res = await httpClient.get<string>(METRICS_ENDPOINTS.prometheus, {
      signal,
      timeout: 5000,
    });
    return typeof res.data === 'string' ? res.data : String(res.data);
  },
} as const;
