/**
 * RateLimiterService — Redis-based sliding-window counter
 * @module identity-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';
import { SECURITY } from '@vubon/shared-constants/security';

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly retryAfterSeconds: number;
}

@Injectable()
export class RateLimiterService {
  private readonly logger = new Logger(RateLimiterService.name);

  constructor(private readonly redis: RedisService) {}

  async check(
    key: string,
    maxRequests: number = SECURITY.RATE_LIMIT_MAX_REQUESTS,
    windowSeconds: number = SECURITY.RATE_LIMIT_WINDOW_SECONDS,
  ): Promise<RateLimitResult> {
    const fullKey = `auth:ratelimit:${key}`;
    try {
      const current = (await this.redis.get<number>(fullKey)) ?? 0;
      if (current >= maxRequests) {
        return {
          allowed: false,
          remaining: 0,
          retryAfterSeconds: windowSeconds,
        };
      }
      const next = current + 1;
      await this.redis.set(fullKey, next, windowSeconds);
      return {
        allowed: true,
        remaining: Math.max(0, maxRequests - next),
        retryAfterSeconds: 0,
      };
    } catch (err) {
      this.logger.warn(
        `rate limit check failed: ${err instanceof Error ? err.message : 'unknown'} (fail-open)`,
      );
      return { allowed: true, remaining: maxRequests, retryAfterSeconds: 0 };
    }
  }

  async reset(key: string): Promise<void> {
    await this.redis.del(`auth:ratelimit:${key}`);
  }

  async assertAllowed(
    key: string,
    maxRequests: number = SECURITY.RATE_LIMIT_AUTH_MAX,
    windowSeconds: number = SECURITY.RATE_LIMIT_WINDOW_SECONDS,
  ): Promise<void> {
    const result = await this.check(key, maxRequests, windowSeconds);
    if (!result.allowed) {
      throw new Error(
        `Rate limit exceeded for "${key}". Retry after ${result.retryAfterSeconds}s`,
      );
    }
  }
}
