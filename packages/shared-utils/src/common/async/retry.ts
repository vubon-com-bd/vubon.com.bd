/**
 * Retry an async function on failure
 * @module shared-utils/common/async
 */
import { sleep } from './sleep';

export interface RetryOptions {
  readonly attempts?: number;
  readonly delayMs?: number;
  readonly backoffFactor?: number;
  readonly maxDelayMs?: number;
  readonly shouldRetry?: (error: unknown, attempt: number) => boolean;
}

export async function retry<T>(fn: () => Promise<T>, options: RetryOptions = {}): Promise<T> {
  const attempts = options.attempts ?? 3;
  const delayMs = options.delayMs ?? 100;
  const backoffFactor = options.backoffFactor ?? 2;
  const maxDelayMs = options.maxDelayMs ?? 30_000;
  const shouldRetry = options.shouldRetry ?? (() => true);

  if (attempts < 1) throw new RangeError('attempts must be >= 1');

  let lastError: unknown;
  let currentDelay = delayMs;

  for (let attempt = 1; attempt <= attempts; attempt++) {
    try {
      return await fn();
    } catch (error) {
      lastError = error;
      const isLast = attempt === attempts;
      if (isLast || !shouldRetry(error, attempt)) {
        throw error;
      }
      await sleep(Math.min(currentDelay, maxDelayMs));
      currentDelay *= backoffFactor;
    }
  }

  throw lastError;
}
