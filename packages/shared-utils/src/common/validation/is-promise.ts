/**
 * Check if value is a thenable (Promise-like)
 * @module shared-utils/common/validation
 */
export function isPromise<T = unknown>(value: unknown): value is Promise<T> {
  if (value === null || typeof value !== 'object') return false;
  const maybe = value as { then?: unknown };
  return typeof maybe.then === 'function';
}
