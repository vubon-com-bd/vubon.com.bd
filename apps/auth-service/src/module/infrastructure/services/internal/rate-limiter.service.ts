import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure';
import { RATE_LIMIT_CONFIG } from '../../config/rate-limit.config';

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly resetAt: Date;
}

@Injectable()
export class RateLimiterService {
  constructor(private readonly redis: RedisService) {}

  async check(
    key: string,
    max = RATE_LIMIT_CONFIG.maxRequests,
    windowSeconds = RATE_LIMIT_CONFIG.windowSeconds,
  ): Promise<RateLimitResult> {
    const cacheKey = `ratelimit:${key}`;
    const current = (await this.redis.get<number>(cacheKey)) ?? 0;
    const next = current + 1;
    const allowed = next <= max;

    if (allowed) {
      await this.redis.set(cacheKey, next, windowSeconds);
    }

    return {
      allowed,
      remaining: Math.max(0, max - next),
      resetAt: new Date(Date.now() + windowSeconds * 1000),
    };
  }

  async reset(key: string): Promise<void> {
    await this.redis.del(`ratelimit:${key}`);
  }
}
