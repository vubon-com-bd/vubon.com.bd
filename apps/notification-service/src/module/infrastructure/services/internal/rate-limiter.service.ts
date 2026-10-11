/**
 * RateLimiterService — enforces per-user daily + global per-second caps
 * @module notification-service/infrastructure/services/internal
 */
import { Injectable, Logger } from '@nestjs/common';
import { NOTIFICATION_CHANNEL_LIMIT } from '@vubon/shared-constants/platform/notification';
import { NOTIFICATION_CONFIG } from '@vubon/shared-config/platform/notification';
import { RateLimitCacheRepository } from '../../persistence/cache/repositories/rate-limit.cache.repository.js';

export const RATE_LIMITER_SERVICE = Symbol('RATE_LIMITER_SERVICE');

export interface RateLimitDecision {
  readonly allowed: boolean;
  readonly reason?: string;
  readonly limitType?: 'user_daily' | 'global_per_second';
  readonly count?: number;
  readonly limit?: number;
  readonly remaining?: number;
  readonly resetAtSeconds?: number;
}

@Injectable()
export class RateLimiterService {
  private readonly logger = new Logger(RateLimiterService.name);

  constructor(private readonly cache: RateLimitCacheRepository) {}

  private dailyLimit(channel: string): number {
    switch (channel) {
      case 'email': return NOTIFICATION_CHANNEL_LIMIT.EMAIL_PER_DAY;
      case 'sms': return NOTIFICATION_CHANNEL_LIMIT.SMS_PER_DAY;
      case 'push': return NOTIFICATION_CHANNEL_LIMIT.PUSH_PER_DAY;
      case 'in_app': return NOTIFICATION_CHANNEL_LIMIT.IN_APP_PER_DAY;
      case 'webhook': return NOTIFICATION_CHANNEL_LIMIT.WEBHOOK_PER_DAY;
      case 'whatsapp': return NOTIFICATION_CHANNEL_LIMIT.WHATSAPP_PER_DAY;
      default: return Number.POSITIVE_INFINITY;
    }
  }

  async check(
    userId: string,
    channel: string,
    priority: 'critical' | 'high' | 'normal' | 'low' | 'silent' = 'normal',
  ): Promise<RateLimitDecision> {
    // Critical priority bypasses per-user daily cap
    if (priority !== 'critical') {
      const userStatus = await this.cache.checkUserDaily(userId, channel, this.dailyLimit(channel));
      if (!userStatus.allowed) {
        this.logger.warn(`User daily rate limit exceeded: user=${userId} channel=${channel}`);
        return {
          allowed: false,
          reason: `User daily ${channel} quota exceeded`,
          limitType: 'user_daily',
          count: userStatus.count,
          limit: userStatus.limit,
          remaining: userStatus.remaining,
          resetAtSeconds: userStatus.resetAtSeconds,
        };
      }
    }

    const globalLimit = NOTIFICATION_CONFIG.rateLimitPerSecond;
    const globalStatus = await this.cache.checkGlobalPerSecond(channel, globalLimit);
    if (!globalStatus.allowed) {
      this.logger.warn(`Global rate limit exceeded: channel=${channel}`);
      return {
        allowed: false,
        reason: `Global per-second ${channel} limit exceeded`,
        limitType: 'global_per_second',
        count: globalStatus.count,
        limit: globalStatus.limit,
        remaining: globalStatus.remaining,
        resetAtSeconds: globalStatus.resetAtSeconds,
      };
    }

    return { allowed: true, remaining: globalStatus.remaining };
  }
}
