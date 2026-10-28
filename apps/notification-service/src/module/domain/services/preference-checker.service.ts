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

export type PreferenceLike = PreferenceVO | {
  readonly options: readonly { readonly channel: string; readonly category?: string; readonly enabled: boolean }[];
  readonly quietHoursEnabled: boolean;
  readonly quietHoursStart?: number;
  readonly quietHoursEnd?: number;
  readonly timezone?: string;
  readonly locale?: string;
  readonly locked?: boolean;
};

export interface CheckPermissionInput {
  readonly preference: PreferenceLike | null;
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
    const isCategoryEnabled = this.resolveIsCategoryEnabled(
      input.preference,
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
      isQuietHours = this.resolveIsInQuietHours(input.preference, input.localHour);
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
    preference: PreferenceLike | null,
    category: string,
  ): boolean {
    if (!preference) return true; // fallback
    const channels = ['email', 'sms', 'push', 'in_app', 'webhook', 'whatsapp'];
    return channels.some((ch) => this.resolveIsCategoryEnabled(preference, ch, category));
  }

  // ─── Adapter methods (handle both VO and DTO) ───
  private static resolveIsCategoryEnabled(
    preference: PreferenceLike,
    channel: string,
    category: string,
  ): boolean {
    // VO path
    if ('isCategoryEnabled' in preference && typeof preference.isCategoryEnabled === 'function') {
      return (preference as PreferenceVO).isCategoryEnabled(channel, category);
    }

    // DTO path — search options array
    const dto = preference as { readonly options?: readonly { readonly channel: string; readonly category?: string; readonly enabled: boolean }[] };
    if (!dto.options) {
      return true; // fallback
    }

    // Find matching option (channel + category specific first)
    const categorySpecific = dto.options.find(
      (o) => o.channel === channel && o.category === category,
    );
    if (categorySpecific) return categorySpecific.enabled;

    // Fallback: channel-only option
    const channelOnly = dto.options.find((o) => o.channel === channel && !o.category);
    if (channelOnly) return channelOnly.enabled;

    // Default: allow
    return true;
  }

  private static resolveIsInQuietHours(
    preference: PreferenceLike,
    hour: number,
  ): boolean {
    // VO path
    if ('isInQuietHours' in preference && typeof preference.isInQuietHours === 'function') {
      return (preference as PreferenceVO).isInQuietHours(hour);
    }

    // DTO path
    const dto = preference as { readonly quietHoursEnabled?: boolean; readonly quietHoursStart?: number; readonly quietHoursEnd?: number };
    if (!dto.quietHoursEnabled) return false;
    if (dto.quietHoursStart === undefined || dto.quietHoursEnd === undefined) return false;

    const start = dto.quietHoursStart;
    const end = dto.quietHoursEnd;
    if (start === end) return false;
    return start < end ? hour >= start && hour < end : hour >= start || hour < end;
  }
}
