import type { HttpRequestConfig, HttpResponse } from '../client/client.types';

/**
 * Logging interceptor.
 * NEVER logs body / headers with sensitive data.
 * Only url, method, status, requestId.
 */
export function loggingRequestInterceptor(config: HttpRequestConfig): HttpRequestConfig {
  // Replace with your logger (shared-utils/logger) later.
  // eslint-disable-next-line no-console
  console.debug('[http:req]', {
    method: config.method,
    url: config.url,
    requestId: config.meta?.requestId,
  });
  return config;
}

export function loggingResponseInterceptor<T>(response: HttpResponse<T>): HttpResponse<T> {
  // eslint-disable-next-line no-console
  console.debug('[http:res]', {
    status: response.status,
    requestId: response.requestId,
  });
  return response;
}
