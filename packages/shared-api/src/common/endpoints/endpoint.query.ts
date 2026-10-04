import { appendQuery } from '../request/params';
import type { QueryParams } from '../request/request.types';

/** Attach query params to an endpoint URL. */
export function withQuery(url: string, query: QueryParams | undefined): string {
  return appendQuery(url, query);
}
