/**
 * ChannelSelectorService
 * @module notification-service/domain/services
 *
 * Picks best channel(s) based on:
 *  - user preference (enabled channels)
 *  - notification type (transactional vs promotional)
 *  - priority
 *  - category
 */
import { NOTIFICATION_CHANNEL } from '@vubon/shared-constants/platform';
import { BusinessRuleError } from '@vubon/shared-kernel/domain/errors/business-rule.error';
import type { NotificationChannelValue } from '@domain/primitives/notification-channel.vo.js';
import type { NotificationTypeVO } from '@domain/primitives/notification-type.vo.js';
import type { NotificationCategoryVO } from '@domain/primitives/notification-category.vo.js';
import type { NotificationPriorityVO } from '@domain/primitives/notification-priority.vo.js';
import type { PreferenceVO } from '@domain/composites/preference.vo.js';

export interface ChannelSelectionInput {
  readonly type: NotificationTypeVO;
  readonly category: NotificationCategoryVO;
  readonly priority: NotificationPriorityVO;
  readonly preference: PreferenceVO;
  readonly availableChannels?: readonly NotificationChannelValue[];
}

export interface ChannelSelectionResult {
  readonly primary: NotificationChannelValue;
  readonly fallback: readonly NotificationChannelValue[];
}

const DEFAULT_ORDER: readonly NotificationChannelValue[] = [
  NOTIFICATION_CHANNEL.PUSH,
  NOTIFICATION_CHANNEL.IN_APP,
  NOTIFICATION_CHANNEL.EMAIL,
  NOTIFICATION_CHANNEL.SMS,
];

export class ChannelSelectorService {
  static select(input: ChannelSelectionInput): ChannelSelectionResult {
    const available = input.availableChannels ?? DEFAULT_ORDER;

    // Filter by preference
    const allowed = available.filter((ch) =>
      input.preference.isCategoryEnabled(ch, input.category.value),
    );

    if (allowed.length === 0) {
      // Fallback: use preference default enabled channels
      const enabled = input.preference.enabledChannels as readonly NotificationChannelValue[];
      if (enabled.length === 0) {
        // Last resort: security/transactional can bypass preference
        if (input.type.isSecurity() || input.type.isTransactional()) {
          return {
            primary: NOTIFICATION_CHANNEL.EMAIL,
            fallback: [NOTIFICATION_CHANNEL.IN_APP],
          };
        }
        throw new BusinessRuleError(
          'No allowed channels and no fallback available',
          'NO_ALLOWED_CHANNELS',
        );
      }
      return { primary: enabled[0]!, fallback: enabled.slice(1) };
    }

    // For urgent notifications, prefer instant channels
    if (input.priority.isUrgent()) {
      const instant = allowed.filter(
        (ch) =>
          ch === NOTIFICATION_CHANNEL.PUSH ||
          ch === NOTIFICATION_CHANNEL.SMS ||
          ch === NOTIFICATION_CHANNEL.IN_APP,
      );
      if (instant.length > 0) {
        return { primary: instant[0]!, fallback: instant.slice(1) };
      }
    }

    return { primary: allowed[0]!, fallback: allowed.slice(1) };
  }

  /** Multi-channel select for broadcast */
  static selectAll(input: ChannelSelectionInput): readonly NotificationChannelValue[] {
    const available = input.availableChannels ?? DEFAULT_ORDER;
    return available.filter((ch) =>
      input.preference.isCategoryEnabled(ch, input.category.value),
    );
  }
}
