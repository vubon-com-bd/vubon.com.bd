/**
 * Get nested value by dot-path
 * @module shared-utils/common/object
 *
 * @example
 * getPath({ a: { b: { c: 1 } } }, 'a.b.c') // 1
 */
export function getPath<T = unknown>(obj: unknown, path: string): T | undefined {
  if (!path) return undefined;
  const segments = path.split('.');
  let current: unknown = obj;
  for (const seg of segments) {
    if (current === null || current === undefined) return undefined;
    if (typeof current !== 'object') return undefined;
    current = (current as Record<string, unknown>)[seg];
  }
  return current as T;
}
