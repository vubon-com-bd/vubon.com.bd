/**
 * Debounce a function (trailing call)
 * @module shared-utils/common/function
 *
 * @example
 * const search = debounce(fn, 300);
 * search('a');
 */
export type DebouncedFunction<TArgs extends readonly unknown[]> = ((...args: TArgs) => void) & {
  cancel: () => void;
  flush: () => void;
};

export function debounce<TArgs extends readonly unknown[]>(
  fn: (...args: TArgs) => void,
  waitMs: number
): DebouncedFunction<TArgs> {
  if (!Number.isFinite(waitMs) || waitMs < 0) {
    throw new RangeError('waitMs must be >= 0');
  }

  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: TArgs | null = null;

  const invoke = (): void => {
    if (lastArgs) {
      fn(...lastArgs);
      lastArgs = null;
    }
  };

  const debounced = ((...args: TArgs): void => {
    lastArgs = args;
    if (timer !== null) clearTimeout(timer);
    timer = setTimeout(() => {
      timer = null;
      invoke();
    }, waitMs);
  }) as DebouncedFunction<TArgs>;

  debounced.cancel = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = null;
  };

  debounced.flush = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    invoke();
  };

  return debounced;
}
