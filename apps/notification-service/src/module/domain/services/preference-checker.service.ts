/**
 * PreferenceCheckerService
 * @module notification-service/domain/services
 *
 * Determines if a notification should be sent based on user preferences।
 * Returns decision with reasoning।
 */
import type { PreferenceVO } from '@domain/composites/preference.vo.js';
import type { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import type { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';

export interface CheckPermissionInput {
  readonly preference: PreferenceVO | null;
  readonly type: NotificationTypeVO;
  readonly category: NotificationCategoryVO;
  readonly channel: string;
  readonly localHour?: number;
}

export interface CheckPermissionResult {
  readonly allowed: boolean;
  readonly reason: string;
  readonly isQuietHours: boolean;
}

export class PreferenceCheckerService {
  static check(input: CheckPermissionInput): CheckPermissionResult {
    // No preference → default allow for transactional, deny marketing
    if (!input.preference) {
      if (input.type.isPromotional()) {
        return {
          allowed: false,
          reason: 'no-preference-promotional-denied',
          isQuietHours: false,
        };
      }
      return { allowed: true, reason: 'no-preference-transactional', isQuietHours: false };
    }

    // Category disabled?
    const isCategoryEnabled = input.preference.isCategoryEnabled(
      input.channel,
      input.category.value,
    );
    if (!isCategoryEnabled) {
      // Transactional/Security categories cannot be disabled
      if (input.type.isSecurity() || input.type.isTransactional()) {
        return {
          allowed: true,
          reason: 'critical-category-forced',
          isQuietHours: false,
        };
      }
      return {
        allowed: false,
        reason: `category-disabled:${input.category.value}`,
        isQuietHours: false,
      };
    }

    // Quiet hours check
    let isQuietHours = false;
    if (input.localHour !== undefined) {
      isQuietHours = input.preference.isInQuietHours(input.localHour);
      if (isQuietHours) {
        if (input.type.isSecurity() || input.type.isTransactional()) {
          return {
            allowed: true,
            reason: 'quiet-hours-bypass-critical',
            isQuietHours: true,
          };
        }
        return {
          allowed: false,
          reason: 'quiet-hours',
          isQuietHours: true,
        };
      }
    }

    return { allowed: true, reason: 'ok', isQuietHours };
  }

  /** Channel-agnostic check: is ANY channel enabled for this category */
  static hasAnyChannelEnabled(
    preference: PreferenceVO | null,
    category: string,
  ): boolean {
    if (!preference) return true; // fallback
    const channels = ['email', 'sms', 'push', 'in_app', 'webhook', 'whatsapp'];
    return channels.some((ch) => preference.isCategoryEnabled(ch, category));
  }
}
