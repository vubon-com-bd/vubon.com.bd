/**
 * RateLimiterService
 * @module notification-service/domain/services
 *
 * Token bucket rate limiter logic (pure, no Redis dependency)।
 * Callers supply the current state; this service computes next state।
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';

export interface RateLimitConfig {
  readonly limit: number; // tokens
  readonly windowMs: number; // window duration
}

export interface RateLimitState {
  readonly tokens: number;
  readonly windowStartMs: number;
}

export interface ConsumeResult {
  readonly allowed: boolean;
  readonly newState: RateLimitState;
  readonly remaining: number;
  readonly resetAtMs: number;
  readonly retryAfterMs: number;
}

export class RateLimiterService {
  static consume(
    state: RateLimitState,
    config: RateLimitConfig,
    nowMs: number,
    cost: number = 1,
  ): ConsumeResult {
    if (config.limit <= 0) {
      throw new BusinessRuleError('limit must be > 0', 'INVALID_LIMIT');
    }
    if (config.windowMs <= 0) {
      throw new BusinessRuleError('windowMs must be > 0', 'INVALID_WINDOW');
    }
    if (cost <= 0 || cost > config.limit) {
      throw new BusinessRuleError('invalid cost', 'INVALID_COST');
    }

    // Roll window if expired
    let tokens = state.tokens;
    let windowStart = state.windowStartMs;

    if (nowMs - windowStart >= config.windowMs) {
      windowStart = nowMs;
      tokens = config.limit;
    }

    if (tokens >= cost) {
      tokens -= cost;
      return {
        allowed: true,
        newState: { tokens, windowStartMs: windowStart },
        remaining: tokens,
        resetAtMs: windowStart + config.windowMs,
        retryAfterMs: 0,
      };
    }

    const resetAtMs = windowStart + config.windowMs;
    return {
      allowed: false,
      newState: { tokens, windowStartMs: windowStart },
      remaining: tokens,
      resetAtMs,
      retryAfterMs: Math.max(0, resetAtMs - nowMs),
    };
  }

  static empty(config: RateLimitConfig, nowMs: number): RateLimitState {
    return { tokens: config.limit, windowStartMs: nowMs };
  }

  /** Sliding-window approximation: bulk consume */
  static canConsume(
    state: RateLimitState,
    config: RateLimitConfig,
    nowMs: number,
    cost: number = 1,
  ): boolean {
    const result = this.consume(state, config, nowMs, cost);
    return result.allowed;
  }
}
