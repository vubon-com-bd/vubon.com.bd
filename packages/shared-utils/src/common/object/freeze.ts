/**
 * Deep freeze object (recursive)
 * @module shared-utils/common/object
 */
export function deepFreeze<T>(obj: T): Readonly<T> {
  if (obj && typeof obj === 'object') {
    Object.freeze(obj);
    for (const key of Object.keys(obj)) {
      deepFreeze((obj as Record<string, unknown>)[key]);
    }
  }
  return obj as Readonly<T>;
}
