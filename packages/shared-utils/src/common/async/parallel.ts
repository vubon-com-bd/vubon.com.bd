/**
 * Run tasks in parallel and return all results
 * @module shared-utils/common/async
 */
export function parallel<T>(tasks: readonly (() => Promise<T>)[]): Promise<T[]> {
  return Promise.all(tasks.map((task) => task()));
}
