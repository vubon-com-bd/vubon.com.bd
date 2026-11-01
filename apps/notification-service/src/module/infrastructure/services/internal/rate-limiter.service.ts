/**
 * RateLimiterInfraService — Redis-backed rate limiter
 * @module notification-service/infrastructure/services/internal
 *
 * Uses Redis INCR + EXPIRE for sliding window counters.
 * Domain `RateLimiterService` provides the algorithm; this wraps with Redis।
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

import { RateLimiterService as DomainRateLimiter } from '@domain/services/rate-limiter.service.js';

export interface RateLimitCheckRequest {
  readonly key: string;
  readonly limit: number;
  readonly windowSeconds: number;
  readonly cost?: number;
}

export interface RateLimitCheckResult {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly resetAtMs: number;
  readonly retryAfterMs: number;
}

const PREFIX = 'notification:ratelimit:';

@Injectable()
export class RateLimiterInfraService {
  private readonly logger = new Logger(RateLimiterInfraService.name);

  constructor(private readonly redis: RedisService) {}

  async check(request: RateLimitCheckRequest): Promise<RateLimitCheckResult> {
    const key = `${PREFIX}${request.key}`;
    const nowMs = Date.now();
    const cost = request.cost ?? 1;

    // Read current state
    const stateRaw = await this.redis.get<{ tokens: number; windowStartMs: number }>(key);

    const state = stateRaw ?? {
      tokens: request.limit,
      windowStartMs: nowMs,
    };

    // Use domain algorithm
    const result = DomainRateLimiter.consume(
      state,
      { limit: request.limit, windowMs: request.windowSeconds * 1000 },
      nowMs,
      cost,
    );

    // Persist new state
    if (result.allowed || stateRaw === null) {
      const ttl = Math.max(1, Math.ceil((result.resetAtMs - nowMs) / 1000));
      await this.redis.set(key, result.newState, ttl);
    }

    if (!result.allowed) {
      this.logger.debug(
        `Rate limit exceeded for ${request.key}: remaining=${result.remaining}, retry in ${result.retryAfterMs}ms`,
      );
    }

    return {
      allowed: result.allowed,
      remaining: result.remaining,
      resetAtMs: result.resetAtMs,
      retryAfterMs: result.retryAfterMs,
    };
  }

  async reset(key: string): Promise<void> {
    await this.redis.del(`${PREFIX}${key}`);
  }

  async isExceeded(key: string): Promise<boolean> {
    const state = await this.redis.get<{ tokens: number }>(`${PREFIX}${key}`);
    return state !== null && state.tokens <= 0;
  }
}
