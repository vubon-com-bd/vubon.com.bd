/**
 * Map over object values
 * @module shared-utils/common/object
 */
export function mapValues<T extends object, R>(
  obj: T,
  mapper: (value: T[keyof T], key: keyof T) => R
): Record<keyof T, R> {
  const result = {} as Record<keyof T, R>;
  for (const key of Object.keys(obj) as (keyof T)[]) {
    result[key] = mapper(obj[key], key);
  }
  return result;
}
