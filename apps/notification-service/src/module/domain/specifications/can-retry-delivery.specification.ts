/**
 * CanRetryDeliverySpecification
 * @module notification-service/domain/specifications
 */
import { Specification } from '@vubon/shared-kernel/domain/base/base.specification';
import { NOTIFICATION_LIMIT } from '@vubon/shared-constants/platform/notification';
import type { NotificationEntity } from '../entities/notification.entity.js';

export interface RetryDeliveryContext {
  readonly maxAttempts?: number;
  readonly referenceDate?: Date;
}

export class CanRetryDeliverySpecification extends Specification<{
  notification: NotificationEntity;
  ctx?: RetryDeliveryContext;
}> {
  isSatisfiedBy(c: {
    notification: NotificationEntity;
    ctx?: RetryDeliveryContext;
  }): boolean {
    const { notification } = c;
    const max = c.ctx?.maxAttempts ?? NOTIFICATION_LIMIT.RETRY_ATTEMPTS;

    if (!notification.isFailed()) return false;
    if (notification.retryAttempts >= max) return false;
    if (notification.failureReason && !notification.failureReason.isRetryable()) return false;
    if (notification.isExpiredAt(c.ctx?.referenceDate)) return false;
    return true;
  }

  explain(c: {
    notification: NotificationEntity;
    ctx?: RetryDeliveryContext;
  }): string | null {
    const { notification } = c;
    const max = c.ctx?.maxAttempts ?? NOTIFICATION_LIMIT.RETRY_ATTEMPTS;

    if (!notification.isFailed()) {
      return `status "${notification.status.value}" is not failed`;
    }
    if (notification.retryAttempts >= max) {
      return `retry limit reached (${notification.retryAttempts}/${max})`;
    }
    if (notification.failureReason && !notification.failureReason.isRetryable()) {
      return `failure reason "${notification.failureReason.value}" is not retryable`;
    }
    if (notification.isExpiredAt(c.ctx?.referenceDate)) {
      return 'notification expired';
    }
    return null;
  }
}
