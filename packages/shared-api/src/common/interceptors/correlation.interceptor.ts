import type { HttpRequestConfig } from '../client/client.types';

/**
 * Correlation ID interceptor.
 * MUST run FIRST in the request chain, LAST in the response chain.
 * Ensures every request carries X-Request-Id + X-Correlation-Id.
 */
function generateRequestId(): string {
  const time = Date.now().toString(36);
  const c = globalThis.crypto as Crypto | undefined;
  if (!c || typeof c.getRandomValues !== 'function') {
    return `req_${time}`;
  }
  const bytes = new Uint8Array(8);
  c.getRandomValues(bytes);
  const rand = Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
  return `req_${time}_${rand}`;
}

export function correlationInterceptor(config: HttpRequestConfig): HttpRequestConfig {
  const requestId =
    config.headers?.['X-Request-Id'] ??
    (config.meta?.requestId as string | undefined) ??
    generateRequestId();

  const correlationId =
    config.headers?.['X-Correlation-Id'] ??
    (config.meta?.correlationId as string | undefined) ??
    requestId;

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
