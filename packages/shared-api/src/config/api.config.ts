/**
 * API Client Configuration.
 * @module shared-api/config/api
 */

import { getOptionalEnv } from '@vubon/shared-config';

export interface ApiConfig {
  baseUrl: string;
  timeout: number;
  retries: number;
  retryDelay: number;
}

export const apiConfig: ApiConfig = {
  baseUrl: getOptionalEnv('API_URL', 'http://localhost:3000'),
  timeout: 30_000,
  retries: 3,
  retryDelay: 1000,
} as const;
