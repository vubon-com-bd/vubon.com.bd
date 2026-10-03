/**
 * Check if object has a nested path
 * @module shared-utils/common/object
 */
export function hasPath(obj: unknown, path: string): boolean {
  if (!path) return false;
  const segments = path.split('.');
  let current: unknown = obj;
  for (const seg of segments) {
    if (current === null || current === undefined) return false;
    if (typeof current !== 'object') return false;
    if (!(seg in (current as Record<string, unknown>))) return false;
    current = (current as Record<string, unknown>)[seg];
  }
  return true;
}
