/**
 * NotificationPreferenceCheckerService — decide whether to send to a user
 * @module notification-service/domain/services
 *
 * Business rules:
 *  - Transactional + security notifications always delivered (no opt-out)
 *  - Quiet hours defer non-critical, non-instant channels
 *  - Critical priority bypasses quiet hours
 *  - User channel/category prefs honored unless bypassed
 */
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { NotificationTypeVO } from '../value-objects/primitives/notification-type.vo.js';
import type { NotificationCategoryVO } from '../value-objects/primitives/notification-category.vo.js';
import type { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo.js';
import type { NotificationPriorityVO } from '../value-objects/primitives/notification-priority.vo.js';
import type { PreferenceEntity } from '../entities/preference.entity.js';

export interface PreferenceCheckInput {
  readonly preference: PreferenceEntity | null;
  readonly type: NotificationTypeVO;
  readonly category: NotificationCategoryVO;
  readonly channel: NotificationChannelVO;
  readonly priority: NotificationPriorityVO;
  /** Current hour in user's timezone (0-23). */
  readonly currentHour: number;
}

export interface PreferenceCheckResult {
  readonly shouldSend: boolean;
  readonly reason?: string;
  readonly deferUntilQuietHoursEnd?: boolean;
}

export class NotificationPreferenceCheckerService {
  static check(input: PreferenceCheckInput): PreferenceCheckResult {
    // No preference record → default allow (opt-in by default for transactional)
    if (!input.preference) {
      return { shouldSend: true, reason: 'no_preference_record' };
    }

    // 1. Category gate — user explicitly disabled a category
    if (!input.preference.isCategoryEnabled(input.category.value)) {
      // Critical priority bypasses category opt-out
      if (!input.priority.bypassesQuietHours()) {
        return {
          shouldSend: false,
          reason: `user_opted_out_of_category:${input.category.value}`,
        };
      }
    }

    // 2. Channel gate — user disabled a channel
    if (!input.preference.isChannelEnabled(input.channel.value)) {
      if (!input.priority.bypassesQuietHours()) {
        return {
          shouldSend: false,
          reason: `user_opted_out_of_channel:${input.channel.value}`,
        };
      }
    }

    // 3. Quiet hours — applies to non-critical, non-instant channels
    const inQuietHours = input.preference.isInQuietHours(input.currentHour);
    if (inQuietHours) {
      const bypass =
        input.priority.bypassesQuietHours() ||
        input.channel.isInstant() ||
        input.type.isTransactional() ||
        input.type.isSecurity();
      if (!bypass) {
        return {
          shouldSend: false,
          reason: 'within_quiet_hours',
          deferUntilQuietHoursEnd: true,
        };
      }
    }

    return { shouldSend: true };
  }

  static assertShouldSend(input: PreferenceCheckInput): void {
    const result = this.check(input);
    if (!result.shouldSend && !result.deferUntilQuietHoursEnd) {
      throw new BusinessRuleError(
        result.reason ?? 'Preference check failed',
        'NOTIFICATION_SUPPRESSED_BY_PREFERENCE',
        {
          type: input.type.value,
          category: input.category.value,
          channel: input.channel.value,
        },
      );
    }
  }

  /** Compute the ISO timestamp when quiet hours will end. */
  static nextAllowedAt(preference: PreferenceEntity, from: Date): string {
    const endHour = preference.quietHoursEnd ?? 8;
    const next = new Date(from);
    next.setHours(endHour, 0, 0, 0);
    if (next.getTime() <= from.getTime()) {
      next.setDate(next.getDate() + 1);
    }
    return next.toISOString();
  }
}
