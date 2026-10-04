/**
 * RateLimiterService — Redis-backed sliding window counter
 * @module auth-service/infrastructure/services/internal
 *
 * Uses INCR + EXPIRE pattern for a simple fixed window.
 */
import { Injectable } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache/redis.service';

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly remaining: number;
  readonly resetInSec: number;
}

@Injectable()
export class RateLimiterService {
  readonly name = 'RateLimiterService';

  constructor(private readonly redis: RedisService) {}

  async hit(input: {
    key: string;
    limit: number;
    windowSec: number;
  }): Promise<RateLimitResult> {
    const key = `ratelimit:${input.key}`;
    const client = this.redis.raw;
    const count = await client.incr(key);
    if (count === 1) {
      await client.expire(key, input.windowSec);
    }
    const ttl = await client.ttl(key);
    return {
      allowed: count <= input.limit,
      remaining: Math.max(0, input.limit - count),
      resetInSec: ttl > 0 ? ttl : input.windowSec,
    };
  }

  async peek(input: { key: string; limit: number }): Promise<number> {
    const raw = await this.redis.raw.get(`ratelimit:${input.key}`);
    const used = raw ? Number(raw) : 0;
    return Math.max(0, input.limit - used);
  }
}
