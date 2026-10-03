/**
 * Shallow merge of two objects (b wins)
 * @module shared-utils/common/object
 */
export function merge<T extends object, U extends object>(a: T, b: U): T & U {
  return { ...a, ...b };
}
