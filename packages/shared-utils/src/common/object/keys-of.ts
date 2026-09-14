/**
 * Typed wrapper around Object.keys
 * @module shared-utils/common/object
 */
export function keysOf<T extends object>(obj: T): (keyof T)[] {
  return Object.keys(obj) as (keyof T)[];
}
