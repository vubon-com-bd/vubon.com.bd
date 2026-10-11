/**
 * NotificationChannelPlannerService — plan fan-out targets
 * @module notification-service/domain/services
 *
 * Business rules:
 *  - Transactional + security → all channels the user has enabled
 *  - Marketing / promo → email + push only (no SMS to save cost)
 *  - Reminder → push + in-app
 *  - Alert → all channels including SMS
 *  - Default order: push → in-app → email → sms → whatsapp → webhook
 */
import { NOTIFICATION_CHANNEL_PRIORITY } from '@vubon/shared-constants/platform/notification';
import type { NotificationTypeVO } from '../value-objects/primitives/notification-type.vo.js';
import type { NotificationChannelVO } from '../value-objects/primitives/notification-channel.vo.js';

export interface PlannerInput {
  readonly type: NotificationTypeVO;
  readonly availableChannels: readonly NotificationChannelVO[];
  /** Optional explicit channel list (overrides type-based defaults). */
  readonly requestedChannels?: readonly NotificationChannelVO[];
}

export interface ChannelPlan {
  readonly ordered: readonly NotificationChannelVO[];
  readonly primary: NotificationChannelVO | null;
  readonly fallbacks: readonly NotificationChannelVO[];
  readonly reason: string;
}

export class NotificationChannelPlannerService {
  static plan(input: PlannerInput): ChannelPlan {
    const ordered = this.orderChannels(input.availableChannels);

    if (input.requestedChannels && input.requestedChannels.length > 0) {
      const filtered = ordered.filter((c) =>
        input.requestedChannels!.some((r) => r.value === c.value),
      );
      if (filtered.length === 0) {
        return { ordered: [], primary: null, fallbacks: [], reason: 'no_matching_channels' };
      }
      return {
        ordered: filtered,
        primary: filtered[0] ?? null,
        fallbacks: filtered.slice(1),
        reason: 'explicit_channels',
      };
    }

    const preferred = this.preferredForType(input.type);
    const selected = preferred.length > 0
      ? ordered.filter((c) => preferred.includes(c.value))
      : ordered;

    if (selected.length === 0) {
      return { ordered: [], primary: null, fallbacks: [], reason: 'no_matching_channels' };
    }

    return {
      ordered: selected,
      primary: selected[0] ?? null,
      fallbacks: selected.slice(1),
      reason: `type_preference:${input.type.value}`,
    };
  }

  static orderChannels(
    channels: readonly NotificationChannelVO[],
  ): readonly NotificationChannelVO[] {
    return [...channels].sort((a, b) => {
      const wa = NOTIFICATION_CHANNEL_PRIORITY[a.value as keyof typeof NOTIFICATION_CHANNEL_PRIORITY] ?? 99;
      const wb = NOTIFICATION_CHANNEL_PRIORITY[b.value as keyof typeof NOTIFICATION_CHANNEL_PRIORITY] ?? 99;
      return wa - wb;
    });
  }

  private static preferredForType(type: NotificationTypeVO): readonly string[] {
    if (type.isSecurity() || type.isVerification() || type.isAlert()) {
      // Security/alert — hit all available channels
      return [];
    }
    if (type.isMarketing() || type.isPromotional() || type.isAnnouncement()) {
      return ['email', 'push', 'in_app'];
    }
    if (type.isReminder()) {
      return ['push', 'in_app'];
    }
    if (type.isTransactional() || type.isOrderUpdate() || type.isPaymentUpdate() || type.isShippingUpdate()) {
      return ['email', 'push', 'in_app', 'sms'];
    }
    if (type.isWelcome()) {
      return ['email', 'in_app'];
    }
    return [];
  }
}
