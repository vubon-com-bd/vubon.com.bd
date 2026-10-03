/**
 * Compute intersection of two arrays
 * @module shared-utils/common/array
 */
export function intersection<T>(a: readonly T[], b: readonly T[]): T[] {
  const setB = new Set(b);
  return dedupeGeneric(a.filter((item) => setB.has(item)));
}

function dedupeGeneric<T>(items: readonly T[]): T[] {
  return Array.from(new Set(items));
}
