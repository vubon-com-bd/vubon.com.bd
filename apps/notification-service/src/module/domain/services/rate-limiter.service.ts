import { RateLimitKeyVO } from '../value-objects/primitives/rate-limit-key.vo';

export interface RateLimitWindow {
  readonly count: number;
  readonly windowStartMs: number;
  readonly windowMs: number;
  readonly max: number;
}

export class RateLimiterService {
  isAllowed(key: RateLimitKeyVO, window: RateLimitWindow): boolean {
    void key;
    const elapsed = Date.now() - window.windowStartMs;
    if (elapsed > window.windowMs) return true;
    return window.count < window.max;
  }

  remaining(window: RateLimitWindow): number {
    return Math.max(0, window.max - window.count);
  }
}
