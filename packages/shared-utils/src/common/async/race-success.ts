/**
 * Resolve on first success; reject only if all fail
 * @module shared-utils/common/async
 */
export function raceSuccess<T>(tasks: readonly (() => Promise<T>)[]): Promise<T> {
  if (tasks.length === 0) {
    throw new RangeError('At least one task is required');
  }

  return new Promise<T>((resolve, reject) => {
    let rejectedCount = 0;
    let lastError: unknown;

    tasks.forEach((task) => {
      task().then(resolve, (error: unknown) => {
        lastError = error;
        rejectedCount++;
        if (rejectedCount === tasks.length) reject(lastError);
      });
    });
  });
}
