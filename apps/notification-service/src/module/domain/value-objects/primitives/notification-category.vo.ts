/**
 * NotificationCategory Value Object
 * @module notification-service/domain/value-objects/primitives
 */
import { BaseTypeVO } from '@vubon/shared-kernel/domain/primitives';
import { NOTIFICATION_CATEGORY } from '@vubon/shared-constants/platform';
import { InvalidNotificationCategoryError } from '@domain/errors/notification.errors.js';

export type NotificationCategoryValue =
  (typeof NOTIFICATION_CATEGORY)[keyof typeof NOTIFICATION_CATEGORY];

const ALLOWED = Object.values(NOTIFICATION_CATEGORY) as readonly string[];

export class NotificationCategoryVO extends BaseTypeVO<NotificationCategoryValue> {
  private constructor(value: NotificationCategoryValue) {
    super(value);
  }

  static create(raw: string): NotificationCategoryVO {
    if (typeof raw !== 'string') {
      throw new InvalidNotificationCategoryError(String(raw), ALLOWED);
    }
    const normalized = raw.trim().toLowerCase();
    if (!ALLOWED.includes(normalized)) {
      throw new InvalidNotificationCategoryError(normalized, ALLOWED);
    }
    return new NotificationCategoryVO(normalized as NotificationCategoryValue);
  }

  static reconstitute(raw: string): NotificationCategoryVO {
    return new NotificationCategoryVO(raw as NotificationCategoryValue);
  }

  isTransactional(): boolean {
    return (
      this.value === NOTIFICATION_CATEGORY.AUTH ||
      this.value === NOTIFICATION_CATEGORY.ORDER ||
      this.value === NOTIFICATION_CATEGORY.PAYMENT ||
      this.value === NOTIFICATION_CATEGORY.SHIPPING ||
      this.value === NOTIFICATION_CATEGORY.SECURITY
    );
  }

  isMarketing(): boolean {
    return (
      this.value === NOTIFICATION_CATEGORY.PROMOTION ||
      this.value === NOTIFICATION_CATEGORY.MARKETING
    );
  }

  canBeDisabled(): boolean {
    return !this.isTransactional() && this.value !== NOTIFICATION_CATEGORY.SYSTEM;
  }
}
