import type { HttpRequestConfig } from '../client/client.types';

/**
 * Correlation ID interceptor.
 * MUST run FIRST in the request chain, LAST in the response chain.
 * Ensures every request carries X-Request-Id + X-Correlation-Id.
 */
export function correlationInterceptor(config: HttpRequestConfig): HttpRequestConfig {
  const requestId =
    config.headers?.['X-Request-Id'] ??
    config.meta?.requestId ??
    `req_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;

  const correlationId =
    config.headers?.['X-Correlation-Id'] ?? config.meta?.correlationId ?? requestId;

  return {
    ...config,
    headers: {
      ...(config.headers ?? {}),
      'X-Request-Id': String(requestId),
      'X-Correlation-Id': String(correlationId),
    },
    meta: {
      ...(config.meta ?? {}),
      requestId,
      correlationId,
    },
  };
}
