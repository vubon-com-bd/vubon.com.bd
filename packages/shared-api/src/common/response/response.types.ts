import type { HttpResponse } from '../client/client.types';

export interface ParsedResponse<T> extends HttpResponse<T> {
  readonly parsedAt: number;
}

export type ResponseParser<T> = (raw: unknown) => T;
