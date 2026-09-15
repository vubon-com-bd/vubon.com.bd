import { APP_CONFIG, APP_URL_CONFIG } from '@vubon/shared-config/common';

/**
 * Resolved HTTP client defaults.
 * Reads from shared-config — NEVER hardcode.
 */
export interface ResolvedClientConfig {
  readonly baseUrl: string;
  readonly defaultTimeoutMs: number;
  readonly defaultHeaders: Record<string, string>;
  readonly userAgent: string;
}

export function resolveClientConfig(): ResolvedClientConfig {
  return {
    baseUrl: APP_URL_CONFIG.api,
    defaultTimeoutMs: 30_000,
    defaultHeaders: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    userAgent: `${APP_CONFIG.name}/${APP_CONFIG.version}`,
  };
}
