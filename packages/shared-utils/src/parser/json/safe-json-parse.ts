/**
 * Parse JSON safely. Returns null on failure by default.
 * @module shared-utils/parser/json
 */
export function safeJsonParse<T = unknown>(value: string, fallback: T | null = null): T | null {
  if (typeof value !== 'string' || value.length === 0) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}
