/**
 * Flatten deeply nested arrays
 * @module shared-utils/common/array
 */
export function flattenDeep<T>(items: readonly unknown[]): T[] {
  const result: T[] = [];
  const stack: unknown[] = [...items];
  while (stack.length > 0) {
    const item = stack.shift();
    if (Array.isArray(item)) {
      stack.unshift(...(item as unknown[]));
    } else {
      result.push(item as T);
    }
  }
  return result;
}
