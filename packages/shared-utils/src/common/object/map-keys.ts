/**
 * Map over object keys
 * @module shared-utils/common/object
 */
export function mapKeys<T extends object>(
  obj: T,
  mapper: (key: keyof T) => string
): Record<string, T[keyof T]> {
  const result: Record<string, T[keyof T]> = {};
  for (const key of Object.keys(obj) as (keyof T)[]) {
    result[mapper(key)] = obj[key];
  }
  return result;
}
