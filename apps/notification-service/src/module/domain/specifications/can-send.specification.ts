/**
 * CanSendSpecification
 * @module notification-service/domain/specifications
 *
 * Determines if a notification can be sent right now।
 * Checks: status, expiry, recipients, priority, preference, quiet hours।
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';

import type { NotificationEntity } from '@domain/entities/notification.entity.js';
import type { PreferenceVO } from '@domain/composites/preference.vo.js';

export interface CanSendContext {
  readonly now?: Date;
  readonly preference?: PreferenceVO | null;
  readonly localHour?: number;
  readonly hasAvailableChannel?: boolean;
}

export interface CanSendCandidate {
  readonly notification: NotificationEntity;
  readonly ctx?: CanSendContext;
}

export class CanSendSpecification extends Specification<CanSendCandidate> {
  isSatisfiedBy(c: CanSendCandidate): boolean {
    return this.explain(c) === null;
  }

  explain(c: CanSendCandidate): string | null {
    const n = c.notification;
    const now = c.ctx?.now ?? new Date();

    if (!n.canBeSent()) {
      return `notification status "${n.status.value}" cannot be sent`;
    }

    if (n.isExpiredByDate(now)) {
      return 'notification has expired';
    }

    if (n.recipients.length === 0) {
      return 'notification has no recipients';
    }

    if (c.ctx?.hasAvailableChannel === false) {
      return 'no available channel for notification';
    }

    // Preference check (if provided)
    if (c.ctx?.preference) {
      const pref = c.ctx.preference;
      const category = n.vo.category.value;
      const channel = n.vo.channel.value;

      if (!pref.isCategoryEnabled(channel, category)) {
        if (!n.vo.type.isSecurity() && !n.vo.type.isTransactional()) {
          return `preference disabled for ${channel}/${category}`;
        }
      }

      if (c.ctx.localHour !== undefined && pref.isInQuietHours(c.ctx.localHour)) {
        if (!n.vo.type.isSecurity() && !n.vo.type.isTransactional()) {
          return `quiet hours active (hour=${c.ctx.localHour})`;
        }
      }
    }

    return null;
  }

  static strict(): CanSendSpecification {
    return new CanSendSpecification();
  }
}
