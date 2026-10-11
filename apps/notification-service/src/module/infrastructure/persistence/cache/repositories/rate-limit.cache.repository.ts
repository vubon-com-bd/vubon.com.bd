/**
 * RateLimitCacheRepository — sliding-window rate limiting via Redis
 * @module notification-service/infrastructure/persistence/cache/repositories
 *
 * Two windows enforced:
 *  1. Per-user daily (e.g., 50 emails/day)
 *  2. Global per-second (e.g., 100 req/sec)
 *
 * Algorithm: fixed-window counter (INCR + EXPIRE). Simple, accurate enough
 * for notification quotas.
 */
import { Injectable, Logger } from '@nestjs/common';
import { RedisService } from '@vubon/shared-kernel/infrastructure/persistence/cache';

const USER_WINDOW = 'rl:user:';
const GLOBAL_WINDOW = 'rl:global:';

export interface RateLimitStatus {
  readonly count: number;
  readonly limit: number;
  readonly allowed: boolean;
  readonly remaining: number;
  readonly resetAtSeconds: number;
}

@Injectable()
export class RateLimitCacheRepository {
  private readonly logger = new Logger(RateLimitCacheRepository.name);

  constructor(private readonly redis: RedisService) {}

  private dailyKey(userId: string, channel: string): string {
    const day = new Date().toISOString().slice(0, 10);
    return `${USER_WINDOW}${userId}:${channel}:${day}`;
  }

  private perSecondKey(channel: string): string {
    const second = Math.floor(Date.now() / 1000);
    return `${GLOBAL_WINDOW}${channel}:${second}`;
  }

  /** Increment + check per-user daily counter. */
  async checkUserDaily(
    userId: string,
    channel: string,
    limit: number,
  ): Promise<RateLimitStatus> {
    const raw = this.redis.raw;
    const key = this.dailyKey(userId, channel);
    const count = await raw.incr(key);
    if (count === 1) {
      await raw.expire(key, 86_400);
    }
    const ttl = await raw.ttl(key);
    return {
      count,
      limit,
      allowed: count <= limit,
      remaining: Math.max(0, limit - count),
      resetAtSeconds: ttl > 0 ? ttl : 86_400,
    };
  }

  /** Increment + check global per-second counter. */
  async checkGlobalPerSecond(channel: string, limit: number): Promise<RateLimitStatus> {
    const raw = this.redis.raw;
    const key = this.perSecondKey(channel);
    const count = await raw.incr(key);
    if (count === 1) {
      await raw.expire(key, 2);
    }
    const ttl = await raw.ttl(key);
    return {
      count,
      limit,
      allowed: count <= limit,
      remaining: Math.max(0, limit - count),
      resetAtSeconds: ttl > 0 ? ttl : 1,
    };
  }

  /** Peek current user daily count without incrementing. */
  async peekUserDaily(userId: string, channel: string): Promise<number> {
    const raw = this.redis.raw;
    const value = await raw.get(this.dailyKey(userId, channel));
    return value ? Number(value) : 0;
  }

  /** Reset user daily counter (admin use). */
  async resetUserDaily(userId: string, channel: string): Promise<void> {
    await this.redis.del(this.dailyKey(userId, channel));
  }
}
