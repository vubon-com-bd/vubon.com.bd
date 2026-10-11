/**
 * NotificationRateLimitService — enforce per-channel quotas
 * @module notification-service/domain/services
 *
 * Business rules:
 *  - Email:  50/day per user, 100/sec global
 *  - SMS:    20/day per user, 60/sec global
 *  - Push:   100/day per user, 500/sec global
 *  - In-app: 500/day per user
 *  - Webhook: 1000/day per user
 *  - WhatsApp: 30/day per user
 */
import { NOTIFICATION_CHANNEL_LIMIT } from '@vubon/shared-constants/platform/notification';
import { NOTIFICATION_CONFIG } from '@vubon/shared-config/platform/notification';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo.js';

export interface RateLimitInput {
  readonly channel: NotificationChannelVO;
  /** Number of notifications this user already received today on this channel. */
  readonly userDailyCount: number;
  /** Number of notifications sent in the current second (global). */
  readonly globalPerSecondCount: number;
}

export interface RateLimitResult {
  readonly allowed: boolean;
  readonly reason?: string;
  readonly limitType?: 'user_daily' | 'global_per_second';
  readonly limit?: number;
  readonly remaining?: number;
}

export class NotificationRateLimitService {
  /** Per-user daily limits from constants. */
  static dailyLimitFor(channel: NotificationChannelVO): number {
    if (channel.isEmail()) return NOTIFICATION_CHANNEL_LIMIT.EMAIL_PER_DAY;
    if (channel.isSms()) return NOTIFICATION_CHANNEL_LIMIT.SMS_PER_DAY;
    if (channel.isPush()) return NOTIFICATION_CHANNEL_LIMIT.PUSH_PER_DAY;
    if (channel.isInApp()) return NOTIFICATION_CHANNEL_LIMIT.IN_APP_PER_DAY;
    if (channel.isWebhook()) return NOTIFICATION_CHANNEL_LIMIT.WEBHOOK_PER_DAY;
    if (channel.isWhatsapp()) return NOTIFICATION_CHANNEL_LIMIT.WHATSAPP_PER_DAY;
    return Number.POSITIVE_INFINITY;
  }

  /** Global per-second cap from config. */
  static globalPerSecondLimit(): number {
    return NOTIFICATION_CONFIG.rateLimitPerSecond;
  }

  static check(input: RateLimitInput): RateLimitResult {
    const dailyLimit = this.dailyLimitFor(input.channel);
    if (input.userDailyCount >= dailyLimit) {
      return {
        allowed: false,
        reason: `Daily ${input.channel.value} limit reached for user (${input.userDailyCount}/${dailyLimit})`,
        limitType: 'user_daily',
        limit: dailyLimit,
        remaining: 0,
      };
    }

    const perSecondLimit = this.globalPerSecondLimit();
    if (input.globalPerSecondCount >= perSecondLimit) {
      return {
        allowed: false,
        reason: `Global per-second ${input.channel.value} limit reached (${input.globalPerSecondCount}/${perSecondLimit})`,
        limitType: 'global_per_second',
        limit: perSecondLimit,
        remaining: 0,
      };
    }

    return {
      allowed: true,
      remaining: dailyLimit - input.userDailyCount - 1,
    };
  }

  static assertAllowed(input: RateLimitInput): void {
    const result = this.check(input);
    if (!result.allowed) {
      throw new BusinessRuleError(
        result.reason ?? 'Rate limit exceeded',
        'NOTIFICATION_RATE_LIMIT_EXCEEDED',
        {
          channel: input.channel.value,
          limitType: result.limitType,
          limit: result.limit,
        },
      );
    }
  }

  /** Priority-aware: critical notifications bypass user daily caps. */
  static shouldBypassUserLimit(priority: string): boolean {
    return priority === 'critical';
  }
}
