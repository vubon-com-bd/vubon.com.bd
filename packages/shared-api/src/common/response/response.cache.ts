/**
 * Response cache marker helpers.
 * Actual cache storage lives in `common/cache/` (Phase 4).
 */
export interface CacheHint {
  readonly ttlMs: number;
  readonly tags?: readonly string[];
}

/** Read cache hint from a response's Cache-Control header. */
export function readCacheHint(headers: Record<string, string>): CacheHint | undefined {
  const cc = headers['cache-control'];
  if (!cc) return undefined;
  const maxAge = /max-age=(\d+)/.exec(cc);
  if (!maxAge || !maxAge[1]) return undefined;
  return { ttlMs: Number(maxAge[1]) * 1000 };
}
