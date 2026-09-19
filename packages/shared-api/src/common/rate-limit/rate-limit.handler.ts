import { RateLimitError } from '../errors/rate-limit-error';
import type { RateLimitConfig, RateLimitState } from './rate-limit.types';

/** Token-bucket style rate limiter (per key). */
export class RateLimiter {
  private readonly buckets = new Map<string, { count: number; resetAt: number }>();

  constructor(private readonly config: RateLimitConfig) {}

  /** Check + consume one token. Throws RateLimitError if exhausted. */
  consume(key: string): RateLimitState {
    const now = Date.now();
    const bucket = this.buckets.get(key);
    if (!bucket || bucket.resetAt <= now) {
      const resetAt = now + this.config.windowMs;
      this.buckets.set(key, { count: 1, resetAt });
      return { remaining: this.config.maxRequests - 1, resetAt };
    }
    if (bucket.count >= this.config.maxRequests) {
      const retryAfter = Math.ceil((bucket.resetAt - now) / 1000);
      throw new RateLimitError({
        method: 'ANY',
        url: key,
        retryAfter,
      });
    }
    bucket.count += 1;
    return {
      remaining: this.config.maxRequests - bucket.count,
      resetAt: bucket.resetAt,
    };
  }

  reset(key?: string): void {
    if (key) this.buckets.delete(key);
    else this.buckets.clear();
  }
}
