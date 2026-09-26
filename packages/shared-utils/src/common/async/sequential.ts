/**
 * Run tasks sequentially, return results in order
 * @module shared-utils/common/async
 */
export async function sequential<T>(tasks: readonly (() => Promise<T>)[]): Promise<T[]> {
  const results: T[] = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}
