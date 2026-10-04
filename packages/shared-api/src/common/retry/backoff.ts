import type { BackoffKind } from './retry.types';

/** Compute delay for a given attempt (attempt is 1-indexed). */
export function computeBackoff(
  attempt: number,
  kind: BackoffKind,
  baseDelayMs: number,
  maxDelayMs: number,
  jitter: boolean
): number {
  let delay: number;
  switch (kind) {
    case 'linear':
      delay = baseDelayMs * attempt;
      break;
    case 'fixed':
      delay = baseDelayMs;
      break;
    case 'exponential':
    default:
      delay = baseDelayMs * 2 ** (attempt - 1);
      break;
  }
  delay = Math.min(delay, maxDelayMs);
  if (jitter) {
    // Full jitter: random between 0 and delay.
    delay = Math.floor(Math.random() * delay);
  }
  return Math.max(delay, 0);
}

export function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
