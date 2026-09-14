/**
 * Debounce an async function (trailing call)
 * @module shared-utils/common/async
 */
export interface DebouncedAsyncFunction<TArgs extends readonly unknown[], TResult> {
  (...args: TArgs): Promise<TResult>;
  cancel: () => void;
}

export function debounceAsync<TArgs extends readonly unknown[], TResult>(
  fn: (...args: TArgs) => Promise<TResult>,
  waitMs: number
): DebouncedAsyncFunction<TArgs, TResult> {
  if (!Number.isFinite(waitMs) || waitMs < 0) {
    throw new RangeError('waitMs must be >= 0');
  }

  let timer: ReturnType<typeof setTimeout> | null = null;
  let lastArgs: TArgs | null = null;
  let resolver: ((value: TResult) => void) | null = null;
  let rejecter: ((error: unknown) => void) | null = null;

  const invoke = async (): Promise<void> => {
    if (lastArgs && resolver && rejecter) {
      try {
        const result = await fn(...lastArgs);
        resolver(result);
      } catch (error) {
        rejecter(error);
      } finally {
        lastArgs = null;
        resolver = null;
        rejecter = null;
      }
    }
  };

  const debounced = ((...args: TArgs): Promise<TResult> => {
    lastArgs = args;
    if (timer !== null) clearTimeout(timer);

    return new Promise<TResult>((resolve, reject) => {
      resolver = resolve;
      rejecter = reject;
      timer = setTimeout(() => {
        timer = null;
        void invoke();
      }, waitMs);
    });
  }) as DebouncedAsyncFunction<TArgs, TResult>;

  debounced.cancel = (): void => {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
    lastArgs = null;
    resolver = null;
    rejecter = null;
  };

  return debounced;
}
