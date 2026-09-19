import type { QueryParams, QueryValue } from './request.types';

/** Convert a params object into a query string. Skips undefined/null. */
export function buildQueryString(params: QueryParams | undefined): string {
  if (!params) return '';
  const search = new URLSearchParams();
  for (const [k, v] of Object.entries(params)) {
    if (v === undefined || v === null) continue;
    search.set(k, String(v));
  }
  const qs = search.toString();
  return qs ? `?${qs}` : '';
}

/** Append query string to a URL (handles existing `?`). */
export function appendQuery(url: string, params: QueryParams | undefined): string {
  const qs = buildQueryString(params);
  if (!qs) return url;
  return url.includes('?') ? `${url}&${qs.slice(1)}` : `${url}${qs}`;
}

/** Normalize a single query value. */
export function normalizeQueryValue(value: QueryValue): string | undefined {
  if (value === undefined || value === null) return undefined;
  return String(value);
}
