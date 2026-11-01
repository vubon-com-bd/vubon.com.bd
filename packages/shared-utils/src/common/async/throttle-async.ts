/**
 * Throttle an async function (leading edge)
 * @module shared-utils/common/async
 */
export interface ThrottledAsyncFunction<TArgs extends readonly unknown[], TResult> {
  (...args: TArgs): Promise<TResult | undefined>;
  cancel: () => void;
}

export function throttleAsync<TArgs extends readonly unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  intervalMs: number
): ThrottledAsyncFunction<TArgs, TResult> {
  if (!Number.isFinite(intervalMs) || intervalMs < 0) {
    throw new RangeError('intervalMs must be >= 0');
  }

  let lastInvoke = 0;
  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: TArgs | null = null;

  const throttled = ((...args: TArgs): Promise<TResult | undefined> => {
    const nowTs = Date.now();
    const elapsed = nowTs - lastInvoke;

    if (elapsed >= intervalMs) {
      lastInvoke = nowTs;
      return fn(...args);
    }

    lastArgs = args;
    if (timer === null) {
      timer = setTimeout(() => {
        timer = null;
        lastInvoke = Date.now();
        if (lastArgs) {
          void fn(...lastArgs);
          lastArgs = null;
        }
      }, intervalMs - elapsed);
    }
    return Promise.resolve(undefined);
  }) as ThrottledAsyncFunction<TArgs, TResult>;

  throttled.cancel = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = null;
  };

  return throttled;
}
