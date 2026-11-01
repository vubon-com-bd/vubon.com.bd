import { useCallback, useState } from 'react';
import { useAsync, type AsyncState } from './use-async';

export interface RetryOptions {
  readonly maxAttempts?: number;
  readonly baseDelayMs?: number;
}

export interface AsyncRetryResult<T> extends AsyncState<T> {
  readonly attempt: number;
  readonly run: () => Promise<void>;
  readonly reset: () => void;
}

/** `useAsync` with retry (exponential backoff). */
export function useAsyncRetry<T>(
  fn: (signal: AbortSignal) => Promise<T>,
  deps: readonly unknown[] = [],
  options: RetryOptions = {}
): AsyncRetryResult<T> {
  const { maxAttempts = 3, baseDelayMs = 300 } = options;
  const [attempt, setAttempt] = useState(0);

  const wrapped = useCallback(async (signal: AbortSignal): Promise<T> => {
    let lastErr: unknown;
    for (let i = 1; i <= maxAttempts; i++) {
      setAttempt(i);
      try {
        return await fn(signal);
      } catch (err) {
        lastErr = err;
        if (signal.aborted) throw err;
        if (i < maxAttempts) {
          await new Promise((r) => setTimeout(r, baseDelayMs * 2 ** (i - 1)));
        }
      }
    }
    throw lastErr instanceof Error ? lastErr : new Error('Retry failed');
  }, deps);

  const state = useAsync(wrapped, deps);
  return { ...state, attempt };
}
