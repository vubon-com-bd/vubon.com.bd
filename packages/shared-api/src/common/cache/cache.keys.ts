import type { QueryParams } from '../request/request.types';

/** Deterministic cache key from method + url + query. */
export function buildCacheKey(method: string, url: string, query?: QueryParams): string {
  const parts: string[] = [method.toUpperCase(), url];
  if (query) {
    const sorted = Object.entries(query)
      .filter(([, v]) => v !== undefined && v !== null)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([k, v]) => `${k}=${String(v)}`);
    if (sorted.length > 0) parts.push(sorted.join('&'));
  }
  return parts.join('|');
}

/** Tag helpers. */
export function tagKey(tag: string): string {
  return `tag:${tag}`;
}
