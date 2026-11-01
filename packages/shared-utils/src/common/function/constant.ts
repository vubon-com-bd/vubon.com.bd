/**
 * Return a function that always returns the same value
 * @module shared-utils/common/function
 */
export function constant<T>(value: T): () => T {
  return () => value;
}
