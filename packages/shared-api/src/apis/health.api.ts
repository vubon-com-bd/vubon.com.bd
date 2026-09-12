/**
 * Health API.
 * @module shared-api/apis/health
 */

import { ApiClient } from '../client/api-client';
import { HEALTH_ENDPOINTS } from '../endpoints/health.endpoints';

export interface HealthStatus {
  status: string;
  uptime: number;
  timestamp: string;
  version: string;
  environment: string;
}

export const healthApi = {
  get: (): Promise<HealthStatus> => ApiClient.get(HEALTH_ENDPOINTS.GET),
  check: (): Promise<HealthStatus> => ApiClient.post(HEALTH_ENDPOINTS.CHECK),
  ready: (): Promise<HealthStatus> => ApiClient.get(HEALTH_ENDPOINTS.READY),
  live: (): Promise<HealthStatus> => ApiClient.get(HEALTH_ENDPOINTS.LIVE),
} as const;
