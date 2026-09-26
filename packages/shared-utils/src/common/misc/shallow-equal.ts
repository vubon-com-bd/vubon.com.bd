/**
 * Shallow equality check (top-level keys only)
 * @module shared-utils/common/misc
 */
export function shallowEqual<T extends object>(a: T, b: T): boolean {
  if (a === b) return true;
  if (typeof a !== 'object' || typeof b !== 'object') return false;
  if (a === null || b === null) return false;

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (
      !Object.prototype.hasOwnProperty.call(b, key) ||
      (a as Record<string, unknown>)[key] !== (b as Record<string, unknown>)[key]
    ) {
      return false;
    }
  }

  return true;
}
