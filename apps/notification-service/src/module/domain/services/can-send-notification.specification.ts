/**
 * CanSendNotificationSpecification
 * @module notification-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { NotificationEntity } from '../entities/notification.entity.js';
import type { PreferenceEntity } from '../entities/preference.entity.js';

export interface SendNotificationContext {
  readonly preference?: PreferenceEntity | null;
  readonly referenceDate?: Date;
  readonly currentHour?: number;
}

export class CanSendNotificationSpecification extends Specification<{
  notification: NotificationEntity;
  ctx?: SendNotificationContext;
}> {
  isSatisfiedBy(c: {
    notification: NotificationEntity;
    ctx?: SendNotificationContext;
  }): boolean {
    const { notification, ctx } = c;
    if (!notification.isPending() && !notification.isQueued() && !notification.isScheduled()) {
      return false;
    }
    if (notification.isExpiredAt(ctx?.referenceDate)) {
      return false;
    }
    if (ctx?.preference) {
      const pref = ctx.preference;
      if (!pref.isCategoryEnabled(notification.category.value)) return false;
      if (!pref.isChannelEnabled(notification.channel.value)) return false;
      const hour = ctx.currentHour;
      if (
        hour !== undefined &&
        pref.isInQuietHours(hour) &&
        !notification.priority.bypassesQuietHours() &&
        !notification.channel.isInstant() &&
        !notification.type.isTransactional() &&
        !notification.type.isSecurity()
      ) {
        return false;
      }
    }
    return true;
  }

  explain(c: {
    notification: NotificationEntity;
    ctx?: SendNotificationContext;
  }): string | null {
    const { notification, ctx } = c;
    if (
      !notification.isPending() &&
      !notification.isQueued() &&
      !notification.isScheduled()
    ) {
      return `status "${notification.status.value}" is not sendable`;
    }
    if (notification.isExpiredAt(ctx?.referenceDate)) {
      return 'notification expired';
    }
    if (ctx?.preference) {
      const pref = ctx.preference;
      if (!pref.isCategoryEnabled(notification.category.value)) {
        return `category "${notification.category.value}" disabled by user`;
      }
      if (!pref.isChannelEnabled(notification.channel.value)) {
        return `channel "${notification.channel.value}" disabled by user`;
      }
      const hour = ctx.currentHour;
      if (
        hour !== undefined &&
        pref.isInQuietHours(hour) &&
        !notification.priority.bypassesQuietHours()
      ) {
        return 'within quiet hours';
      }
    }
    return null;
  }
}
