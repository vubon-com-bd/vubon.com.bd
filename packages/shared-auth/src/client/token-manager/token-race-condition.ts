/**
 * Single-flight guard for async operations.
 * Ensures only ONE refresh runs at a time, regardless of how many
 * 401 responses come back simultaneously.
 */
export function createSingleFlight<T>(): {
  run: (fn: () => Promise<T>) => Promise<T>;
  isRunning: () => boolean;
} {
  let inflight: Promise<T> | null = null;

  return {
    run: (fn: () => Promise<T>): Promise<T> => {
      if (inflight) return inflight;
      inflight = fn().finally(() => {
        inflight = null;
      });
      return inflight;
    },
    isRunning: () => inflight !== null,
  };
}
