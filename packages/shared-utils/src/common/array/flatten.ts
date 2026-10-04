/**
 * Flatten one level of nested arrays
 * @module shared-utils/common/array
 */
export function flatten<T>(items: readonly (readonly T[])[]): T[] {
  const result: T[] = [];
  for (const item of items) {
    for (const sub of item) result.push(sub);
  }
  return result;
}
