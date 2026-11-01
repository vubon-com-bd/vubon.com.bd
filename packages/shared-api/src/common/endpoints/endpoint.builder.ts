import type { EndpointBuilder } from './endpoints.types';

/**
 * Build a static endpoint (no params).
 * `value` MUST come from shared-constants API_ROUTES.
 */
export function staticEndpoint(value: string): string {
  if (!value || typeof value !== 'string') {
    throw new Error('staticEndpoint: value must be a non-empty string');
  }
  return value;
}

/**
 * Build a parameterized endpoint.
 * `template` uses `:param` placeholders; values are URL-encoded.
 */
export function paramEndpoint<TParams extends Record<string, string | number>>(
  template: string,
  params: TParams
): string {
  return template.replace(/:([A-Za-z0-9_]+)/g, (_, key: string) => {
    const value = params[key];
    if (value === undefined) {
      throw new Error(`paramEndpoint: missing param "${key}"`);
    }
    return encodeURIComponent(String(value));
  });
}

/** Wrap a param endpoint into a reusable builder. */
export function createEndpointBuilder<TParams extends Record<string, string | number>>(
  template: string
): EndpointBuilder<[TParams]> {
  return (params: TParams) => paramEndpoint(template, params);
}
