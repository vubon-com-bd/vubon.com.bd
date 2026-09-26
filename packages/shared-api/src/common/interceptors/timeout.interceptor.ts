import { resolveClientConfig } from '../client/client.config';
import type { HttpRequestConfig } from '../client/client.types';

/**
 * Timeout interceptor.
 * Fills in `config.timeout` if the caller omitted it.
 */
export function timeoutInterceptor(config: HttpRequestConfig): HttpRequestConfig {
  if (config.timeout !== undefined) return config;

  const { defaultTimeoutMs } = resolveClientConfig();
  return { ...config, timeout: defaultTimeoutMs };
}
