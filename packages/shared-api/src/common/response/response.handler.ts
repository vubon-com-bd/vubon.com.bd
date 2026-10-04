import type { HttpResponse } from '../client/client.types';
import { parseEnvelope } from './parser';
import type { ParsedResponse } from './response.types';

/**
 * Convert a raw HttpResponse<unknown> into a typed response.
 * Envelope unwrap only. Business transform stays outside.
 */
export function handleResponse<T>(response: HttpResponse<unknown>): ParsedResponse<T> {
  return {
    status: response.status,
    data: parseEnvelope<T>(response.data),
    headers: response.headers,
    requestId: response.requestId,
    parsedAt: Date.now(),
  };
}
