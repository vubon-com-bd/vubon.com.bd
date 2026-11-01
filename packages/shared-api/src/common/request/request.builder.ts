import type { HttpMethod, HttpRequestConfig } from '../client/client.types';
import { stripBodyForGet } from './body';
import { sanitizeHeaders } from './headers';
import { appendQuery } from './params';
import type { QueryParams } from './request.types';

export interface BuildRequestInput {
  readonly method: HttpMethod;
  readonly url: string;
  readonly query?: QueryParams;
  readonly headers?: Record<string, unknown>;
  readonly body?: unknown;
  readonly signal?: AbortSignal;
  readonly timeout?: number;
  readonly meta?: Record<string, unknown>;
}

/** Build a normalized HttpRequestConfig. */
export function buildRequest(input: BuildRequestInput): HttpRequestConfig {
  return {
    method: input.method,
    url: appendQuery(input.url, input.query),
    headers: sanitizeHeaders(input.headers),
    body: stripBodyForGet(input.method, input.body),
    signal: input.signal,
    timeout: input.timeout,
    meta: input.meta,
  };
}
