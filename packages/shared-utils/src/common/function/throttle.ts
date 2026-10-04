/**
 * Throttle a function (leading edge)
 * @module shared-utils/common/function
 */
export type ThrottledFunction<TArgs extends readonly unknown[]> = ((...args: TArgs) => void) & {
  cancel: () => void;
};

export function throttle<TArgs extends readonly unknown[]>(
  fn: (...args: TArgs) => void,
  intervalMs: number
): ThrottledFunction<TArgs> {
  if (!Number.isFinite(intervalMs) || intervalMs < 0) {
    throw new RangeError('intervalMs must be >= 0');
  }

  let lastInvoke = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: TArgs | null = null;

  const throttled = ((...args: TArgs): void => {
    const nowTs = Date.now();
    const elapsed = nowTs - lastInvoke;
    lastArgs = args;

    if (elapsed >= intervalMs) {
      lastInvoke = nowTs;
      fn(...args);
      lastArgs = null;
      return;
    }

    if (timer === null) {
      timer = setTimeout(() => {
        timer = null;
        lastInvoke = Date.now();
        if (lastArgs) {
          fn(...lastArgs);
          lastArgs = null;
        }
      }, intervalMs - elapsed);
    }
  }) as ThrottledFunction<TArgs>;

  throttled.cancel = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = null;
  };

  return throttled;
}
