/**
 * Shallow clone object
 * @module shared-utils/common/object
 */
export function clone<T extends object>(obj: T): T {
  return { ...obj };
}
