/**
 * Deep equality check (structural, cycle-safe)
 * @module shared-utils/common/misc
 */
export function deepEqual(
  a: unknown,
  b: unknown,
  seen = new WeakMap<object, WeakSet<object>>()
): boolean {
  if (a === b) return true;

  if (typeof a !== typeof b) return false;
  if (a === null || b === null) return false;
  if (typeof a !== 'object' || typeof b !== 'object') return false;

  const objA = a as object;
  const objB = b as object;

  // Cycle detection
  const seenB = seen.get(objA);
  if (seenB?.has(objB)) return true;
  if (seenB) {
    seenB.add(objB);
  } else {
    seen.set(objA, new WeakSet([objB]));
  }

  // Handle Date
  if (objA instanceof Date && objB instanceof Date) {
    return objA.getTime() === objB.getTime();
  }

  // Handle RegExp
  if (objA instanceof RegExp && objB instanceof RegExp) {
    return objA.source === objB.source && objA.flags === objB.flags;
  }

  // Handle Array
  if (Array.isArray(objA) && Array.isArray(objB)) {
    if (objA.length !== objB.length) return false;
    for (let i = 0; i < objA.length; i++) {
      if (!deepEqual(objA[i], objB[i], seen)) return false;
    }
    return true;
  }

  if (Array.isArray(objA) !== Array.isArray(objB)) return false;

  // Handle plain objects
  const keysA = Object.keys(objA);
  const keysB = Object.keys(objB);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(objB, key)) return false;
    if (
      !deepEqual(
        (objA as Record<string, unknown>)[key],
        (objB as Record<string, unknown>)[key],
        seen
      )
    ) {
      return false;
    }
  }

  return true;
}
