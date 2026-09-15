import type { HttpRequestConfig } from '../client/client.types';

/**
 * Retry interceptor.
 * Marks the request as retry-eligible (actual retry happens in
 * `common/retry/retry.handler.ts`, Phase 4).
 */
export interface RetryPolicy {
  readonly maxAttempts: number;
  readonly backoff: 'exponential' | 'linear';
  readonly baseDelayMs: number;
}

let retryPolicy: RetryPolicy | null = null;

/** App layer can override default retry policy. */
export function registerRetryPolicy(policy: RetryPolicy): void {
  retryPolicy = policy;
}

export function retryInterceptor(config: HttpRequestConfig): HttpRequestConfig {
  if (!retryPolicy) return config;
  if (config.method !== 'GET' && config.method !== 'PUT' && config.method !== 'DELETE') {
    return config;
  }
  return {
    ...config,
    meta: { ...(config.meta ?? {}), retry: retryPolicy },
  };
}
