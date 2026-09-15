import type { RetryAttemptInfo, RetryConfig } from './retry.types';
import { computeBackoff, sleep } from './backoff';

/** Default retry config — idempotent methods only. */
export const DEFAULT_RETRY_CONFIG: RetryConfig = {
  maxAttempts: 3,
  backoff: 'exponential',
  baseDelayMs: 300,
  maxDelayMs: 5_000,
  jitter: true,
  retryable: (error: unknown) => {
    if (!error || typeof error !== 'object') return false;
    const status = (error as { status?: number }).status;
    if (typeof status === 'number') return status >= 500;
    return true; // network / timeout
  },
};

/**
 * Execute `fn` with retry + backoff.
 * Caller MUST pass only idempotent operations (GET/PUT/DELETE)
 * or POST with Idempotency-Key.
 */
export async function withRetry<T>(
  fn: () => Promise<T>,
  config: RetryConfig = DEFAULT_RETRY_CONFIG,
  onAttempt?: (info: RetryAttemptInfo) => void
): Promise<T> {
  let lastError: unknown;
  for (let attempt = 1; attempt <= config.maxAttempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const isLast = attempt === config.maxAttempts;
      if (isLast || !config.retryable(error)) throw error;

      const delayMs = computeBackoff(
        attempt,
        config.backoff,
        config.baseDelayMs,
        config.maxDelayMs,
        config.jitter
      );
      onAttempt?.({ attempt, delayMs, error });
      await sleep(delayMs);
    }
  }
  throw lastError;
}
