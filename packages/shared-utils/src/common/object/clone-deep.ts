/**
 * Deep clone via structuredClone (Node 17+)
 * @module shared-utils/common/object
 */
export function cloneDeep<T>(obj: T): T {
  if (typeof structuredClone === 'function') {
    return structuredClone(obj);
  }
  return JSON.parse(JSON.stringify(obj)) as T;
}
