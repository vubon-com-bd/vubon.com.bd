/**
 * IsWithinQuietHoursSpecification
 * @module notification-service/domain/specifications
 *
 * Applies only when preference has quiet hours enabled. Critical priority
 * bypasses automatically.
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import type { PreferenceEntity } from '../entities/preference.entity.js';
import type { NotificationEntity } from '../entities/notification.entity.js';

export interface QuietHoursContext {
  readonly currentHour: number;
}

export class IsWithinQuietHoursSpecification extends Specification<{
  preference: PreferenceEntity;
  notification?: NotificationEntity;
  ctx: QuietHoursContext;
}> {
  isSatisfiedBy(c: {
    preference: PreferenceEntity;
    notification?: NotificationEntity;
    ctx: QuietHoursContext;
  }): boolean {
    const { preference, notification, ctx } = c;
    if (!preference.quietHoursEnabled) return false;
    if (!preference.isInQuietHours(ctx.currentHour)) return false;

    if (notification) {
      if (notification.priority.bypassesQuietHours()) return false;
      if (notification.type.isSecurity()) return false;
      if (notification.type.isTransactional() && notification.channel.isInstant()) {
        return false;
      }
    }
    return true;
  }

  explain(c: {
    preference: PreferenceEntity;
    notification?: NotificationEntity;
    ctx: QuietHoursContext;
  }): string | null {
    if (!this.isSatisfiedBy(c)) return null;
    const { preference, notification, ctx } = c;
    if (notification) {
      return `quiet hours ${preference.quietHoursStart ?? 22}-${preference.quietHoursEnd ?? 8} active at hour ${ctx.currentHour}`;
    }
    return `quiet hours active at hour ${ctx.currentHour}`;
  }
}
