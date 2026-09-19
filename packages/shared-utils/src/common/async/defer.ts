/**
 * Defer execution to the next microtask
 * @module shared-utils/common/async
 */
export function defer(fn: () => void): void {
  queueMicrotask(fn);
}
