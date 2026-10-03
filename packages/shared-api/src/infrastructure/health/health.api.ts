import { httpClient } from '../../common/client/client.factory';
import { ValidationError } from '../../common/errors/validation-error';
import { HEALTH_ENDPOINTS } from './health.endpoints';
import type { HealthResponse } from './health.types';

/**
 * Health API — transport only. No business logic.
 */
export const healthApi = {
  /**
   * Liveness probe.
   */
  live: async (signal?: AbortSignal): Promise<HealthResponse> => {
    const res = await httpClient.get<HealthResponse>(HEALTH_ENDPOINTS.live, {
      signal,
      timeout: 3000,
    });
    return res.data;
  },

  /**
   * Readiness probe.
   */
  ready: async (signal?: AbortSignal): Promise<HealthResponse> => {
    const res = await httpClient.get<HealthResponse>(HEALTH_ENDPOINTS.ready, {
      signal,
      timeout: 3000,
    });
    return res.data;
  },

  /**
   * Full health report.
   */
  full: async (signal?: AbortSignal): Promise<HealthResponse> => {
    const res = await httpClient.get<unknown>(HEALTH_ENDPOINTS.full, {
      signal,
      timeout: 5000,
    });
    if (!res.data || typeof res.data !== 'object') {
      throw new ValidationError('Invalid health response shape');
    }
    return res.data as HealthResponse;
  },
} as const;
