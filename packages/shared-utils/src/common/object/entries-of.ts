/**
 * Typed wrapper around Object.entries
 * @module shared-utils/common/object
 */
export function entriesOf<T extends object>(obj: T): [keyof T, T[keyof T]][] {
  return Object.entries(obj) as [keyof T, T[keyof T]][];
}
