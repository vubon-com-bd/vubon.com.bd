/**
 * Filter object keys by predicate
 * @module shared-utils/common/object
 */
export function filterKeys<T extends object>(
  obj: T,
  predicate: (key: keyof T, value: T[keyof T]) => boolean
): Partial<T> {
  const result: Partial<T> = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    if (predicate(key, obj[key])) {
      result[key] = obj[key];
    }
  }
  return result;
}
