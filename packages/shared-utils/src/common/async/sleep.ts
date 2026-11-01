/**
 * Sleep for N milliseconds
 * @module shared-utils/common/async
 */
export function sleep(ms: number): Promise<void> {
  if (!Number.isFinite(ms) || ms < 0) {
    throw new RangeError('ms must be >= 0');
  }
  return new Promise((resolve) => setTimeout(resolve, ms));
}
