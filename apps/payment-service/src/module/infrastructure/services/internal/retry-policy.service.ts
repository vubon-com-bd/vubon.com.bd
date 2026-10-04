/**
 * RetryPolicyService — exponential backoff computation
 * @module payment-service/infrastructure/services/internal
 */
import { Injectable } from '@nestjs/common';

@Injectable()
export class RetryPolicyService {
  private static readonly DEFAULT_BACKOFFS = [30_000, 120_000, 600_000] as const;

  /** Return next delay in ms for a given (1-based) attempt, or undefined when exhausted. */
  next(attempt: number, backoffs: readonly number[] = RetryPolicyService.DEFAULT_BACKOFFS): number | undefined {
    if (attempt < 1) return backoffs[0];
    return backoffs[attempt];
  }

  isExhausted(attempt: number, max = RetryPolicyService.DEFAULT_BACKOFFS.length): boolean {
    return attempt >= max;
  }
}
