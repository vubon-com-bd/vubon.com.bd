/**
 * Set nested value by dot-path (immutable)
 * @module shared-utils/common/object
 */
export function setPath<T extends object>(obj: T, path: string, value: unknown): T {
  const segments = path.split('.');
  const result = { ...obj } as Record<string, unknown>;
  let current = result;
  for (let i = 0; i < segments.length - 1; i++) {
    const seg = segments[i];
    const next = current[seg];
    current[seg] = next && typeof next === 'object' ? { ...(next as object) } : {};
    current = current[seg] as Record<string, unknown>;
  }
  current[segments[segments.length - 1]] = value;
  return result as T;
}
