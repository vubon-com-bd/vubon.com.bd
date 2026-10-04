import type { HttpRequestConfig } from '../client/client.types';

/**
 * Auth token provider — injected by the app layer.
 * shared-api NEVER reads localStorage / cookies directly.
 */
export type TokenProvider = () => string | null | undefined;

let tokenProvider: TokenProvider | null = null;

/** App layer calls this once at bootstrap. */
export function registerTokenProvider(provider: TokenProvider): void {
  tokenProvider = provider;
}

/**
 * Auth interceptor.
 * Injects Authorization header if a token is available.
 */
export function authInterceptor(config: HttpRequestConfig): HttpRequestConfig {
  const token = tokenProvider?.();
  if (!token) return config;

  return {
    ...config,
    headers: {
      ...(config.headers ?? {}),
      Authorization: `Bearer ${token}`,
    },
  };
}
