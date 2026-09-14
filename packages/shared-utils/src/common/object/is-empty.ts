/**
 * Check if object has no own enumerable keys
 * @module shared-utils/common/object
 */
export function isEmptyObject(obj: object): boolean {
  return Object.keys(obj).length === 0;
}
