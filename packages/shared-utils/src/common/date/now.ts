/**
 * Get current Date (injectable for testing)
 * @module shared-utils/common/date
 */
export function now(clock: () => Date = () => new Date()): Date {
  return clock();
}
